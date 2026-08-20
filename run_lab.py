"""ENTROPY unified lab launcher (Day 2 integration).

One command starts every lab component as supervised child processes:

    python run_lab.py                 # pipeline + dashboard + victim + attacker
    python run_lab.py --reset         # regenerate clean victim fixtures first
    python run_lab.py --services dashboard,victim
    python run_lab.py --check         # dependency health check only

The launcher refuses to start when required packages are missing (same rule
as ``python main.py``), guarantees victim fixtures exist before the detector
starts, prints service URLs once each HTTP service is reachable, and shuts
every child down gracefully on Ctrl+C/SIGTERM (the detection pipeline gets
time to flush its local ledger before it is forced to exit).
"""

from __future__ import annotations

import argparse
import os
import signal
import socket
import subprocess
import sys
import time
from pathlib import Path
from threading import Thread

BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

import config

# Service table: name -> (command, readiness TCP port or None).
# The pipeline has no HTTP port; its readiness is liveness only.
SERVICES: dict[str, tuple[list[str], int | None]] = {
    "pipeline": ([sys.executable, "monitoring/pipeline_runner.py"], None),
    "dashboard": ([sys.executable, "app.py"], config.DASHBOARD_PORT),
    "victim": ([sys.executable, "victim_server/app.py"], config.VICTIM_PORT),
    "attacker": ([sys.executable, "attacker_server/app.py"], None),
}
ATTACKER_PORT = 8001  # attacker_server/app.py binds this directly.

READINESS_TIMEOUT_SECONDS = 30.0
SHUTDOWN_GRACE_SECONDS = 15.0  # pipeline ledger flush allows up to 10s
HARD_TERMINATE_SECONDS = 5.0

IS_WINDOWS = os.name == "nt"


def log(message: str) -> None:
    print(message, flush=True)


def check_environment() -> list[str]:
    """Return the list of missing required dependency names (empty = ready)."""
    from main import DEPENDENCIES, inspect_dependencies

    missing = [
        dependency.distribution
        for dependency, version in inspect_dependencies()
        if version is None and dependency.required
    ]
    del DEPENDENCIES  # only imported to prove the health check is importable
    return missing


def victim_file_count() -> int:
    victim_dir = Path(config.VICTIM_FILES_DIR)
    if not victim_dir.is_dir():
        return 0
    return sum(1 for path in victim_dir.rglob("*") if path.is_file())


def ensure_fixtures(reset: bool = False, seed: int | None = None) -> None:
    """Regenerate victim fixtures when missing (or when reset is requested)."""
    have_files = victim_file_count() > 0
    if have_files and not reset:
        return

    if reset:
        log("[launcher] Resetting victim fixtures ...")
    else:
        log("[launcher] Victim fixtures missing — generating a clean set ...")

    command = [sys.executable, "victim_server/create_fake_files.py", "--clean"]
    if seed is not None:
        command += ["--seed", str(seed)]

    result = subprocess.run(command, cwd=BASE_DIR)
    if result.returncode != 0:
        raise SystemExit(
            f"Fixture generator failed (exit {result.returncode}); "
            "cannot start the lab without victim files."
        )


def _pump(stream, label: str) -> None:
    """Echo a child process's output with a service label."""
    for line in iter(stream.readline, ""):
        if not line:
            break
        sys.stdout.write(f"[{label}] {line}")
        sys.stdout.flush()
    stream.close()


def _start_service(name: str, command: list[str]) -> subprocess.Popen:
    kwargs: dict = {"cwd": BASE_DIR, "stdout": subprocess.PIPE, "stderr": subprocess.STDOUT}
    if IS_WINDOWS:
        kwargs["creationflags"] = subprocess.CREATE_NEW_PROCESS_GROUP
    else:
        kwargs["start_new_session"] = True

    process = subprocess.Popen([*command], text=True, **kwargs)
    thread = Thread(target=_pump, args=(process.stdout, name), daemon=True)
    thread.start()
    return process


def _signal_process(process: subprocess.Popen, sig) -> None:
    """Deliver a signal to one child, tolerating races with its exit."""
    if process.poll() is not None:
        return
    try:
        if IS_WINDOWS and sig == signal.SIGINT:
            # Windows children in a new process group only accept CTRL_BREAK.
            process.send_signal(signal.CTRL_BREAK_EVENT)
        else:
            process.send_signal(sig)
    except (ProcessLookupError, OSError):
        pass


def _wait_for_port(port: int, timeout: float = READINESS_TIMEOUT_SECONDS) -> bool:
    """True when something accepts TCP connections on 127.0.0.1:<port>."""
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=0.5):
                return True
        except OSError:
            time.sleep(0.25)
    return False


