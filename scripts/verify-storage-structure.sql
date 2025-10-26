-- Verification Query: Check Storage Structure Compliance
-- Run this in Supabase SQL Editor to see migration status

SELECT 
  p.slug as project_slug,
  p.title as project_title,
  pa.file_name,
  pa.file_path,
  pa.asset_type,
  CASE 
    WHEN pa.file_path LIKE '%/project-assets/' || p.slug || '/%' THEN '✓ Correct Structure'
    WHEN pa.file_path LIKE '/src/assets/%' THEN '⚠ Local Path (needs upload)'
    WHEN pa.file_path LIKE '%/project-images/%' THEN '⚠ Old bucket (needs migration)'
    WHEN pa.file_path LIKE '%/project-assets/%' AND pa.file_path NOT LIKE '%/project-assets/' || p.slug || '/%' THEN '⚠ Wrong folder'
    ELSE '✗ Unknown structure'
  END as migration_status,
  pa.created_at
FROM project_assets pa
JOIN projects p ON pa.project_id = p.id
ORDER BY 
  CASE 
    WHEN pa.file_path LIKE '%/project-assets/' || p.slug || '/%' THEN 1
    ELSE 2
  END,
  p.slug, 
  pa.sort_order;

-- Summary by status
SELECT 
  CASE 
    WHEN pa.file_path LIKE '%/project-assets/' || p.slug || '/%' THEN 'Correct Structure'
    WHEN pa.file_path LIKE '/src/assets/%' THEN 'Local Path'
    WHEN pa.file_path LIKE '%/project-images/%' THEN 'Old Bucket'
    ELSE 'Other'
  END as status,
  COUNT(*) as count
FROM project_assets pa
JOIN projects p ON pa.project_id = p.id
GROUP BY 
  CASE 
    WHEN pa.file_path LIKE '%/project-assets/' || p.slug || '/%' THEN 'Correct Structure'
    WHEN pa.file_path LIKE '/src/assets/%' THEN 'Local Path'
    WHEN pa.file_path LIKE '%/project-images/%' THEN 'Old Bucket'
    ELSE 'Other'
  END
ORDER BY count DESC;
