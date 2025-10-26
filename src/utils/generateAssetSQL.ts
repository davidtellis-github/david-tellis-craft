/**
 * Utility to generate SQL INSERT statements for project assets
 * Use this in the browser console to quickly generate SQL for manual uploads
 */

interface AssetSQLParams {
  projectSlug: string;
  assetType: 'portfolio-image' | 'gallery-image' | 'video';
  fileName: string;
  isFeatured?: boolean;
  showInGallery?: boolean;
  sortOrder?: number;
  altText?: string;
  caption?: string;
  contributionLevel?: 'Full' | 'Lead Designer' | 'Contributor';
}

/**
 * Generate SQL INSERT statement for a project asset
 * 
 * @example
 * ```typescript
 * const sql = generateAssetSQL({
 *   projectSlug: 'boston-financial',
 *   assetType: 'portfolio-image',
 *   fileName: 'homepage-hero.jpg',
 *   isFeatured: true,
 *   altText: 'Boston Financial homepage hero section'
 * });
 * console.log(sql);
 * ```
 */
export function generateAssetSQL(params: AssetSQLParams): string {
  const {
    projectSlug,
    assetType,
    fileName,
    isFeatured = false,
    showInGallery = true,
    sortOrder = 0,
    altText = '',
    caption = '',
    contributionLevel = 'Full'
  } = params;

  const filePath = `https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/${projectSlug}/${fileName}`;

  return `INSERT INTO project_assets (
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
  (SELECT id FROM projects WHERE slug = '${projectSlug}'),
  '${assetType}',
  '${fileName}',
  '${filePath}',
  ${isFeatured},
  ${showInGallery},
  ${sortOrder},
  '${altText.replace(/'/g, "''")}',
  ${caption ? `'${caption.replace(/'/g, "''")}'` : 'NULL'},
  '${contributionLevel}'
);`;
}

/**
 * Generate SQL for multiple assets at once
 */
export function generateBatchAssetSQL(assets: AssetSQLParams[]): string {
  return assets.map(asset => generateAssetSQL(asset)).join('\n\n');
}

/**
 * Helper to log SQL to console for easy copying
 */
export function logAssetSQL(params: AssetSQLParams): void {
  const sql = generateAssetSQL(params);
  console.log('='.repeat(80));
  console.log('Copy the SQL below and run it in Supabase SQL Editor:');
  console.log('='.repeat(80));
  console.log(sql);
  console.log('='.repeat(80));
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).generateAssetSQL = generateAssetSQL;
  (window as any).logAssetSQL = logAssetSQL;
  (window as any).generateBatchAssetSQL = generateBatchAssetSQL;
}
