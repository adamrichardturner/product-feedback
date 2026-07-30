-- Reference schema for product feedback (applied via product-feedback-api/database.sql)

-- users (id, email, password_hash, created_at)
-- profiles (id → users, username, full_name, avatar_url, website, updated_at)
-- feedback (id, user_id, title, detail, category, status, order, upvotes, inserted_at, updated_at)
-- votes (id, user_id, feedback_id, created_at) unique (user_id, feedback_id)
-- comments (id, feedback_id, user_id, parent_comment_id, content, inserted_at)

-- Categories: ui | ux | enhancement | bug | feature
-- Statuses: suggestion | planned | progress | live
