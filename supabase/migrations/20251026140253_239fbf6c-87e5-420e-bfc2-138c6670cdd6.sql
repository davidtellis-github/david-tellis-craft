-- Add Wedding Verse video asset
INSERT INTO project_assets (
  project_id,
  asset_type,
  file_name,
  file_path,
  is_featured,
  sort_order,
  alt_text
)
VALUES (
  '01c83245-9881-4735-aa19-759895686f2f',
  'video',
  'WVrecord.mp4',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-images/wedding-verse/WVrecord.mp4',
  true,
  0,
  'Wedding Verse video showcase'
);