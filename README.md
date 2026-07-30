# Product Feedback

A full-stack product feedback application built with Next.js route handlers on the frontend and an Express + PostgreSQL API.

Live demo: [https://feedback.adamrichardturner.dev](https://feedback.adamrichardturner.dev)

The backend repository is [product-feedback-api](https://github.com/adamrichardturner/product-feedback-api).

## Features

- Create, read, update, and delete product feedback
- Form validation for creating and editing feedback
- Sort suggestions by upvotes and comment count
- Filter suggestions by category
- Add comments and replies
- Upvote feedback items
- Drag and drop roadmap management
- Responsive layout
- Client cache updates with SWR
- Demo login via JWT httpOnly cookie

## Built with

- Next.js 16 / React 19
- Express API with PostgreSQL
- Tailwind CSS
- Shadcn/ui
- SWR
- DND Kit

## Requirements

- Node.js 20.9+
- The [product-feedback-api](https://github.com/adamrichardturner/product-feedback-api) running locally (default `http://localhost:3002`)

## Getting started

1. Clone this repository:

   ```bash
   git clone https://github.com/adamrichardturner/product-feedback.git
   cd product-feedback
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file:

   ```env
   BACKEND_URL=http://localhost:3002
   NEXT_PUBLIC_BASE_URL=
   ```

4. Start the backend (from the API repository):

   ```bash
   npm run docker:dev
   ```

5. Start the frontend:

   ```bash
   npm run dev
   ```

The app will be available at [http://localhost:3000](http://localhost:3000/).

## Environment variables

| Variable               | Description                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `BACKEND_URL`          | Origin of the Express API used by Next.js route handlers (default `http://localhost:3002`)         |
| `NEXT_PUBLIC_BASE_URL` | Optional public base URL for Axios. Leave empty in local development so requests stay same-origin. |

## How it works in development

1. The browser calls Next.js routes such as `/api/feedback` and `/api/auth/demo`.
2. Those route handlers forward the request (including cookies) to the Express API.
3. Demo login sets an httpOnly `token` cookie used by protected API calls and `proxy` route protection.

## Scripts

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the Next.js development server |
| `npm run build`  | Create a production build            |
| `npm start`      | Serve the production build           |
| `npm run lint`   | Run ESLint                           |
| `npm run format` | Format files with Prettier           |

## Demo account

Click **Try Demo** on the login page. Default credentials seeded by the API are `demo@demo.com` / `demo`.
