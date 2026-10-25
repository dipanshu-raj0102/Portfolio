import asyncio
import time
from collections import defaultdict

from fastapi import HTTPException, Request, status

from app.core.config import Settings


class InMemoryRateLimiter:
    """Small single-process limiter for the public contact endpoint."""

    def __init__(self) -> None:
        self._attempts: dict[str, list[float]] = defaultdict(list)
        self._lock = asyncio.Lock()

    async def enforce(self, request: Request, settings: Settings) -> None:
        client_ip = request.client.host if request.client else "unknown"
        now = time.monotonic()
        window_start = now - settings.contact_rate_window_seconds
        async with self._lock:
            attempts = [attempt for attempt in self._attempts[client_ip] if attempt > window_start]
            if len(attempts) >= settings.contact_rate_limit:
                retry_after = max(
                    1,
                    int(settings.contact_rate_window_seconds - (now - attempts[0])),
                )
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Too many contact attempts. Please try again later.",
                    headers={"Retry-After": str(retry_after)},
                )
            attempts.append(now)
            self._attempts[client_ip] = attempts
