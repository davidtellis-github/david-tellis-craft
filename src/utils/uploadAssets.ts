import { supabase } from "@/integrations/supabase/client";

// Asset mappings based on project data structure
const projectAssets = {
  "wedding-verse": [
    { file: "work-1.jpg", type: "image", featured: true },
    { file: "work-2.jpg", type: "image", featured: false }
  ],
  "futurcraft-ai": [
    { file: "work-3.jpg", type: "image", featured: true }
  ],
  "turbocloud": [
    { file: "work-4.jpg", type: "image", featured: true }
  ],
  "health-project": [
    { file: "work-5.jpg", type: "image", featured: true }
  ],
  "project-alpha": [
    { file: "work-6.jpg", type: "image", featured: true }
  ],
  "web-design-1": [
    { file: "work-7.jpg", type: "image", featured: true }
  ],
  "ui-exploration-1": [
    { file: "work-8.jpg", type: "image", featured: true }
  ],
  "ui-exploration-2": [
    { file: "work-9.jpg", type: "image", featured: true }
  ],
  "project-beta": [
    { file: "portrait.jpg", type: "image", featured: true }
  ]
} as const;

interface AssetUploadResult {
  success: boolean;
  assets: Array<{
    projectSlug: string;
    fileName: string;
    publicUrl: string;
    assetType: 'image' | 'video' | 'document';
    isFeatured: boolean;
  }>;
  errors: string[];
}

export const uploadProjectAssets = async (): Promise<AssetUploadResult> => {
  const result: AssetUploadResult = {
    success: true,
    assets: [],
    errors: []
  };

  try {
    console.log("Starting asset upload process...");

    for (const [projectSlug, assets] of Object.entries(projectAssets)) {
      console.log(`Processing assets for project: ${projectSlug}`);

      for (const asset of assets) {
        try {
          // Import the asset dynamically (Vite will handle the path resolution)
          let assetModule;
          try {
            assetModule = await import(`../assets/${asset.file}`);
          } catch (importError) {
            result.errors.push(`Failed to import ${asset.file}: Asset not found`);
            continue;
          }

          // Fetch the asset URL that Vite provides
          const response = await fetch(assetModule.default);
          
          if (!response.ok) {
            result.errors.push(`Failed to fetch ${asset.file}: ${response.statusText}`);
            continue;
          }

          const blob = await response.blob();
          const fileExt = asset.file.split('.').pop();
          const fileName = `${projectSlug}/${asset.file}`;
          
          // Determine the bucket based on asset type
          const bucket = asset.type === 'image' ? 'project-images' : 
                       asset.type === 'video' ? 'project-videos' : 
                       'project-assets';

          // Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(fileName, blob, {
              contentType: `${asset.type}/${fileExt}`,
              upsert: true
            });

          if (uploadError) {
            result.errors.push(`Upload failed for ${asset.file}: ${uploadError.message}`);
            continue;
          }

          // Get public URL
          const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

          result.assets.push({
            projectSlug,
            fileName: asset.file,
            publicUrl: urlData.publicUrl,
            assetType: asset.type as 'image' | 'video' | 'document',
            isFeatured: asset.featured
          });

          console.log(`✅ Uploaded ${asset.file} for ${projectSlug}`);

        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          result.errors.push(`Error processing ${asset.file}: ${errorMsg}`);
          console.error(`❌ Error uploading ${asset.file}:`, error);
        }
      }
    }

    // Additional assets (profile images, etc.)
    const additionalAssets = [
      { file: "portrait.png", bucket: "project-images", type: "image" as const },
      { file: "baground.png", bucket: "project-images", type: "image" as const }
    ];

    for (const asset of additionalAssets) {
      try {
        const assetModule = await import(`../assets/${asset.file}`);
        const response = await fetch(assetModule.default);
        if (response.ok) {
          const blob = await response.blob();
          const { error } = await supabase.storage
            .from(asset.bucket)
            .upload(`misc/${asset.file}`, blob, { upsert: true });

          if (!error) {
            console.log(`✅ Uploaded additional asset: ${asset.file}`);
          }
        }
      } catch (error) {
        console.log(`⚠️ Could not upload additional asset ${asset.file}:`, error);
      }
    }

    if (result.errors.length > 0) {
      result.success = false;
    }

    console.log(`Asset upload completed. Success: ${result.success}, Uploaded: ${result.assets.length}, Errors: ${result.errors.length}`);
    
    return result;

  } catch (error) {
    result.success = false;
    result.errors.push(error instanceof Error ? error.message : 'Unknown error during upload');
    return result;
  }
};

export const createAssetRecords = async (uploadResults: AssetUploadResult) => {
  if (!uploadResults.success || uploadResults.assets.length === 0) {
    console.log("No assets to create records for");
    return { success: false, message: "No assets uploaded successfully" };
  }

  try {
    console.log("Creating asset records in database...");

    // Get all projects to map slugs to IDs
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, slug');

    if (projectsError) throw projectsError;

    const projectMap = new Map(projects?.map(p => [p.slug, p.id]) || []);

    // Create asset records
    for (const asset of uploadResults.assets) {
      const projectId = projectMap.get(asset.projectSlug);
      if (!projectId) {
        console.log(`⚠️ Project not found for slug: ${asset.projectSlug}`);
        continue;
      }

      const { error: assetError } = await supabase
        .from('project_assets')
        .insert({
          project_id: projectId,
          asset_type: asset.assetType,
          file_name: asset.fileName,
          file_path: asset.publicUrl,
          alt_text: `${asset.projectSlug} project ${asset.assetType}`,
          is_featured: asset.isFeatured,
          sort_order: asset.isFeatured ? 0 : 1
        });

      if (assetError) {
        console.error(`❌ Failed to create asset record for ${asset.fileName}:`, assetError);
      } else {
        console.log(`✅ Created asset record for ${asset.fileName}`);
      }
    }

    return { success: true, message: "Asset records created successfully" };

  } catch (error) {
    console.error("Failed to create asset records:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to create asset records" 
    };
  }
};