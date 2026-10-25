from collections.abc import AsyncIterator

import pytest_asyncio
from app.core.config import Settings
from app.db.base import Base
from app.main import create_app
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient


@pytest_asyncio.fixture
async def app(tmp_path) -> AsyncIterator[FastAPI]:
    settings = Settings(
        app_env="test",
        database_url=f"sqlite+aiosqlite:///{tmp_path / 'test.db'}",
        cors_origins="http://testserver",
        auto_create_tables=True,
        contact_rate_limit=2,
        contact_rate_window_seconds=60,
    )
    app = create_app(settings)
    async with app.state.engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    yield app
    await app.state.engine.dispose()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[AsyncClient]:
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://testserver"
    ) as test_client:
        yield test_client
