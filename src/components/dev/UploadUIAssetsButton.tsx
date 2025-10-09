import { Button } from "@/components/ui/button";
import { uploadNewUIAssets } from "@/utils/uploadNewUIAssets";
import { useState } from "react";
import { toast } from "sonner";

export const UploadUIAssetsButton = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    toast.info("Uploading UI assets to storage...");
    
    try {
      const results = await uploadNewUIAssets();
      const successCount = results.filter(r => r.success).length;
      
      if (successCount === results.length) {
        toast.success(`Successfully uploaded all ${successCount} UI assets!`);
      } else {
        toast.warning(`Uploaded ${successCount}/${results.length} assets. Check console for errors.`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload assets. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Button 
      onClick={handleUpload} 
      disabled={isUploading}
      variant="outline"
      size="sm"
    >
      {isUploading ? "Uploading..." : "Upload New UI Assets"}
    </Button>
  );
};
