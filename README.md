# AutoService CRM

Full-stack auto service management application built as a production-oriented portfolio project.

AutoService CRM is designed to combine a public multilingual auto service website with a role-based CRM system for managing customers, vehicles, appointments, repairs, services, invoices, mechanics, and operational data.

The project is organized as an **npm workspaces monorepo** with separate frontend, backend, and shared API contracts.

> **Project status:** active development.

---

## Features

### Currently implemented

- multilingual public website
- Ukrainian, English, and Polish locales
- responsive marketing pages
- reusable UI component architecture
- light and dark themes
- services catalog
- individual service pages
- service data stored in MongoDB
- REST API for services
- shared frontend/backend DTO and validation contracts
- API request validation with Zod
- centralized API error handling
- structured request logging
- MongoDB duplicate-key handling
- API integration tests
- isolated MongoDB test environment with `mongodb-memory-server`
- SEO metadata and Open Graph support
- frontend ↔ backend API integration

### In progress

- completion of the public marketing website
- service management API
- API validation and error contract standardization
- integration test coverage
- production deployment configuration
- SEO and metadata improvements

### Planned CRM functionality

- authentication and authorization
- protected routes
- role-based access control
- customer management
- vehicle management
- mechanic management
- appointments
- repair orders
- repair status tracking
- invoices
- notifications
- dashboard and statistics
- search, filtering, sorting, and pagination
- photo/file uploads
- service history
- user profile and settings

---

## System roles

The CRM is planned around the following roles:

### Admin

Full access to the system, including users, customers, vehicles, repairs, invoices, services, mechanics, settings, and analytics.

### Manager

Operational access for managing customers, vehicles, appointments, repairs, invoices, and service workflow.

### Mechanic

Access to assigned repairs, repair statuses, comments, photos, and information about parts and completed work.

### Client

Access to personal vehicles, appointments, repair history, invoices, and related service information.

> Role-based CRM functionality is part of the planned application scope and is not yet fully implemented.

---

## Tech stack

