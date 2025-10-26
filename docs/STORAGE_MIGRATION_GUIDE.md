# Storage Migration Guide

## Current Situation

Your assets are currently scattered across multiple locations:
- `project-images/{project-slug}/` - Some project assets
- `project-assets/` (root) - Some assets without folders
- `/src/assets/` - Local file paths (need to be uploaded)

## Goal

Consolidate all assets into organized folders:
```
project-assets/
├── boston-financial/
├── futurcraft-ai/
├── health-project/
├── ideabaaz/
├── turbocloud/
└── wedding-verse/
```

## Migration Steps

### Step 1: Move Files in Supabase Storage

You need to manually move files in the Supabase Storage UI since there's no built-in move/rename operation.

#### For each project:

1. **Boston Financial**
   - Current: `project-assets/Boston.png` (root)
   - Action: 
     - Create folder `boston-financial` in `project-assets` bucket
     - Download `Boston.png` from root
     - Upload to `project-assets/boston-financial/boston-financial.png`
   - Also move from `project-images/web-design-1/work-7.jpg` to `project-assets/boston-financial/work-7.jpg`

2. **FuturCraft AI**
   - Current: `project-images/futurcraft-ai/`
   - Action: Move all files from `project-images/futurcraft-ai/` to `project-assets/futurcraft-ai/`
   - Files: `work-3.jpg`, `futurcrft.jpg`

3. **Health Project**
   - Current: `project-images/health-project/`
   - Action: Move all files from `project-images/health-project/` to `project-assets/health-project/`
   - Files: `medpaas.png`, `work-5.jpg`

4. **IdeaBaaz**
   - Current: Local `/src/assets/` paths
   - Action: 
     - Upload `ideabaaz-mockup-1.jpg` to `project-assets/ideabaaz/`
     - Upload `ideabaaz-mockup-2.jpg` to `project-assets/ideabaaz/`

5. **TurboCloud**
   - Current: `project-images/turbocloud/`
   - Action: Move all files from `project-images/turbocloud/` to `project-assets/turbocloud/`
   - Files: `turbodash.png`, `work-4.jpg`

6. **Wedding Verse**
   - Current: `project-images/wedding-verse/`
   - Action: Move all files from `project-images/wedding-verse/` to `project-assets/wedding-verse/`
   - Files: `work-1.jpg`, `work-2.jpg`

### Step 2: Update Database Paths

After moving the files, run this SQL in [Supabase SQL Editor](https://supabase.com/dashboard/project/gksxdznfdxrsjqkuzxmg/sql/new):

```sql
-- Boston Financial
UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/boston-financial/boston-financial.png'
WHERE id = '9ec66a78-f570-49e6-ba10-0b0bec91d3a4';

UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/boston-financial/work-7.jpg'
WHERE id = '5cc40220-3bb8-4eb1-9420-66c5418ddf63';

-- FuturCraft AI
UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/futurcraft-ai/work-3.jpg'
WHERE id = 'e54daa9a-64d5-4d92-9cd9-b088bd78e320';

UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/futurcraft-ai/futurcrft.jpg'
WHERE id = '4a0de610-7c75-43ff-9dcd-72d831aa976c';

-- Health Project
UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/health-project/medpaas.png'
WHERE id = 'cbea0162-1d1d-42c3-a481-3b84564ce0e4';

UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/health-project/work-5.jpg'
WHERE id = 'd9b68772-b374-4228-976f-e29d1d792c85';

-- IdeaBaaz (after uploading to Supabase)
UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ideabaaz/ideabaaz-mockup-1.jpg'
WHERE id = 'a490dbae-b0a5-47fe-82e1-0ba62c82a0a4';

UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ideabaaz/ideabaaz-mockup-2.jpg'
WHERE id = '6aa8c6a2-2a9d-427f-99db-c8227334f219';

-- TurboCloud
UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/turbocloud/turbodash.png'
WHERE id = 'e930410c-8fb7-4865-ae22-cccf1009a1d0';

UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/turbocloud/work-4.jpg'
WHERE id = 'dfed9087-6760-433a-992e-73b9a985ab12';

-- Wedding Verse
UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/wedding-verse/work-1.jpg'
WHERE id = 'ebb0dab2-af30-4b00-9eb8-7d965e1efc04';

UPDATE project_assets 
SET file_path = 'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/wedding-verse/work-2.jpg'
WHERE id = 'd186ab09-f6b2-4ca7-bbe1-4a0b4ba53695';
```

### Step 3: Verify

After completing the migration:

1. Check each project page to ensure images load correctly
2. Verify the new folder structure in [Supabase Storage](https://supabase.com/dashboard/project/gksxdznfdxrsjqkuzxmg/storage/buckets/project-assets)
3. Run this verification query:

```sql
SELECT 
  p.slug,
  p.title,
  pa.file_name,
  pa.file_path,
  CASE 
    WHEN pa.file_path LIKE '%/project-assets/' || p.slug || '/%' THEN '✓ Correct'
    ELSE '✗ Needs migration'
  END as status
FROM project_assets pa
JOIN projects p ON pa.project_id = p.id
ORDER BY p.slug, pa.sort_order;
```

### Step 4: Clean Up (Optional)

After verifying everything works:
1. Delete old files from `project-images` bucket (if you moved them)
2. Remove old root-level files from `project-assets` bucket

## Quick Move Instructions (Per File)

Since Supabase Storage doesn't have a "move" feature:

1. Navigate to the file in Supabase Storage
2. Click download
3. Navigate to the destination folder (create if needed)
4. Upload the file
5. Delete the old file (after verifying the new one works)

## Need Help?

If you need assistance with the migration, you can:
- Use the [Supabase Storage UI](https://supabase.com/dashboard/project/gksxdznfdxrsjqkuzxmg/storage/buckets)
- Run SQL queries to verify your progress
- Test one project first before migrating all

## Future Uploads

After migration, all new uploads should follow the structure in `ASSET_UPLOAD_GUIDE.md`.
