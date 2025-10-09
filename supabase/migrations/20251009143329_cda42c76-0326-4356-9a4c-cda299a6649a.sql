-- Update project sort order: Boston Financial to position 6, Medpass to 7
UPDATE projects
SET sort_order = CASE slug
  WHEN 'wedding-verse' THEN 1
  WHEN 'futurcraft-ai' THEN 2
  WHEN 'ideabaaz' THEN 3
  WHEN 'turbocloud' THEN 4
  WHEN 'meolaa' THEN 5
  WHEN 'boston-financial' THEN 6
  WHEN 'health-project' THEN 7  -- Medpass
  ELSE sort_order
END
WHERE slug IN ('wedding-verse', 'futurcraft-ai', 'ideabaaz', 'turbocloud', 'meolaa', 'boston-financial', 'health-project');