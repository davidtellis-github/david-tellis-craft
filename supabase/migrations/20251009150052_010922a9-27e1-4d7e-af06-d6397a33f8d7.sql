-- Add sort_order column to categories if it doesn't exist
ALTER TABLE categories ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Set all existing project category_id to NULL temporarily
UPDATE projects SET category_id = NULL;

-- Clear existing categories
DELETE FROM categories;

-- Insert new categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Product Design', 'product-design', 'Full product design projects', 1),
  ('Concepts & Experiments', 'concepts-experiments', 'Experimental and conceptual work', 2),
  ('Interaction Design', 'interaction-design', 'Interaction design focused projects', 3),
  ('UI Design', 'ui-design', 'UI design explorations', 4);