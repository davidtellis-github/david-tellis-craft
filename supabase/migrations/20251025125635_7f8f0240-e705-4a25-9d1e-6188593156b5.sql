-- Phase 1: Add new columns to project_assets table
ALTER TABLE project_assets
ADD COLUMN IF NOT EXISTS contribution_level text DEFAULT 'Full',
ADD COLUMN IF NOT EXISTS show_in_gallery boolean DEFAULT true;

-- Add is_featured_on_home to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS is_featured_on_home boolean DEFAULT false;

-- Set first 4 projects as featured (matching current WorkGrid behavior)
UPDATE projects 
SET is_featured_on_home = true 
WHERE slug IN ('wedding-verse', 'futurcraft-ai', 'turbocloud', 'boston-financial');

-- Phase 2: Migrate all ui_explorations data to project_assets
INSERT INTO project_assets (
  project_id,
  asset_type,
  file_name,
  file_path,
  alt_text,
  caption,
  contribution_level,
  is_featured,
  asset_tags,
  sort_order,
  show_in_gallery,
  created_at
)
SELECT 
  project_id,
  'image' as asset_type,
  regexp_replace(image_url, '.*/([^/]+)$', '\1') as file_name,
  image_url as file_path,
  title as alt_text,
  description as caption,
  contribution_level,
  is_featured,
  tags as asset_tags,
  sort_order,
  true as show_in_gallery,
  created_at
FROM ui_explorations;

-- Phase 3: Drop ui_explorations table
DROP TABLE IF EXISTS ui_explorations CASCADE;