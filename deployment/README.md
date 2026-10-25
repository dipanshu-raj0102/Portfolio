# Deployment checklist

This repository contains production-oriented build artifacts, but it does not assume a hosting vendor. Use a managed PostgreSQL provider and two deployable services: a static frontend container and a FastAPI API container.

## Required production configuration

Backend:

- `APP_ENV=production`
- `DATABASE_URL=postgresql+asyncpg://...`
- `CORS_ORIGINS=https://portfolio.example`
- `AUTO_CREATE_TABLES=false`
- `CONTACT_RATE_LIMIT` and `CONTACT_RATE_WINDOW_SECONDS` set to an abuse-tolerant policy
- Optional mail provider variables stored in the platform secret manager

Frontend build:

- `VITE_API_URL=https://api.example` at build time
- `VITE_SITE_URL=https://portfolio.example`

## Release sequence

1. Build and test the frontend and backend from lockfiles.
2. Build the API image and run `alembic upgrade head` once as a release/migration job.
3. Deploy the API with a readiness check on `GET /api/v1/health`.
4. Build and deploy the Nginx frontend image.
5. Configure HTTPS, DNS, cache policy, and a route from the frontend origin to the API origin.
6. Verify a project detail route on a direct load, the health endpoint, and a contact submission in a non-production environment.

## Operations

- Keep PostgreSQL backups and test restores periodically.
- Route application logs to a managed sink; the API intentionally avoids message-body logging.
- Alert on repeated 5xx responses, database-unavailable health responses, and rate-limit spikes.
- Set a contact-message retention window and delete records when they no longer serve a documented purpose.
- If running more than one API replica, enforce contact rate limiting at the edge or through a shared store; the included in-process limiter is only a safe single-instance baseline.
- Rotate mail and database credentials through the platform secret manager, never by rebuilding frontend assets.
