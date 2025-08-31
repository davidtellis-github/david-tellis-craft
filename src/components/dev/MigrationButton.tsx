import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { runMigration } from "@/utils/migrateProjectData";
import { uploadAndLinkAssets } from "@/utils/uploadAndLinkAssets";
import { Loader2, Upload } from "lucide-react";

const MigrationButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleMigration = async () => {
    setIsLoading(true);
    try {
      const result = await runMigration();
      if (result.success) {
        console.log("✅ Migration successful!");
      } else {
        console.error("❌ Migration failed:", result.message);
      }
    } catch (error) {
      console.error("Migration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssetUpload = async () => {
    setIsUploading(true);
    try {
      const result = await uploadAndLinkAssets();
      if (result.success) {
        alert("✅ Assets uploaded and linked successfully!");
        console.log("✅ Asset upload successful!");
      } else {
        alert(`❌ Asset upload failed: ${result.message}`);
        console.error("❌ Asset upload failed:", result.message);
      }
    } catch (error) {
      console.error("Asset upload error:", error);
      alert("❌ Asset upload error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button 
        onClick={handleAssetUpload} 
        disabled={isUploading}
        variant="secondary"
        size="lg"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading Assets...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Upload Project Assets
          </>
        )}
      </Button>
      
      <Button 
        onClick={handleMigration} 
        disabled={isLoading}
        variant="default"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Migrating...
          </>
        ) : (
          "Migrate Project Data"
        )}
      </Button>
    </div>
  );
};

export default MigrationButton;