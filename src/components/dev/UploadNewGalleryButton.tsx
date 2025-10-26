import { Button } from "@/components/ui/button";
import { uploadNewGalleryAssets } from "@/utils/uploadNewGalleryAssets";
import { useState } from "react";
import { toast } from "sonner";

export const UploadNewGalleryButton = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    toast.info("Uploading new gallery assets...");
    
    try {
      const results = await uploadNewGalleryAssets();
      const successCount = results.filter(r => r.success).length;
      
      if (successCount === results.length) {
        toast.success(`Successfully uploaded all ${successCount} gallery images!`);
        // Refresh the page to show new assets
        setTimeout(() => window.location.reload(), 1500);
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
      variant="default"
      size="sm"
    >
      {isUploading ? "Uploading..." : "Upload New Gallery Images"}
    </Button>
  );
};
