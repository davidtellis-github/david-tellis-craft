import { uploadProjectAssets, createAssetRecords } from "./uploadAssets";

export const uploadAndLinkAssets = async () => {
  try {
    console.log("Starting asset upload and linking process...");
    
    // Upload all assets to storage
    const uploadResults = await uploadProjectAssets();
    
    if (!uploadResults.success) {
      console.error("Asset upload failed:", uploadResults.errors);
      return { success: false, message: "Asset upload failed" };
    }
    
    // Create database records linking assets to projects
    const linkResults = await createAssetRecords(uploadResults);
    
    if (!linkResults.success) {
      console.error("Asset linking failed:", linkResults.message);
      return { success: false, message: "Asset linking failed" };
    }
    
    console.log(`✅ Successfully uploaded ${uploadResults.assets.length} assets and linked to projects`);
    return { success: true, message: `${uploadResults.assets.length} assets uploaded and linked successfully` };
    
  } catch (error) {
    console.error("Upload and link process failed:", error);
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
};