# URL Bookmark Manager

A full-stack application for securely saving, organizing, searching, and favoriting private website bookmarks.

## Module 1: project setup

This repository uses npm workspaces to keep the React/Vite client and Express API separate while allowing a single development command.

```
.
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Reusable UI components (upcoming)
│       ├── context/        # Authentication context (upcoming)
│       ├── hooks/          # Reusable hooks (upcoming)
│       ├── pages/          # Route-level UI (upcoming)
│       ├── services/       # HTTP clients (upcoming)
│       ├── styles/         # Global styles
│       └── utils/          # Client helpers (upcoming)
└── server/                 # Express API
    └── src/
        ├── config/         # Configuration (upcoming)
        ├── controllers/    # HTTP controllers (upcoming)
        ├── middleware/     # Express middleware (upcoming)
        ├── routes/         # API routes (upcoming)
        ├── services/       # Domain services (upcoming)
        └── utils/          # Server helpers (upcoming)
```

## Tech stack

- Client: React, Vite, React Router, Axios, React Hook Form, Zod, CSS
- Server: Node.js, Express
- Database (next module): PostgreSQL with Prisma ORM

## Getting started

1. Install Node.js 20+ and PostgreSQL.
2. Copy `client/.env.example` to `client/.env` and `server/.env.example` to `server/.env`.
3. Install dependencies with `npm install`.
4. Run both apps with `npm run dev`.

The client runs at `http://localhost:5173`; the API health endpoint is `http://localhost:5000/health`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORT` | Express server port |
| `CLIENT_ORIGIN` | Browser origin permitted by CORS |
| `DATABASE_URL` | PostgreSQL connection string (used in Module 2) |
| `JWT_SECRET` | Secret used to sign access tokens (used in Module 3) |
| `JWT_EXPIRES_IN` | JWT lifetime (used in Module 3) |
| `VITE_API_BASE_URL` | API base URL used by the client |

## Database setup

After setting `DATABASE_URL` in `server/.env`, create and apply the schema migration:

```powershell
npm.cmd run prisma:migrate --workspace=server -- --name init
```

Regenerate the Prisma client after changing `server/prisma/schema.prisma`:

```powershell
npm.cmd run prisma:generate --workspace=server
```

## API documentation

All bookmark endpoints require `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account and receive a JWT |
| POST | `/api/auth/login` | Sign in and receive a JWT |
| GET | `/api/auth/me` | Get the signed-in user |
| GET | `/api/bookmarks?q=&category=&favorites=` | List, search, and filter private bookmarks |
| GET | `/api/bookmarks/search?q=` | Search private bookmarks |
| GET | `/api/bookmarks/:id` | Get one private bookmark |
| POST | `/api/bookmarks` | Create a bookmark |
| PUT | `/api/bookmarks/:id` | Update a bookmark |
| PATCH | `/api/bookmarks/:id/favorite` | Toggle a bookmark favorite |
| DELETE | `/api/bookmarks/:id` | Delete a bookmark |

## Testing checklist

1. Register a new account, then log out and sign back in.
2. Create a bookmark using a public `https://` URL; verify that `localhost`, plain text, and `http://` URLs are rejected.
3. Edit a bookmark, toggle its favorite star, and use the favorites/category/search controls.
4. Open a second account to confirm it cannot see the first account’s bookmarks.
5. Delete a bookmark and confirm the dialog before deletion.

## Deployment

Build the client with `npm.cmd run build --workspace=client` and host `client/dist` on any static host. Deploy the Express server separately with its production `DATABASE_URL`, a long random `JWT_SECRET`, and `CLIENT_ORIGIN` set to the exact deployed client URL. Run `npx prisma migrate deploy` as part of the server release process.

## Screenshots

_Add screenshots of the login screen and bookmark dashboard here after deployment._
