-- Add RLS policies for storage buckets to allow uploads

-- Policy for project-images bucket
CREATE POLICY "Allow public upload to project-images bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-images');

-- Policy for project-videos bucket  
CREATE POLICY "Allow public upload to project-videos bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-videos');

-- Policy for project-assets bucket
CREATE POLICY "Allow public upload to project-assets bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-assets');

-- Policy for public read access to all project buckets
CREATE POLICY "Allow public read access to project buckets"
ON storage.objects
FOR SELECT
USING (bucket_id IN ('project-images', 'project-videos', 'project-assets'));