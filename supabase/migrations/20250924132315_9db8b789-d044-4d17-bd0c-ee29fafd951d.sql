-- Update existing featured assets for Wedding Verse project to not be featured
UPDATE project_assets 
SET is_featured = false 
WHERE project_id = '01c83245-9881-4735-aa19-759895686f2f' 
AND is_featured = true;

-- Insert the new video asset as the featured asset
INSERT INTO project_assets (
  project_id,
  file_name,
  file_path,
  asset_type,
  mime_type,
  is_featured,
  alt_text,
  sort_order
) VALUES (
  '01c83245-9881-4735-aa19-759895686f2f',
  'WVrecord.mp4',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-videos/WVrecord.mp4',
  'video',
  'video/mp4',
  true,
  'Wedding Verse project video preview',
  0
);