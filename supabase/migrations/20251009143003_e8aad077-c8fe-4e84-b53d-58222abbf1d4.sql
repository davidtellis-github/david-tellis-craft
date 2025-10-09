-- Update project sort order to match the desired sequence
UPDATE projects
SET sort_order = CASE slug
  WHEN 'wedding-verse' THEN 1
  WHEN 'futurcraft-ai' THEN 2
  WHEN 'ideabaaz' THEN 3
  WHEN 'turbocloud' THEN 4
  WHEN 'meolaa' THEN 5
  WHEN 'health-project' THEN 6  -- Assuming this is Medpass
  ELSE sort_order
END
WHERE slug IN ('wedding-verse', 'futurcraft-ai', 'ideabaaz', 'turbocloud', 'meolaa', 'health-project');