-- Add INSERT policy for ui_explorations table
CREATE POLICY "Allow public inserts to ui_explorations"
ON ui_explorations
FOR INSERT
TO public
WITH CHECK (true);

-- Insert missing UI exploration records
INSERT INTO ui_explorations (project_id, title, image_url, tags, contribution_level, is_featured, sort_order)
SELECT 
  p.id,
  'Drone Services Cards',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-drone-services.png',
  ARRAY['UI Design', 'Card Component', 'Services'],
  'UI Contributor',
  false,
  0
FROM projects p
WHERE p.slug = 'turbocloud';

INSERT INTO ui_explorations (project_id, title, image_url, tags, contribution_level, is_featured, sort_order)
SELECT 
  p.id,
  'Futurecraft Signup',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-futurecraft-signup.png',
  ARRAY['UI Design', 'Authentication', 'Form Design'],
  'UI Contributor',
  false,
  0
FROM projects p
WHERE p.slug = 'futurcraft-ai';

INSERT INTO ui_explorations (project_id, title, image_url, tags, contribution_level, is_featured, sort_order)
SELECT 
  p.id,
  'Futurecraft Onboarding',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-futurecraft-onboarding.png',
  ARRAY['UI Design', 'Onboarding', 'User Experience'],
  'UI Contributor',
  false,
  0
FROM projects p
WHERE p.slug = 'futurcraft-ai';

INSERT INTO ui_explorations (project_id, title, image_url, tags, contribution_level, is_featured, sort_order)
SELECT 
  p.id,
  'FinOps Dashboard',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-finops-dashboard.png',
  ARRAY['UI Design', 'Dashboard', 'Data Visualization'],
  'UI Contributor',
  false,
  0
FROM projects p
WHERE p.slug = 'turbocloud';

INSERT INTO ui_explorations (project_id, title, image_url, tags, contribution_level, is_featured, sort_order)
SELECT 
  p.id,
  'Vision Board Gallery',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-vision-board.png',
  ARRAY['UI Design', 'Gallery', 'Visual Design'],
  'UI Contributor',
  false,
  0
FROM projects p
WHERE p.slug = 'wedding-verse';

INSERT INTO ui_explorations (project_id, title, image_url, tags, contribution_level, is_featured, sort_order)
SELECT 
  p.id,
  'Vendor Profile Page',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-weddingverse-vendor.png',
  ARRAY['UI Design', 'Profile', 'Vendor Management'],
  'UI Contributor',
  false,
  0
FROM projects p
WHERE p.slug = 'wedding-verse';

INSERT INTO ui_explorations (project_id, title, image_url, tags, contribution_level, is_featured, sort_order)
SELECT 
  p.id,
  'Weddingverse Homepage',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-weddingverse-home.png',
  ARRAY['UI Design', 'Homepage', 'Hero Section'],
  'UI Contributor',
  false,
  0
FROM projects p
WHERE p.slug = 'wedding-verse';

INSERT INTO ui_explorations (project_id, title, image_url, tags, contribution_level, is_featured, sort_order)
SELECT 
  p.id,
  'Reviews Section',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-reviews-section.png',
  ARRAY['UI Design', 'Reviews', 'Social Proof'],
  'UI Contributor',
  false,
  0
FROM projects p
WHERE p.slug = 'wedding-verse';

INSERT INTO ui_explorations (project_id, title, image_url, tags, contribution_level, is_featured, sort_order)
SELECT 
  p.id,
  'Timeline Vision Design',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-timeline-vision.png',
  ARRAY['UI Design', 'Timeline', 'Visual Design'],
  'UI Contributor',
  false,
  0
FROM projects p
WHERE p.slug = 'ideabaaz';