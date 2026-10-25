import json
from functools import lru_cache
from pathlib import Path
from typing import Any

CONTENT_ROOT = Path(__file__).resolve().parents[3] / "content"


@lru_cache
def load_projects() -> list[dict[str, Any]]:
    with (CONTENT_ROOT / "projects.json").open(encoding="utf-8") as content_file:
        payload = json.load(content_file)
    if not isinstance(payload, list):
        raise ValueError("Project content must be a list")
    return payload
