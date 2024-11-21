# Product Feedback App

A full-stack CRUD web application built with Next.js Route Handlers, Server & Client Components, and Supabase for persistent storage.

## Features

- Create, read, update, and delete product feedback
- Form validation for creating/editing feedback
- Sort suggestions by upvotes and comment count
- Filter suggestions by category
- Add comments and replies to feedback
- Upvote feedback items
- Drag and drop roadmap management
- Responsive design for all screen sizes
- Real-time updates using SWR
- User authentication

### Screenshot

![](./screenshot.png)

### Live Demo

Live Site URL: [https://feedback.adamrichardturner.dev](https://feedback.adamrichardturner.dev)

You can login to a demo account to test all features simply by visiting the above site and clicking the `Try Demo` button.

Once logged in, you can:

- Post, edit and delete feedback
- Add comments and replies
- Modify the Roadmap using drag and drop
- Upvote feedback items

### Built with

- Next.js 14 / React
- Supabase / PostgreSQL
- Tailwind CSS
- Shadcn/ui
- SWR for data fetching
- DND Kit for drag and drop

## Getting Started

1. Create a Supabase project at [database.new](https://database.new)

2. Clone this project with the following command: `git clone https://github.com/devadam88/product-feedback-app.git`

3. Navigate to the project directory:

   ```bash
   cd product-feedback-app
   ```

4. Create a `.env.local` file and update the following with your Supabase project details:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both values can be found in your [Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. Using the `queries.sql` file in the `sql` directory as a guide, create the relevant tables and RPC functions in your Supabase project's SQL editor.

6. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be running on [localhost:3000](http://localhost:3000/).
