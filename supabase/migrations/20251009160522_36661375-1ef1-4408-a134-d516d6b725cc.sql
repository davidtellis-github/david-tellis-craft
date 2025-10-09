-- Fix storage RLS policies for project-assets bucket
-- Allow public uploads to project-assets bucket
CREATE POLICY "Allow public uploads to project-assets"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'project-assets');

-- Allow public updates to project-assets bucket (for metadata updates)
CREATE POLICY "Allow public updates to project-assets"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'project-assets')
WITH CHECK (bucket_id = 'project-assets');

-- Ensure public can delete from project-assets (optional but useful)
CREATE POLICY "Allow public deletes from project-assets"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'project-assets');