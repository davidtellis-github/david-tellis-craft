-- Remove dangerous public INSERT policies that allow anonymous data corruption
-- These policies were created for migration but should not remain in production

-- Drop the dangerous INSERT policies that allow anyone to corrupt the database
DROP POLICY IF EXISTS "Allow public insert for categories migration" ON public.categories;
DROP POLICY IF EXISTS "Allow public insert for projects migration" ON public.projects;
DROP POLICY IF EXISTS "Allow public insert for project features migration" ON public.project_features;
DROP POLICY IF EXISTS "Allow public insert for project process migration" ON public.project_process;
DROP POLICY IF EXISTS "Allow public insert for project outcomes migration" ON public.project_outcomes;
DROP POLICY IF EXISTS "Allow public insert for project assets migration" ON public.project_assets;

-- Note: We're keeping the SELECT policies that allow public reading of published content
-- This maintains portfolio functionality while preventing data corruption

-- Optional: Add comment to document the security fix
COMMENT ON TABLE public.projects IS 'Portfolio projects - public read access only, no anonymous insertions allowed';
COMMENT ON TABLE public.categories IS 'Project categories - public read access only, no anonymous insertions allowed';
COMMENT ON TABLE public.project_features IS 'Project features - public read access only, no anonymous insertions allowed';
COMMENT ON TABLE public.project_process IS 'Project process steps - public read access only, no anonymous insertions allowed';
COMMENT ON TABLE public.project_outcomes IS 'Project outcomes - public read access only, no anonymous insertions allowed';
COMMENT ON TABLE public.project_assets IS 'Project assets - public read access only, no anonymous insertions allowed';