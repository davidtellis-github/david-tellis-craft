# Project Asset Upload Guide

## Storage Structure

All project assets are organized in the `project-assets` Supabase Storage bucket with the following structure:

```
project-assets/
├── boston-financial/
├── futurcraft-ai/
├── health-project/
├── ideabaaz/
├── turbocloud/
└── wedding-verse/
```

## Upload Workflow

### Step 1: Upload to Supabase Storage

1. Go to [Supabase Storage Dashboard](https://supabase.com/dashboard/project/gksxdznfdxrsjqkuzxmg/storage/buckets/project-assets)
2. Navigate to the `project-assets` bucket
3. Create or navigate to your project's folder (use the project slug)
4. Upload your image/video file with a descriptive name

### Step 2: Get the Public URL

After uploading, copy the public URL. It will look like:
```
https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/{project-slug}/{filename}
```

### Step 3: Insert Database Record

Use the SQL template below in the [Supabase SQL Editor](https://supabase.com/dashboard/project/gksxdznfdxrsjqkuzxmg/sql/new):

```sql
INSERT INTO project_assets (
  project_id,
  asset_type,
  file_name,
  file_path,
  is_featured,
  show_in_gallery,
  sort_order,
  alt_text,
  caption,
  contribution_level
)
VALUES (
  (SELECT id FROM projects WHERE slug = 'project-slug-here'),
  'portfolio-image', -- Options: 'portfolio-image', 'gallery-image', 'video'
  'descriptive-name.jpg',
  'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/project-slug-here/descriptive-name.jpg',
  false, -- Set to true for hero/featured images
  true,  -- Set to true to show in gallery
  0,     -- Order number (0, 1, 2, etc.)
  'Descriptive alt text for accessibility',
  'Optional caption text',
  'Full' -- Options: 'Full', 'Lead Designer', 'Contributor'
);
```

## Asset Types Explained

### `portfolio-image`
- Main showcase images for the project
- Appears in portfolio grid and project detail hero sections
- Usually high-quality, polished screenshots

### `gallery-image`
- Additional images shown in galleries
- Process shots, wireframes, design iterations
- Only shown when `show_in_gallery = true`

### `video`
- Video demonstrations or presentations
- Supports MP4, WebM formats

## Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `project_id` | UUID | Auto-filled by slug lookup |
| `asset_type` | Text | Type of asset (see above) |
| `file_name` | Text | Original file name |
| `file_path` | Text | Full public URL from Supabase Storage |
| `is_featured` | Boolean | Display as hero/featured image |
| `show_in_gallery` | Boolean | Show in gallery sections |
| `sort_order` | Integer | Display order (0 = first) |
| `alt_text` | Text | Accessibility description |
| `caption` | Text | Optional caption for galleries |
| `contribution_level` | Text | Your contribution level |

## Project Slugs Reference

| Project | Slug |
|---------|------|
| Boston Financial | `boston-financial` |
| FuturCraft AI | `futurcraft-ai` |
| Health Project | `health-project` |
| IdeaBaaz | `ideabaaz` |
| TurboCloud | `turbocloud` |
| Wedding Verse | `wedding-verse` |

## Tips

- **Naming Convention**: Use descriptive, kebab-case names (e.g., `homepage-hero.jpg`, `mobile-mockup-1.png`)
- **File Size**: Optimize images before upload (recommended max 2MB per image)
- **Sort Order**: Start from 0 and increment (0, 1, 2, 3...)
- **Featured Images**: Only set `is_featured = true` for 1-2 hero images per project
- **Alt Text**: Always provide meaningful alt text for accessibility

## Verification

After inserting the record, verify the asset appears correctly:
1. Visit your project page
2. Check that the image appears in the correct section
3. Verify the image loads properly
4. Test on mobile devices

## Troubleshooting

**Image not showing?**
- Verify the `file_path` URL is correct and accessible
- Check that `is_published = true` for the parent project
- Ensure the file uploaded successfully to Storage

**Wrong order?**
- Update the `sort_order` value in the database
- Lower numbers appear first

**Not in gallery?**
- Check `show_in_gallery = true`
- Verify `asset_type` is correct
