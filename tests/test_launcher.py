"""Day 2 integration tests for the unified lab launcher."""

import subprocess
import sys
import unittest
from http.server import ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import config
import run_lab


def _all_dependencies_present():
    """Environment-independent dependency report where nothing is missing."""
    from main import DEPENDENCIES

    return [(dependency, "9.9.9") for dependency in DEPENDENCIES]


class LauncherServiceTableTests(unittest.TestCase):
    def test_launcher_covers_every_lab_component(self):
        self.assertEqual(
            set(run_lab.SERVICES),
            {"pipeline", "dashboard", "victim", "attacker"},
        )

    def test_every_service_command_points_at_an_existing_entry_point(self):
        for name, (command, _port) in run_lab.SERVICES.items():
            with self.subTest(service=name):
                self.assertEqual(command[0], sys.executable)
                script = Path(run_lab.BASE_DIR) / command[1]
                self.assertTrue(script.is_file(), f"missing {script}")

    def test_http_services_declare_readiness_ports(self):
        self.assertEqual(run_lab.SERVICES["dashboard"][1], config.DASHBOARD_PORT)
        self.assertEqual(run_lab.SERVICES["victim"][1], config.VICTIM_PORT)


class LauncherDependencyGateTests(unittest.TestCase):
    def test_startup_is_refused_when_required_packages_are_missing(self):
        from main import Dependency

        fake = [(Dependency("watchdog", "watchdog", "filesystem monitoring", True), None)]
        with mock.patch(
            "main.inspect_dependencies", return_value=fake
        ), mock.patch("subprocess.Popen") as popen:
            self.assertEqual(run_lab.main(["--check"]), 1)
            popen.assert_not_called()

    def test_environment_gate_passes_with_all_dependencies_present(self):
        with mock.patch(
            "main.inspect_dependencies", return_value=_all_dependencies_present()
        ):
            self.assertEqual(run_lab.main(["--check"]), 0)

    def test_unknown_service_names_are_rejected(self):
        with mock.patch(
            "main.inspect_dependencies", return_value=_all_dependencies_present()
        ):
            self.assertEqual(run_lab.main(["--services", "nonsense"]), 2)


class LauncherFixtureTests(unittest.TestCase):
    def test_fixtures_are_regenerated_when_victim_tree_is_empty(self):
        with mock.patch.object(
            run_lab, "victim_file_count", return_value=0
        ), mock.patch("subprocess.run") as run:
            run.return_value.returncode = 0
            run_lab.ensure_fixtures()
            run.assert_called_once()
            command = run.call_args.args[0]
            self.assertIn("create_fake_files.py", command[1])
            self.assertIn("--clean", command)

    def test_existing_fixtures_are_kept_without_reset(self):
        with mock.patch.object(
            run_lab, "victim_file_count", return_value=18
        ), mock.patch("subprocess.run") as run:
            run_lab.ensure_fixtures()
            run.assert_not_called()


class LauncherShutdownTests(unittest.TestCase):
    def _sleep_child(self) -> subprocess.Popen:
        command = [
            sys.executable,
            "-c",
            "try:\n"
            "    import time\n"
            "    while True:\n"
            "        time.sleep(1)\n"
            "except KeyboardInterrupt:\n"
            "    raise SystemExit(0)\n",
        ]
        return subprocess.Popen(
            command,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            start_new_session=not run_lab.IS_WINDOWS,
        )

    @unittest.skipIf(run_lab.IS_WINDOWS, "POSIX process-group signalling")
    def test_stop_processes_terminates_children_gracefully(self):
        import time as _time

        child = self._sleep_child()
        processes = {"example": child}
        try:
            # Let the child reach its steady-state loop so the interrupt
            # exercises the graceful path rather than interpreter startup.
            _time.sleep(0.5)
            run_lab._stop_processes(processes)
            self.assertIsNotNone(child.returncode)
            self.assertEqual(child.returncode, 0)
        except Exception:
            child.kill()
            raise

    def test_wait_for_port_detects_a_listening_server(self):
        server = ThreadingHTTPServer(("127.0.0.1", 0), lambda *a: None)
        thread = Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            self.assertTrue(
                run_lab._wait_for_port(server.server_address[1], timeout=5.0)
            )
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)

    def test_wait_for_port_times_out_for_a_closed_port(self):
        # Bind then close to pick a very likely-free port.
        probe = ThreadingHTTPServer(("127.0.0.1", 0), lambda *a: None)
        port = probe.server_address[1]
        probe.server_close()
        self.assertFalse(run_lab._wait_for_port(port, timeout=0.5))


class LegacyOrchestratorRetirementTests(unittest.TestCase):
    def test_legacy_entry_points_are_gone(self):
        root = Path(run_lab.BASE_DIR)
        self.assertFalse((root / "entropy_system.py").exists())
        self.assertFalse((root / "blockchain" / "blockchain_logger.py").exists())


if __name__ == "__main__":
    unittest.main()
