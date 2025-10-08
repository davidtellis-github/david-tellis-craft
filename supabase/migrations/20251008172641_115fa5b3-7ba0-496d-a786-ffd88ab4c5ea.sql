-- Add Ideabaaz project mockup assets
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
  (SELECT id FROM projects WHERE slug = 'ideabaaz'),
  'image',
  file_name,
  file_path,
  'image/jpeg',
  alt_text,
  caption,
  is_featured,
  sort_order,
  asset_tags
FROM (VALUES
  ('ideabaaz-mockup-1.jpg', '/src/assets/ideabaaz-mockup-1.jpg', 'Ideabaaz landing page hero section mockup', 'Landing page featuring "Get visible. Get funded. Get growing." hero messaging with startup ecosystem preview', true, 1, ARRAY['hero', 'landing-page', 'mockup']),
  ('ideabaaz-mockup-2.jpg', '/src/assets/ideabaaz-mockup-2.jpg', 'Ideabaaz get started section mockup', 'Get Started section showing founder registration form and ecosystem cards for investors and mentors', true, 2, ARRAY['get-started', 'user-journey', 'mockup'])
) AS assets(file_name, file_path, alt_text, caption, is_featured, sort_order, asset_tags);