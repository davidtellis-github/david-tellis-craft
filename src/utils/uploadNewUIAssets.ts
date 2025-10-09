import { supabase } from '@/integrations/supabase/client';
import musicController from '@/assets/ui-music-controller.png';
import laptopMockup from '@/assets/ui-laptop-mockup.png';
import weddingPlanner from '@/assets/ui-wedding-planner.png';

interface UploadAsset {
  localPath: string;
  storagePath: string;
  fileName: string;
}

const assetsToUpload: UploadAsset[] = [
  {
    localPath: musicController,
    storagePath: 'ui-music-controller.png',
    fileName: 'ui-music-controller.png'
  },
  {
    localPath: laptopMockup,
    storagePath: 'ui-laptop-mockup.png',
    fileName: 'ui-laptop-mockup.png'
  },
  {
    localPath: weddingPlanner,
    storagePath: 'ui-wedding-planner.png',
    fileName: 'ui-wedding-planner.png'
  }
];

export const uploadNewUIAssets = async () => {
  console.log('Starting UI assets upload...');
  const results = [];

  for (const asset of assetsToUpload) {
    try {
      // Fetch the image from the imported path
      const response = await fetch(asset.localPath);
      const blob = await response.blob();

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('project-assets')
        .upload(asset.storagePath, blob, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/png'
        });

      if (error) {
        console.error(`Failed to upload ${asset.fileName}:`, error);
        results.push({ file: asset.fileName, success: false, error: error.message });
      } else {
        console.log(`✅ Successfully uploaded ${asset.fileName}`);
        results.push({ file: asset.fileName, success: true, path: data.path });
      }
    } catch (err) {
      console.error(`Error processing ${asset.fileName}:`, err);
      results.push({ 
        file: asset.fileName, 
        success: false, 
        error: err instanceof Error ? err.message : 'Unknown error' 
      });
    }
  }

  const successCount = results.filter(r => r.success).length;
  console.log(`\n📊 Upload Summary: ${successCount}/${results.length} files uploaded successfully`);
  
  return results;
};
