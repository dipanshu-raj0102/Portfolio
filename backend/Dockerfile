FROM python:3.11-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy \
    PATH="/app/backend/.venv/bin:$PATH"

WORKDIR /app

RUN pip install --no-cache-dir uv==0.13.0

COPY backend/pyproject.toml backend/uv.lock /app/backend/
RUN uv sync --directory /app/backend --frozen --no-dev

COPY backend/app /app/backend/app
COPY backend/migrations /app/backend/migrations
COPY backend/alembic.ini /app/backend/alembic.ini
COPY backend/docker-entrypoint.sh /app/backend/docker-entrypoint.sh
COPY content /app/content

WORKDIR /app/backend
RUN chmod +x /app/backend/docker-entrypoint.sh

EXPOSE 8000

CMD ["/app/backend/docker-entrypoint.sh"]
