from uuid import uuid4

import pytest
from fastapi import FastAPI
from httpx import AsyncClient
from sqlalchemy.exc import SQLAlchemyError


@pytest.mark.asyncio
async def test_health_and_projects(client: AsyncClient) -> None:
    health = await client.get("/api/v1/health")
    projects = await client.get("/api/v1/projects")
    assert health.status_code == 200
    assert health.json()["database"] == "ok"
    assert projects.status_code == 200
    assert projects.json()["total"] == 2


@pytest.mark.asyncio
async def test_health_reports_database_failure(app: FastAPI, client: AsyncClient) -> None:
    original_engine = app.state.engine

    class BrokenConnection:
        async def __aenter__(self):
            raise SQLAlchemyError("database unavailable")

        async def __aexit__(self, exc_type, exc_value, traceback):
            return None

    class BrokenEngine:
        def connect(self):
            return BrokenConnection()

    app.state.engine = BrokenEngine()
    response = await client.get("/api/v1/health")
    app.state.engine = original_engine
    assert response.status_code == 200
    assert response.json()["database"] == "unavailable"


@pytest.mark.asyncio
async def test_contact_persists_and_duplicate_token_is_idempotent(client: AsyncClient) -> None:
    token = str(uuid4())
    payload = {
        "name": "Ada Lovelace",
        "email": "ada@example.com",
        "subject": "A systems question",
        "message": "I would like to discuss a careful ML systems build.",
        "submission_token": token,
    }
    first = await client.post("/api/v1/contact", json=payload)
    second = await client.post("/api/v1/contact", json=payload)
    assert first.status_code == 201
    assert second.status_code == 201
    assert first.json()["id"] == second.json()["id"]


@pytest.mark.asyncio
async def test_contact_validation_and_rate_limit(client: AsyncClient) -> None:
    invalid = await client.post("/api/v1/contact", json={"name": "A"})
    assert invalid.status_code == 422
    for index in range(2):
        response = await client.post(
            "/api/v1/contact",
            json={
                "name": "Grace Hopper",
                "email": "grace@example.com",
                "subject": f"Subject {index}",
                "message": "A sufficiently detailed message for the contact endpoint.",
                "submission_token": str(uuid4()),
            },
        )
        assert response.status_code == 201
    limited = await client.post(
        "/api/v1/contact",
        json={
            "name": "Grace Hopper",
            "email": "grace@example.com",
            "subject": "One more",
            "message": "This should be rejected by the public endpoint limiter.",
            "submission_token": str(uuid4()),
        },
    )
    assert limited.status_code == 429