def _stop_processes(processes: dict[str, subprocess.Popen]) -> None:
    """Graceful shutdown: SIGINT -> wait -> SIGTERM -> wait -> SIGKILL."""
    live = {name: proc for name, proc in processes.items() if proc.poll() is None}
    if not live:
        return

    log("")
    log("[launcher] Shutting down (sending interrupt) ...")
    for process in live.values():
        _signal_process(process, signal.SIGINT)

    deadline = time.monotonic() + SHUTDOWN_GRACE_SECONDS
    for name, process in live.items():
        remaining = max(0.1, deadline - time.monotonic())
        try:
            process.wait(timeout=remaining)
        except subprocess.TimeoutExpired:
            log(f"[launcher] {name} did not exit in time; terminating")

    live = {name: proc for name, proc in processes.items() if proc.poll() is None}
    for process in live.values():
        _signal_process(process, signal.SIGTERM)

    deadline = time.monotonic() + HARD_TERMINATE_SECONDS
    for name, process in live.items():
        remaining = max(0.1, deadline - time.monotonic())
        try:
            process.wait(timeout=remaining)
        except subprocess.TimeoutExpired:
            log(f"[launcher] {name} still running; killing")
            _signal_process(process, signal.SIGKILL)
            process.wait(timeout=HARD_TERMINATE_SECONDS)

    for name, process in processes.items():
        code = process.returncode
        log(f"[launcher] {name} stopped (exit {code})")


def _service_url(name: str) -> str | None:
    host = "127.0.0.1"
    if name == "dashboard":
        return f"http://{host}:{config.DASHBOARD_PORT}"
    if name == "victim":
        return f"http://{host}:{config.VICTIM_PORT}"
    if name == "attacker":
        return f"http://{host}:{ATTACKER_PORT}"
    return None


def run_lab(selected: list[str], reset: bool = False, seed: int | None = None) -> int:
    def _request_shutdown(signum, frame):
        raise KeyboardInterrupt

    # Containers/supervisors send SIGTERM; treat it like Ctrl+C so children
    # always receive the graceful shutdown sequence below.
    signal.signal(signal.SIGTERM, _request_shutdown)

    ensure_fixtures(reset=reset, seed=seed)

    processes: dict[str, subprocess.Popen] = {}
    try:
        for name in selected:
            command, _ = SERVICES[name]
            log(f"[launcher] Starting {name}: {' '.join(command[1:])}")
            processes[name] = _start_service(name, command)

        # Fail fast if a child dies during startup (e.g. port already in use).
        time.sleep(1.0)
        for name, process in processes.items():
            if process.poll() is not None:
                log(f"[launcher] ERROR: {name} exited early (code {process.returncode}).")
                if name == "dashboard":
                    log("[launcher] Hint: is another dashboard already using the port?")
                return 1

        log("")
        log("[launcher] Waiting for HTTP services ...")
        for name in selected:
            port = SERVICES[name][1]
            if port is None:
                continue
            if not _wait_for_port(port):
                log(f"[launcher] ERROR: {name} did not open port {port}.")
                return 1
            url = _service_url(name)
            log(f"[launcher] {name} ready" + (f" -> {url}" if url else ""))

        log("")
        log("=" * 62)
        log("  ENTROPY lab is running. Press Ctrl+C to stop everything.")
        log(f"  Watching : {config.WATCH_FOLDERS[0] if len(config.WATCH_FOLDERS) == 1 else config.WATCH_FOLDERS}")
        for name in selected:
            url = _service_url(name)
            if url:
                log(f"  {name:<9} : {url}")
        log("=" * 62)
        log("")

        while True:
            time.sleep(1.0)
            for name, process in processes.items():
                if process.poll() is not None:
                    log(f"[launcher] {name} exited unexpectedly (code {process.returncode}).")
                    return 1

    except KeyboardInterrupt:
        pass  # graceful shutdown below
    finally:
        _stop_processes(processes)
    return 0


def parse_args(argv=None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="run_lab.py",
        description="Start the ENTROPY ransomware-detection lab with one command.",
    )
    parser.add_argument(
        "--services",
        default="pipeline,dashboard,victim,attacker",
        help="comma-separated subset: pipeline,dashboard,victim,attacker (default: all)",
    )
    parser.add_argument(
        "--reset",
        action="store_true",
        help="regenerate clean victim fixtures before starting",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=None,
        help="fixture generator seed (used with regeneration)",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="run the dependency health check and exit",
    )
    return parser.parse_args(argv)


def main(argv=None) -> int:
    args = parse_args(argv)

    missing = check_environment()
    if missing:
        log("[launcher] Environment incomplete; missing required packages:")
        for name in missing:
            log(f"           - {name}")
        log("[launcher] Install them with:  python -m pip install -r requirements.txt")
        return 1
    log("[launcher] Dependencies OK")

    if args.check:
        log("[launcher] Environment ready. Re-run without --check to start the lab.")
        return 0

    selected = [item.strip() for item in args.services.split(",") if item.strip()]
    unknown = [item for item in selected if item not in SERVICES]
    if unknown or not selected:
        valid = ", ".join(SERVICES)
        log(f"[launcher] Unknown service(s): {', '.join(unknown) or '(none)'}. Valid: {valid}")
        return 2

    return run_lab(selected, reset=args.reset, seed=args.seed)


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        # main() handles Ctrl+C; this guards shutdown-time interrupts.
        raise SystemExit(130)
