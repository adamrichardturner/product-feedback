# Product feedback app

This is my solution to the Product Feedback app project on Frontend Mentor.

I completed it as a full stack CRUD web app, using Next's Route Handlers, Server & Client Components with Supabase for persistent storage.

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests

### Screenshot

![](./screenshot.png)

### Links

- Live Site URL: [https://feedback.adamrichardturner.dev](https://feedback.adamrichardturner.dev)

You can login to a demo account where you can post, edit and delete feedback, as well as add comments & modify the Roadmap.

Click the avatar in the top right on desktop or open the burger menu / mobile navigation and tap the avatar there.

- User Email: demo@demo.com
- Password: demo

### Built with

- Next.js / React
- Supabase / PostgreSQL
- Tailwind
- Shadcn

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app -e with-supabase
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).
