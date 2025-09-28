-- Add contribution level and project tags to projects table
ALTER TABLE public.projects 
ADD COLUMN contribution_level TEXT DEFAULT 'Lead Designer',
ADD COLUMN project_tags TEXT[] DEFAULT '{}';

-- Add asset tags to project_assets table  
ALTER TABLE public.project_assets
ADD COLUMN asset_tags TEXT[] DEFAULT '{}';

-- Create ui_explorations table for additional UI showcases
CREATE TABLE public.ui_explorations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  contribution_level TEXT NOT NULL DEFAULT 'UI Contributor',
  tags TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on ui_explorations
ALTER TABLE public.ui_explorations ENABLE ROW LEVEL SECURITY;

-- Create policy for ui_explorations
CREATE POLICY "UI explorations are publicly readable"
ON public.ui_explorations
FOR SELECT
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_ui_explorations_updated_at
BEFORE UPDATE ON public.ui_explorations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update existing projects with contribution levels and tags
UPDATE public.projects SET 
  contribution_level = 'Lead Designer',
  project_tags = ARRAY['Web Design']
WHERE slug IN ('wedding-verse', 'turbocloud', 'futurcraft-ai');

UPDATE public.projects SET 
  contribution_level = 'UI Contributor', 
  project_tags = ARRAY['Healthcare', 'Dashboard']
WHERE slug = 'health-project';

UPDATE public.projects SET
  contribution_level = 'Lead Designer',
  project_tags = ARRAY['Corporate Website']  
WHERE slug = 'web-design-1';

UPDATE public.projects SET
  contribution_level = 'UI Exploration',
  project_tags = ARRAY['Mobile UI', 'Exploration']
WHERE slug IN ('ui-exploration-1', 'ui-exploration-2');