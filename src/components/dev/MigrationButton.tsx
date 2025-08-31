import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { runMigration } from "@/utils/migrateProjectData";
import { Loader2 } from "lucide-react";

const MigrationButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="fixed bottom-4 right-4 z-50">
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