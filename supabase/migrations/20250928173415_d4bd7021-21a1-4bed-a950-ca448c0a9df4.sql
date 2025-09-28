-- Update project titles and add new featured images
UPDATE projects SET title = 'Boston Financial', slug = 'boston-financial' WHERE id = 'c67b4df7-ae8b-47b9-91d8-15112b8fd5be';

-- Remove existing featured assets for these projects
UPDATE project_assets SET is_featured = false WHERE project_id IN (
  '59d9a32c-eadb-410c-be3c-f8182bcd3fdf', -- Turbocloud
  '118029bb-894b-40b5-b197-95d2d6ada829', -- Futurcraft AI
  '61da71ce-0a38-4314-b39c-dbbc24faf475', -- HealthCare Platform
  'c67b4df7-ae8b-47b9-91d8-15112b8fd5be'  -- Boston Financial (formerly Corporate Website)
) AND is_featured = true;

-- Insert new featured assets
INSERT INTO project_assets (project_id, file_name, file_path, asset_type, mime_type, is_featured, alt_text, sort_order) VALUES
('59d9a32c-eadb-410c-be3c-f8182bcd3fdf', 'tubocloud-dashboard.png', 'tubocloud-dashboard.png', 'image', 'image/png', true, 'Turbocloud FinOps Dashboard', 0),
('118029bb-894b-40b5-b197-95d2d6ada829', 'futurcraft-ai.png', 'futurcraft-ai.png', 'image', 'image/png', true, 'FutureCraft AI Platform Interface', 0),
('61da71ce-0a38-4314-b39c-dbbc24faf475', 'medpass-healthcare.png', 'medpass-healthcare.png', 'image', 'image/png', true, 'Medpass Healthcare Mobile App', 0),
('c67b4df7-ae8b-47b9-91d8-15112b8fd5be', 'boston-financial.png', 'boston-financial.png', 'image', 'image/png', true, 'Boston Financial GST Management System', 0);