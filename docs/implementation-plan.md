# Portfolio implementation plan

## Product intent

Build a premium, dark-first portfolio for an ML/AI engineer that makes technical depth easy to scan, gives featured work room to breathe, and provides a real contact path backed by FastAPI and a relational database. Because no personal profile, social links, résumé, or verified project measurements were supplied, the initial content is intentionally labeled as editable placeholder content rather than invented biography or performance claims.

## Sitemap

- `/` — hero, selected projects, about, capabilities, writing preview, contact, footer
- `/projects/:slug` — deep project case study with problem, approach, engineering notes, limitations, and links
- `/writing` — article list and writing themes; individual articles can be added to the content model without changing the page shell
- `/404` — accessible not-found state

## First visitor flows

1. A visitor lands on `/`, understands the engineer’s focus within one viewport, and reaches a featured project or contact action.
2. A visitor opens a project detail page, sees the problem framing and technical approach, and can return to the project index or follow a verified external link.
3. A visitor submits the contact form, receives inline validation, sees a loading state, and only sees success after the backend accepts and persists the message.

## Frontend structure

- `src/app` — router, app shell, error boundary, API bootstrap
- `src/components` — navigation, section primitives, buttons, project visuals, form controls
- `src/features` — projects, contact, writing and their hooks/data contracts
- `src/pages` — route-level composition
- `src/lib` — typed API client and utility functions
- `src/types` — shared frontend contracts
- `src/styles` — design tokens, responsive layout, motion and accessibility rules

## Visual system

- **Surfaces:** near-black ink, raised charcoal panels, hairline borders, warm off-white text.
- **Accents:** signal lime for active technical markers and electric violet for research emphasis.
- **Type:** a compact sans-serif stack for prose/headings and a system monospace stack for metadata, metrics, and labels.
- **Shape:** 2px/12px/24px radii depending on hierarchy; asymmetric grids and editorial rhythm instead of repeated card rows.
- **Motion:** short opacity/translate entrances, deliberate hover states, and reduced-motion fallbacks. No continuous decorative animation.

## API contract

- `GET /api/v1/health` → `{ status: "ok", service: string, database: "ok" | "unavailable" }`
- `GET /api/v1/projects` → `{ items: Project[], total: number }`
- `POST /api/v1/contact` → accepts `{ name, email, subject, message, submission_token, website? }` and returns `{ id, status: "accepted", received_at }`

Contact writes are validated by Pydantic, protected by a honeypot and an in-process IP rate limiter, deduplicated by a client-generated submission token, and persisted by SQLAlchemy. The in-process limiter is intentionally documented as a single-instance baseline; a horizontally scaled deployment should enforce the same policy at the edge or through a shared store.

## Dependency proposal

The dependency set is intentionally small: React + Vite + TypeScript, React Router, Lucide, Zod/React Hook Form for the client form, Tailwind’s maintained Vite plugin, FastAPI, Pydantic Settings, SQLAlchemy async, Alembic, aiosqlite/asyncpg, pytest/httpx, Ruff, mypy, Vitest/RTL, and Playwright. Versions are pinned from the package registries during setup and committed in lockfiles. Tailwind is configured through its dedicated Vite plugin rather than the deprecated v3 PostCSS integration.

## Delivery phases

1. Foundation: manifests, environment configuration, routing, API contracts, database model, tests.
2. Experience: responsive shell, premium visual language, project case studies, writing and contact sections.
3. Hardening: validation, persistence, rate limiting, security headers, error states, accessibility and SEO.
4. Delivery: Docker/Compose, migrations, CI, documentation, local build and test verification.

## Known content assumptions

The repository started empty. The initial content model used editable markers; the supplied résumé now populates `content/profile.json` and the three verified project summaries in `content/projects.json`. External project URLs and additional benchmark details remain absent where the résumé did not provide them.
