from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"), env_file_encoding="utf-8", extra="ignore"
    )

    app_env: str = "development"
    app_name: str = "ML Systems Portfolio API"
    database_url: str = "sqlite+aiosqlite:///./portfolio.db"
    cors_origins: str = "http://localhost:5173"
    contact_rate_limit: int = Field(default=5, ge=1, le=100)
    contact_rate_window_seconds: int = Field(default=900, ge=10, le=86_400)
    auto_create_tables: bool = False
    log_level: str = "INFO"
    mail_provider: str | None = None
    mail_from: str | None = None
    mail_to: str | None = None
    mail_api_key: str | None = None

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def is_production(self) -> bool:
        return self.app_env.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
