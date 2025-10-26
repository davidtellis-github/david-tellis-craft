-- First, let's identify which assets to keep (2 per project)
-- We'll keep the first 2 assets based on created_at for each project
WITH ranked_assets AS (
  SELECT 
    id,
    project_id,
    ROW_NUMBER() OVER (PARTITION BY project_id ORDER BY created_at) as row_num
  FROM project_assets
)
DELETE FROM project_assets
WHERE id IN (
  SELECT id 
  FROM ranked_assets 
  WHERE row_num > 2
);