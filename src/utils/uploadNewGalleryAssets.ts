import { supabase } from "@/integrations/supabase/client";

// Import new gallery images
import droneServices from "@/assets/ui-drone-services.png";
import futurecraftSignup from "@/assets/ui-futurecraft-signup.png";
import futurecraftOnboarding from "@/assets/ui-futurecraft-onboarding.png";
import finopsDashboard from "@/assets/ui-finops-dashboard.png";
import visionBoard from "@/assets/ui-vision-board.png";
import weddingverseVendor from "@/assets/ui-weddingverse-vendor.png";
import weddingverseHome from "@/assets/ui-weddingverse-home.png";
import reviewsSection from "@/assets/ui-reviews-section.png";
import timelineVision from "@/assets/ui-timeline-vision.png";

interface UploadAsset {
  localPath: string;
  storagePath: string;
  fileName: string;
  title: string;
  projectSlug: string;
  tags: string[];
  contributionLevel: string;
}

const assetsToUpload: UploadAsset[] = [
  {
    localPath: droneServices,
    storagePath: "ui-explorations/ui-drone-services.png",
    fileName: "ui-drone-services.png",
    title: "Drone Services Cards",
    projectSlug: "turbocloud",
    tags: ["cards", "services", "drone"],
    contributionLevel: "UI Designer"
  },
  {
    localPath: futurecraftSignup,
    storagePath: "ui-explorations/ui-futurecraft-signup.png",
    fileName: "ui-futurecraft-signup.png",
    title: "Futurecraft Signup",
    projectSlug: "futurcraft-ai",
    tags: ["auth", "signup", "dark-mode"],
    contributionLevel: "UI Designer"
  },
  {
    localPath: futurecraftOnboarding,
    storagePath: "ui-explorations/ui-futurecraft-onboarding.png",
    fileName: "ui-futurecraft-onboarding.png",
    title: "Futurecraft Onboarding",
    projectSlug: "futurcraft-ai",
    tags: ["onboarding", "form", "dark-mode"],
    contributionLevel: "UI Designer"
  },
  {
    localPath: finopsDashboard,
    storagePath: "ui-explorations/ui-finops-dashboard.png",
    fileName: "ui-finops-dashboard.png",
    title: "FinOps Dashboard",
    projectSlug: "turbocloud",
    tags: ["dashboard", "finops", "dark-mode", "charts"],
    contributionLevel: "Lead Designer"
  },
  {
    localPath: visionBoard,
    storagePath: "ui-explorations/ui-vision-board.png",
    fileName: "ui-vision-board.png",
    title: "Vision Board Gallery",
    projectSlug: "weddingverse",
    tags: ["gallery", "bento", "wedding"],
    contributionLevel: "UI Designer"
  },
  {
    localPath: weddingverseVendor,
    storagePath: "ui-explorations/ui-weddingverse-vendor.png",
    fileName: "ui-weddingverse-vendor.png",
    title: "Vendor Profile Page",
    projectSlug: "weddingverse",
    tags: ["vendor", "profile", "pricing"],
    contributionLevel: "Lead Designer"
  },
  {
    localPath: weddingverseHome,
    storagePath: "ui-explorations/ui-weddingverse-home.png",
    fileName: "ui-weddingverse-home.png",
    title: "Weddingverse Homepage",
    projectSlug: "weddingverse",
    tags: ["homepage", "hero", "categories"],
    contributionLevel: "Lead Designer"
  },
  {
    localPath: reviewsSection,
    storagePath: "ui-explorations/ui-reviews-section.png",
    fileName: "ui-reviews-section.png",
    title: "Reviews Section",
    projectSlug: "weddingverse",
    tags: ["reviews", "ratings", "testimonials"],
    contributionLevel: "UI Designer"
  },
  {
    localPath: timelineVision,
    storagePath: "ui-explorations/ui-timeline-vision.png",
    fileName: "ui-timeline-vision.png",
    title: "Timeline Vision Design",
    projectSlug: "ideabaaz",
    tags: ["timeline", "storytelling", "vertical"],
    contributionLevel: "UI Designer"
  }
];

export const uploadNewGalleryAssets = async () => {
  const results = [];

  for (const asset of assetsToUpload) {
    try {
      // Fetch the image
      const response = await fetch(asset.localPath);
      const blob = await response.blob();

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-assets')
        .upload(asset.storagePath, blob, {
          contentType: 'image/png',
          upsert: true
        });

      if (uploadError) {
        console.error(`Error uploading ${asset.fileName}:`, uploadError);
        results.push({ fileName: asset.fileName, success: false, error: uploadError });
        continue;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-assets')
        .getPublicUrl(asset.storagePath);

      // Get project ID from slug
      const { data: projectData } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', asset.projectSlug)
        .single();

      if (!projectData) {
        console.error(`Project not found: ${asset.projectSlug}`);
        results.push({ fileName: asset.fileName, success: false, error: 'Project not found' });
        continue;
      }

      // Insert into project_assets table
      const { error: insertError } = await supabase
        .from('project_assets')
        .insert({
          project_id: projectData.id,
          asset_type: 'image',
          file_name: asset.fileName,
          file_path: publicUrl,
          alt_text: asset.title,
          asset_tags: asset.tags,
          contribution_level: asset.contributionLevel,
          is_featured: false,
          show_in_gallery: true,
          sort_order: 0
        });

      if (insertError) {
        console.error(`Error inserting DB record for ${asset.fileName}:`, insertError);
        results.push({ fileName: asset.fileName, success: false, error: insertError });
        continue;
      }

      console.log(`✅ Successfully uploaded and added ${asset.fileName}`);
      results.push({ fileName: asset.fileName, success: true });

    } catch (error) {
      console.error(`Error processing ${asset.fileName}:`, error);
      results.push({ fileName: asset.fileName, success: false, error });
    }
  }

  console.log(`\nUpload complete: ${results.filter(r => r.success).length}/${results.length} successful`);
  return results;
};
