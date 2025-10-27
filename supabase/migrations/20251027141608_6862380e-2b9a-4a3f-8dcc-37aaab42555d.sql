-- Add hero image for Wedding Verse project
INSERT INTO project_assets (
  project_id,
  asset_type,
  file_name,
  file_path,
  alt_text,
  is_featured,
  show_in_gallery,
  sort_order
)
VALUES (
  '01c83245-9881-4735-aa19-759895686f2f', -- wedding-verse project ID
  'image',
  'weddingverse-hero.png',
  '/src/assets/weddingverse-hero.png',
  'Wedding Verse digital wedding planning platform hero image',
  true,
  false,
  -1 -- Ensure it appears first as hero
)
ON CONFLICT DO NOTHING;