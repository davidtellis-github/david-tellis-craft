-- Create storage buckets for project assets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('project-images', 'project-images', true),
  ('project-videos', 'project-videos', true),
  ('project-assets', 'project-assets', true);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  year TEXT,
  services TEXT,
  
  -- Role information
  role_title TEXT,
  role_duration TEXT,
  role_team TEXT,
  role_tools TEXT[], -- Array of tools
  
  -- Context information
  context_problem TEXT,
  context_objective TEXT,
  context_audience TEXT,
  
  -- Meta information
  reflection TEXT,
  
  -- Links
  live_link TEXT,
  github_link TEXT,
  figma_link TEXT,
  
  -- SEO and management
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project features table
CREATE TABLE public.project_features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project process steps table
CREATE TABLE public.project_process (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  step TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project outcomes table
CREATE TABLE public.project_outcomes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  metric TEXT NOT NULL,
  value TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project assets table
CREATE TABLE public.project_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('image', 'video', 'document')),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Storage path
  file_size INTEGER,
  mime_type TEXT,
  alt_text TEXT,
  caption TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_process ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_assets ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a portfolio)
CREATE POLICY "Categories are publicly readable" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Projects are publicly readable" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Project features are publicly readable" ON public.project_features FOR SELECT USING (true);
CREATE POLICY "Project process steps are publicly readable" ON public.project_process FOR SELECT USING (true);
CREATE POLICY "Project outcomes are publicly readable" ON public.project_outcomes FOR SELECT USING (true);
CREATE POLICY "Project assets are publicly readable" ON public.project_assets FOR SELECT USING (true);

-- Create storage policies for public access to project assets
CREATE POLICY "Project images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Project videos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'project-videos');
CREATE POLICY "Project assets are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'project-assets');

-- Create indexes for better performance
CREATE INDEX idx_projects_category ON public.projects(category_id);
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_published ON public.projects(is_published);
CREATE INDEX idx_project_features_project ON public.project_features(project_id);
CREATE INDEX idx_project_process_project ON public.project_process(project_id);
CREATE INDEX idx_project_outcomes_project ON public.project_outcomes(project_id);
CREATE INDEX idx_project_assets_project ON public.project_assets(project_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();