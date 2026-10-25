from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class ContactCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=3, max_length=180)
    message: str = Field(min_length=20, max_length=4000)
    submission_token: str = Field(min_length=16, max_length=80)
    website: str | None = Field(default=None, max_length=0)

    @field_validator("submission_token")
    @classmethod
    def validate_submission_token(cls, value: str) -> str:
        if not all(character.isalnum() or character in "-_" for character in value):
            raise ValueError("Invalid submission token")
        return value


class ContactAccepted(BaseModel):
    id: UUID
    status: str = "accepted"
    received_at: datetime
