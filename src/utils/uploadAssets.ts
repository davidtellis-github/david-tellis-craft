import { supabase } from "@/integrations/supabase/client";

// Import all assets statically to avoid dynamic import issues
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";  
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import work7 from "@/assets/work-7.jpg";
import work8 from "@/assets/work-8.jpg";
import work9 from "@/assets/work-9.jpg";
import portrait from "@/assets/portrait.jpg";
import portraitPng from "@/assets/portrait.png";
import background from "@/assets/baground.png";
import tuboCloudImg from "@/assets/tubocloud-dashboard.png";
import futurCraftImg from "@/assets/futurcraft-ai.png";
import bostonFinancialImg from "@/assets/boston-financial.png";
import medpassImg from "@/assets/medpass-healthcare.png";

// Asset mappings based on project data structure with static imports
const assetMap: Record<string, string> = {
  "work-1.jpg": work1,
  "work-2.jpg": work2,
  "work-3.jpg": work3,
  "work-4.jpg": work4,
  "work-5.jpg": work5,
  "work-6.jpg": work6,
  "work-7.jpg": work7,
  "work-8.jpg": work8,
  "work-9.jpg": work9,
  "portrait.jpg": portrait,
  "portrait.png": portraitPng,
  "baground.png": background,
  "tubocloud-dashboard.png": tuboCloudImg,
  "futurcraft-ai.png": futurCraftImg,
  "boston-financial.png": bostonFinancialImg,
  "medpass-healthcare.png": medpassImg,
};

const projectAssets = {
  "wedding-verse": [
    { file: "work-1.jpg", type: "image", featured: true, tags: ["Hero Design", "User Interface"] as string[] },
    { file: "work-2.jpg", type: "image", featured: false, tags: ["Mobile UI", "Responsive Design"] as string[] }
  ],
  "futurcraft-ai": [
    { file: "futurcraft-ai.png", type: "image", featured: true, tags: ["AI Interface", "Dashboard", "Lead Design"] as string[] },
    { file: "work-3.jpg", type: "image", featured: false, tags: ["UI Exploration", "Concept Design"] as string[] }
  ],
  "turbocloud": [
    { file: "tubocloud-dashboard.png", type: "image", featured: true, tags: ["Dashboard", "Cloud Platform", "Lead Design"] as string[] },
    { file: "work-4.jpg", type: "image", featured: false, tags: ["Admin Interface", "Data Visualization"] as string[] }
  ],
  "health-project": [
    { file: "medpass-healthcare.png", type: "image", featured: true, tags: ["Healthcare UI", "Mobile App", "UI Contribution"] as string[] },
    { file: "work-5.jpg", type: "image", featured: false, tags: ["Patient Portal", "Medical Interface"] as string[] }
  ],
  "project-alpha": [
    { file: "work-6.jpg", type: "image", featured: true, tags: ["Enterprise UI", "Lead Design"] as string[] }
  ],
  "web-design-1": [
    { file: "boston-financial.png", type: "image", featured: true, tags: ["Corporate Website", "Financial Services", "Lead Design"] as string[] },
    { file: "work-7.jpg", type: "image", featured: false, tags: ["Landing Page", "Corporate Design"] as string[] }
  ],
  "ui-exploration-1": [
    { file: "work-8.jpg", type: "image", featured: true, tags: ["UI Exploration", "Mobile Design", "Concept"] as string[] }
  ],
  "ui-exploration-2": [
    { file: "work-9.jpg", type: "image", featured: true, tags: ["UI Exploration", "Dashboard Concept", "Innovation"] as string[] }
  ],
  "project-beta": [
    { file: "portrait.jpg", type: "image", featured: true, tags: ["Profile Design", "Personal Branding"] as string[] }
  ]
};

interface AssetUploadResult {
  success: boolean;
  assets: Array<{
    projectSlug: string;
    fileName: string;
    publicUrl: string;
    assetType: 'image' | 'video' | 'document';
    isFeatured: boolean;
    tags: string[];
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
          // Get the asset URL from static imports
          const assetUrl = assetMap[asset.file];
          if (!assetUrl) {
            result.errors.push(`Asset not found in asset map: ${asset.file}`);
            continue;
          }

          // Fetch the asset URL that Vite provides
          const response = await fetch(assetUrl);
          
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
            isFeatured: asset.featured,
            tags: asset.tags || []
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
        const assetUrl = assetMap[asset.file];
        if (assetUrl) {
          const response = await fetch(assetUrl);
          if (response.ok) {
            const blob = await response.blob();
            const { error } = await supabase.storage
              .from(asset.bucket)
              .upload(`misc/${asset.file}`, blob, { upsert: true });

            if (!error) {
              console.log(`✅ Uploaded additional asset: ${asset.file}`);
            }
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
          sort_order: asset.isFeatured ? 0 : 1,
          asset_tags: asset.tags
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