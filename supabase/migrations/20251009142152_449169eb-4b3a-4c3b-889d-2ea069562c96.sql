-- Update existing turbocloud main dashboard to sort_order 1
UPDATE project_assets
SET sort_order = 1
WHERE project_id = (SELECT id FROM projects WHERE slug = 'turbocloud')
  AND file_name = 'turbocloud-main-dashboard.png';

-- Add new TurboCloud dashboard as the first image (sort_order 0)
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
  'turbocloud-dashboard-main.png',
  '/src/assets/turbocloud-dashboard-main.png',
  'image/png',
  'TurboCloud FinOps Dashboard - Cloud Cost Breakdown by Provider',
  'Comprehensive FinOps dashboard showing $15,870 cloud infrastructure spend with detailed breakdown across AWS, Azure, and GCP, Kubernetes cost tracking at $4,000, and spend prediction analytics',
  true,
  0,
  ARRAY['dashboard', 'finops', 'hero', 'cloud-cost', 'multi-cloud', 'analytics']
WHERE NOT EXISTS (
  SELECT 1 FROM project_assets 
  WHERE file_name = 'turbocloud-dashboard-main.png'
);