### Frontend

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [next-intl](https://next-intl.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Zod](https://zod.dev/)
- [shadcn](https://ui.shadcn.com/)
- [Base UI](https://base-ui.com/)
- [Font Awesome](https://fontawesome.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- Class Variance Authority
- clsx
- tailwind-merge

### Backend

- [Node.js](https://nodejs.org/) 24
- [Express](https://expressjs.com/) 5
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/)
- [Pino HTTP](https://github.com/pinojs/pino-http)
- [Helmet](https://helmetjs.github.io/)
- [CORS](https://github.com/expressjs/cors)
- [http-errors](https://github.com/jshttp-errors/http-errors)

### Testing

- [Vitest](https://vitest.dev/)
- [Supertest](https://github.com/ladjs/supertest)
- [mongodb-memory-server](https://github.com/typegoose/mongodb-memory-server)

### Tooling

- npm workspaces
- ESLint
- TypeScript
- tsx
- concurrently

---

## Architecture

The repository is structured as a monorepo:

```text
autoservice-formula1/
├── apps/
│   ├── web/                  # Next.js frontend
│   └── api/                  # Express REST API
│
├── packages/
│   └── contracts/            # Shared DTOs, schemas and API contracts
│
├── package.json              # Root workspace configuration
├── package-lock.json
├── .gitignore
└── README.md
```

### `apps/web`

The frontend application contains the public website and will later contain the authenticated CRM interface.

Main responsibilities:

```text
apps/web/
├── public/
├── src/
│   ├── app/                  # Next.js App Router
│   ├── features/             # Feature-oriented application modules
│   ├── i18n/                 # Internationalization configuration
│   ├── lib/                  # Shared frontend utilities
│   └── ...
├── .env.example
└── package.json
```

### `apps/api`

The backend is an Express REST API connected to MongoDB.

Main responsibilities:

```text
apps/api/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── ...
├── .env.example
└── package.json
```

The exact internal structure continues to evolve as new application domains are implemented.

### `packages/contracts`

Shared package used by both frontend and backend.

It contains reusable:

- DTO schemas
- request/response contracts
- enums
- validation schemas
- TypeScript types

This prevents frontend and backend API types from drifting apart.

---

## Requirements

Make sure the following tools are installed before starting:

- **Node.js >= 24.0.0 and < 25.0.0**
- **npm**
- access to a MongoDB database for normal development

Check your Node.js version:

```bash
node --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Vlad-Rzaiev/autoservice-formula1.git
cd autoservice-formula1
```

Switch to the development branch:

```bash
git checkout dev
```

Install all workspace dependencies from the repository root:

```bash
npm install
```

You do **not** need to run `npm install` separately inside every workspace.

---

## Environment variables

The frontend and backend use separate environment files.

### Backend

Copy:

```text
apps/api/.env.example
```

to:

```text
apps/api/.env
```

Example:

```env
PORT=7777

MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_cluster
MONGODB_DB=your_database_name

NODE_ENV=development

CORS_ORIGINS=http://localhost:3000

VERCEL_PROJECT_NAME=
VERCEL_TEAM_SLUG=
```

MongoDB credentials are used by the API to construct the database connection URI.

Do not commit real credentials or secrets.

### Frontend

Copy:

```text
apps/web/.env.example
```

to:

```text
apps/web/.env.local
```

Default local configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:7777/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Local development

### Run the complete application

From the repository root:

```bash
npm run dev
```

This:

1. builds the shared contracts package;
2. starts contracts in watch mode;
3. starts the Next.js frontend;
4. starts the Express API.

Local URLs:

| Application | URL                            |
| ----------- | ------------------------------ |
| Frontend    | `http://localhost:3000`        |
| Backend     | `http://localhost:7777`        |
| REST API    | `http://localhost:7777/api/v1` |

---

## Run individual applications

### Frontend only

```bash
npm run dev:web
```

### Backend only

```bash
npm run dev:api
```

Both commands build the shared contracts package before starting the selected application.

### Next.js with Turbopack

```bash
npm run dev:turbo
```

The default frontend development command currently uses Webpack.

---

## Shared contracts

The frontend and backend use the internal workspace package:

```text
@autoservice/contracts
```

Build it manually with:

```bash
npm run build:contracts
```

During normal full-stack development, the root `npm run dev` command also runs the contracts TypeScript compiler in watch mode.

---

## Testing

Backend tests use **Vitest**, **Supertest**, and **mongodb-memory-server**.

This allows integration tests to run against an isolated temporary MongoDB instance instead of the development or production database.

Run all API tests:

```bash
npm run test -w apps/api
```

Run tests in watch mode:

```bash
npm run test:watch -w apps/api
```

---

## Type checking

Run TypeScript checks across all applicable workspaces:

```bash
npm run typecheck
```

---

## Linting

Run ESLint across all applicable workspaces:

```bash
npm run lint
```

---

## Production build

Build the complete monorepo:

```bash
npm run build
```

The command builds:

```text
@autoservice/contracts
        ↓
apps/web
        ↓
apps/api
```

You can also build applications individually.

Frontend:

```bash
npm run build:web
```

Backend:

```bash
npm run build:api
```

---

## Start the production API

After building the backend:

```bash
npm run start:api
```

The compiled Express application is started from the API `dist` directory.

---

## Internationalization

The public frontend currently supports:

- 🇵🇱 Polish — `pl`
- 🇬🇧 English — `en`
- 🇺🇦 Ukrainian — `uk`

Localized routes follow the Next.js App Router locale structure, for example:

```text
/pl
/en
/uk

/pl/services
/en/services
/uk/services
```

Service content is also stored with localized translations.

---

## API design

The backend follows a REST-oriented structure.

Current API base URL:

```text
/api/v1
```

API errors use a common response contract:

```json
{
  "status": 404,
  "success": false,
  "code": "ROUTE_NOT_FOUND",
  "message": "Route not found.",
  "requestId": "..."
}
```

Some validation and domain errors may additionally contain a `details` property:

```json
{
  "status": 400,
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Invalid request body.",
  "details": {},
  "requestId": "..."
}
```

The `requestId` allows an API response to be correlated with server logs.

---

## Services module

The services domain is one of the first full-stack modules implemented in the project.

A service contains data such as:

```text
slug
category
iconKey
featured
sortOrder
isActive
translations
createdAt
updatedAt
```

Translations are maintained for all supported locales:

```text
pl
en
uk
```

The same contracts are shared between the API and frontend through `@autoservice/contracts`.

---

## Deployment

The architecture supports independent deployment of the two applications:

```text
Frontend
Next.js
    ↓
Vercel

Backend
Express API
    ↓
Node.js hosting
    ↓
MongoDB Atlas
```

Production URLs are intentionally not hardcoded in the repository.

They are configured through environment variables:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_API_URL=
```

For local development:

```text
Frontend: http://localhost:3000
API:      http://localhost:7777/api/v1
```

---

## Development roadmap

The project is being developed incrementally.

### Public website

- [x] monorepo setup
- [x] responsive frontend foundation
- [x] multilingual routing
- [x] dark/light theme support
- [x] reusable UI components
- [x] services listing
- [x] individual service pages
- [x] frontend/backend service integration
- [x] SEO metadata foundation
- [ ] complete all marketing sections
- [ ] booking flow

### Backend

- [x] Express API foundation
- [x] MongoDB/Mongoose integration
- [x] environment validation
- [x] centralized error handling
- [x] structured request logging
- [x] Zod request validation
- [x] services domain
- [x] shared API contracts
- [x] integration test infrastructure
- [ ] authentication
- [ ] authorization / RBAC
- [ ] customers
- [ ] vehicles
- [ ] mechanics
- [ ] appointments
- [ ] repairs
- [ ] invoices
- [ ] notifications
- [ ] file uploads

### CRM

- [ ] authentication UI
- [ ] protected dashboard
- [ ] role-based navigation
- [ ] customer management
- [ ] vehicle management
- [ ] mechanic workspace
- [ ] appointments calendar
- [ ] repair workflow
- [ ] invoices
- [ ] dashboard statistics
- [ ] charts
- [ ] notifications
- [ ] profile and settings

---

## Repository

GitHub:

```text
https://github.com/Vlad-Rzaiev/autoservice-formula1
```

Development branch:

```text
dev
```

---

## Author

**Vlad Rzaiev**

GitHub: [Vlad-Rzaiev](https://github.com/Vlad-Rzaiev)

---

## License

This project is currently developed as a portfolio and educational project.

Check the repository for the current licensing terms before reusing the source code.
