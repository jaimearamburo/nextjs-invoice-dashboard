## Acme Invoice Dashboard

A full-stack invoice and customer management dashboard, built while completing the [Next.js App Router Course](https://nextjs.org/learn). Beyond the course material, I found and fixed several real bugs and built a complete customer management feature from scratch.

**[Live demo](#)** — log in with:
- Email: `user@nextmail.com`
- Password: `123456`

### Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Server Components, Server Actions)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org/) hosted on [Neon](https://neon.tech/)
- [NextAuth.js](https://authjs.dev/) (Credentials provider)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) for server-side form validation

### Bugs I found and fixed

- **Form fields were wiped out after a failed submission.** If validation failed on one field, every field in the form was being reset to empty — including ones the user had already filled in correctly. Fixed by having each server action echo back the submitted values and re-seeding the form from them, with a `key`-forced remount for the one element (`<select>`) that doesn't pick up an updated `defaultValue` on its own.
- **A malformed invoice/customer ID in the URL crashed with a raw database error** instead of a 404. Editing `/dashboard/invoices/<id>/edit` with a tampered, non-UUID-shaped ID hit Postgres's own `invalid input syntax for type uuid` error and surfaced it directly, rather than the app's existing "not found" page. Fixed by catching that specific Postgres error code and treating it the same as "no matching row."
- **`/seed` and `/query` were live, unauthenticated database routes in production.** Neither lived under `/dashboard`, so the app's auth check never covered them — anyone with the URL could re-run database writes with no login at all. Removed both entirely and replaced seeding with a local-only script (see below) that can never be reached over the network.

### What I extended beyond the course

- **Full customer management**, built to match the existing invoices flow: search, pagination, create, and edit, all with the same server-side Zod validation and inline field errors as invoices.
- **Optional profile images** — a customer's image URL isn't required; the customer table, invoice table, and dashboard's "Latest Invoices" widget all fall back to a generic avatar icon (the same icon used in the invoice form's customer picker) when none is set.
- **Local-only database seeding** — moved the course's `/seed` route into [scripts/seed.js](scripts/seed.js), run with `pnpm db:seed`, so a fresh clone can set up its database without ever exposing a public write endpoint.

### Running locally

1. Create a Postgres database (e.g. a free [Neon](https://neon.tech/) project) and copy `.env.example` to `.env`, filling in `POSTGRES_URL` and a generated `AUTH_SECRET` (`npx auth secret`).
2. Install dependencies and create the tables + load placeholder data:

   ```bash
   pnpm install
   pnpm db:seed
   ```

   `db:seed` runs [scripts/seed.js](scripts/seed.js) once against your database — it creates the `users`, `customers`, `invoices`, and `revenue` tables and inserts the same placeholder data the dashboard is built around (including the demo login below). It's a local script, not a route, so it's never reachable over the network.

3. Start the app:

   ```bash
   pnpm dev
   ```
