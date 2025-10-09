-- Add TurboCloud main dashboard image as the primary featured asset
INSERT INTO project_assets (
  project_id,
  asset_type,
  file_name,
  file_path,
  mime_type,
  alt_text,
  caption,
  is_featured,
  sort_order,
  asset_tags
)
SELECT 
  (SELECT id FROM projects WHERE slug = 'turbocloud'),
  'image',
  'turbocloud-main-dashboard.png',
  '/src/assets/turbocloud-main-dashboard.png',
  'image/png',
  'TurboCloud FinOps Dashboard - Cloud Infrastructure Spend Management',
  'FinOps Dashboard showing cloud infrastructure spend of $15,870 with real-time analytics, forecast predictions, and cost optimization insights',
  true,
  0,
  ARRAY['dashboard', 'finops', 'hero', 'main-screen', 'analytics']
WHERE NOT EXISTS (
  SELECT 1 FROM project_assets 
  WHERE file_name = 'turbocloud-main-dashboard.png'
);