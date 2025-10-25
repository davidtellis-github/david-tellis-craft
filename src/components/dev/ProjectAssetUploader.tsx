import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

interface ProjectAssetUploaderProps {
  projectSlug: string;
}

export const ProjectAssetUploader = ({ projectSlug }: ProjectAssetUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    toast.info(`Uploading ${files.length} file(s)...`);

    try {
      // Get project ID
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', projectSlug)
        .single();

      if (projectError) throw projectError;

      let successCount = 0;

      for (const file of Array.from(files)) {
        // Upload to storage with project-specific folder
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${projectSlug}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('project-assets')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('project-assets')
          .getPublicUrl(filePath);

        // Create database record
        const { error: dbError } = await supabase
          .from('project_assets')
          .insert({
            project_id: project.id,
            asset_type: 'image',
            file_name: file.name,
            file_path: publicUrl,
            file_size: file.size,
            mime_type: file.type,
            alt_text: file.name.replace(/\.[^/.]+$/, ''),
            contribution_level: 'Full',
            show_in_gallery: true,
            is_featured: false,
            asset_tags: [],
            sort_order: Date.now()
          });

        if (dbError) {
          console.error('Database error:', dbError);
          continue;
        }

        successCount++;
      }

      if (successCount === files.length) {
        toast.success(`Successfully uploaded ${successCount} file(s)!`);
      } else {
        toast.warning(`Uploaded ${successCount}/${files.length} file(s).`);
      }

      // Reset input
      event.target.value = '';
      
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload assets');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        id={`upload-${projectSlug}`}
        disabled={isUploading}
      />
      <label htmlFor={`upload-${projectSlug}`}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUploading}
          asChild
        >
          <span className="cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Assets'}
          </span>
        </Button>
      </label>
    </div>
  );
};