# Canonical runtime architecture

The supported runtime path is:

```text
run_lab.py (unified launcher)
  ├── monitoring.pipeline_runner.PipelineRunner
  │     -> monitoring.event_pipeline.EventPipeline
  │     -> entropy.entropy_calculator.EntropyAnalyzer
  │     -> response.response_module
  │     -> blockchain.connector.BlockchainConnector
  ├── app.py (Flask SOC dashboard)
  ├── victim_server/app.py (read-only victim UI)
  └── attacker_server/app.py (controlled emulator console)
```

`run_lab.py` supervises all four child processes, guarantees victim fixtures
exist before the detector starts, and forwards Ctrl+C/SIGTERM so every service
shuts down gracefully (the pipeline flushes its local ledger before exiting).

The former compatibility facades `entropy_system.py` and
`blockchain/blockchain_logger.py` were removed during the Day 2 integration;
use `monitoring.pipeline_runner.PipelineRunner` and
`blockchain.connector.BlockchainConnector` directly.

Since Day 2 the detector's default watch folder is the controlled victim
fixture directory (`victim_server/user_files`), so attacker emulations are
observed without extra configuration. The detector never watches anything
outside `ENTROPY_WATCH_FOLDERS`, and the attacker emulator is confined to the
victim fixture tree by `_confined_path`.
