-- Add INSERT policies for all CMS tables to allow migration

-- Categories table
CREATE POLICY "Allow public insert for categories migration"
ON public.categories
FOR INSERT
WITH CHECK (true);

-- Projects table  
CREATE POLICY "Allow public insert for projects migration"
ON public.projects
FOR INSERT
WITH CHECK (true);

-- Project features table
CREATE POLICY "Allow public insert for project features migration"
ON public.project_features
FOR INSERT
WITH CHECK (true);

-- Project process table
CREATE POLICY "Allow public insert for project process migration"
ON public.project_process
FOR INSERT
WITH CHECK (true);

-- Project outcomes table
CREATE POLICY "Allow public insert for project outcomes migration"
ON public.project_outcomes
FOR INSERT
WITH CHECK (true);

-- Project assets table
CREATE POLICY "Allow public insert for project assets migration"
ON public.project_assets
FOR INSERT
WITH CHECK (true);