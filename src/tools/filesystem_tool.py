import os
import shutil
from pathlib import Path

class FilesystemTool:
    def __init__(self, base_dir=None):
        self.base_dir = Path(base_dir) if base_dir else Path(os.getcwd())

    def _resolve_path(self, path):
        p = Path(path)
        if not p.is_absolute():
            p = self.base_dir / p
        return p

    def read_file(self, path):
        p = self._resolve_path(path)
        if not p.exists():
            return f"Error: File not found {path}"
        try:
            return p.read_text()
        except Exception as e:
            return f"Error reading file: {e}"

    def write_file(self, path, content):
        p = self._resolve_path(path)
        try:
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(content)
            return f"Successfully wrote to {path}"
        except Exception as e:
            return f"Error writing file: {e}"

    def search(self, query):
        return f"Search for {query} not implemented yet."

    def replace(self, path, old, new):
        content = self.read_file(path)
        if content.startswith("Error"):
            return content
        new_content = content.replace(old, new)
        return self.write_file(path, new_content)

    def move(self, src, dst):
        try:
            shutil.move(self._resolve_path(src), self._resolve_path(dst))
            return f"Moved {src} to {dst}"
        except Exception as e:
            return f"Error moving: {e}"

    def delete(self, path):
        p = self._resolve_path(path)
        try:
            if p.is_file():
                p.unlink()
            elif p.is_dir():
                shutil.rmtree(p)
            return f"Deleted {path}"
        except Exception as e:
            return f"Error deleting: {e}"
