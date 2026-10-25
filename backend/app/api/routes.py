from datetime import UTC, datetime
from typing import Literal, cast
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_app_settings, get_db_session
from app.core.config import Settings
from app.models.contact import ContactMessage
from app.schemas.contact import ContactAccepted, ContactCreate
from app.schemas.health import HealthResponse
from app.schemas.project import Project, ProjectCollection
from app.services.content import load_projects
from app.services.rate_limiter import InMemoryRateLimiter

router = APIRouter(prefix="/api/v1")


def get_rate_limiter(request: Request) -> InMemoryRateLimiter:
    return cast(InMemoryRateLimiter, request.app.state.rate_limiter)


@router.get("/health", response_model=HealthResponse)
async def health(
    request: Request, settings: Settings = Depends(get_app_settings)
) -> HealthResponse:
    database_status: Literal["ok", "unavailable"] = "ok"
    try:
        async with request.app.state.engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
    except SQLAlchemyError:
        database_status = "unavailable"
    return HealthResponse(service=settings.app_name, database=database_status)


@router.get("/projects", response_model=ProjectCollection)
async def projects() -> ProjectCollection:
    items = [Project.model_validate(item) for item in load_projects()]
    return ProjectCollection(items=items, total=len(items))


@router.post("/contact", response_model=ContactAccepted, status_code=status.HTTP_201_CREATED)
async def create_contact_message(
    payload: ContactCreate,
    request: Request,
    limiter: InMemoryRateLimiter = Depends(get_rate_limiter),
    settings: Settings = Depends(get_app_settings),
    session: AsyncSession = Depends(get_db_session),
) -> ContactAccepted:
    await limiter.enforce(request, settings)
    if payload.website:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request could not be processed.",
        )

    existing = await session.scalar(
        select(ContactMessage).where(ContactMessage.submission_token == payload.submission_token)
    )
    if existing:
        return ContactAccepted(
            id=UUID(existing.id), received_at=existing.created_at or datetime.now(UTC)
        )

    message = ContactMessage(
        name=payload.name,
        email=str(payload.email),
        subject=payload.subject,
        message=payload.message,
        submission_token=payload.submission_token,
    )
    session.add(message)
    try:
        await session.commit()
        await session.refresh(message)
    except SQLAlchemyError as error:
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Contact service unavailable.",
        ) from error

    return ContactAccepted(id=UUID(message.id), received_at=message.created_at or datetime.now(UTC))
