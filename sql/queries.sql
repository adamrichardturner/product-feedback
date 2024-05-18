-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_name VARCHAR(255) NOT NULL
);

-- Insert categories
INSERT INTO categories (category_name) VALUES 
('UI'), 
('UX'), 
('Enhancement'), 
('Bug'), 
('Feature');

-- Create feedback table
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    inserted_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    title VARCHAR(255),
    detail TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL
);

-- Create comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feedback_id UUID REFERENCES feedback(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    comment TEXT NOT NULL,
    inserted_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Function to delete user feedback
CREATE OR REPLACE FUNCTION delete_user_feedback(feedback_id UUID, user_id UUID)
RETURNS VOID AS $$
BEGIN
    DELETE FROM feedback WHERE id = feedback_id AND user_id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on feedback update
CREATE OR REPLACE FUNCTION update_feedback_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_feedback_timestamp
BEFORE UPDATE ON feedback
FOR EACH ROW
EXECUTE FUNCTION update_feedback_timestamp();
