import subprocess
import os
import signal

class ShellTool:
    def __init__(self, cwd=None):
        self.cwd = cwd or os.getcwd()

    def run_command(self, cmd, timeout=30):
        try:
            result = subprocess.run(
                cmd,
                shell=True,
                cwd=self.cwd,
                capture_output=True,
                text=True,
                timeout=timeout
            )
            return {
                "stdout": result.stdout,
                "stderr": result.stderr,
                "returncode": result.returncode
            }
        except subprocess.TimeoutExpired:
            return {
                "stdout": "",
                "stderr": f"Command timed out after {timeout} seconds",
                "returncode": 124
            }
        except Exception as e:
            return {
                "stdout": "",
                "stderr": str(e),
                "returncode": 1
            }

    def stream_output(self, cmd):
        pass

    def kill_process(self, pid):
        try:
            os.kill(pid, signal.SIGTERM)
            return True
        except ProcessLookupError:
            return False
