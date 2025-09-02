-- Remove dangerous public upload policies on storage buckets
-- This prevents anonymous users from uploading files to your storage buckets
-- while maintaining public read access for portfolio functionality

-- Drop any existing public upload policies that allow anonymous file uploads
DROP POLICY IF EXISTS "Allow public uploads to project-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads to project-videos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads to project-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow public insert to project-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public insert to project-videos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public insert to project-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update to project-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update to project-videos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update to project-assets" ON storage.objects;

-- Ensure public read access is maintained for portfolio functionality
-- (These may already exist, but we're ensuring they're properly configured)
CREATE POLICY "Allow public read access to project-images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Allow public read access to project-videos" 
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-videos');

CREATE POLICY "Allow public read access to project-assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-assets');

-- Add comments to document the security configuration
COMMENT ON TABLE storage.objects IS 'Portfolio storage - public read access only, no anonymous uploads allowed';