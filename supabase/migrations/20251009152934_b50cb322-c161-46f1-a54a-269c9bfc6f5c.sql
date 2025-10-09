-- Insert UI exploration records for the new gallery images
-- Note: Images need to be uploaded to storage first, these are placeholder entries

INSERT INTO ui_explorations (
  project_id, 
  title, 
  description, 
  image_url, 
  tags, 
  contribution_level,
  is_featured,
  sort_order
) VALUES
  (
    '118029bb-894b-40b5-b197-95d2d6ada829', -- Futurcraft AI
    'MIDI Controller Interface',
    'Music production controller UI with track management and sequencing',
    'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-music-controller.png',
    ARRAY['Interface', 'Music', 'Hardware', 'Dark UI'],
    'UI Designer',
    true,
    1
  ),
  (
    'c67b4df7-ae8b-47b9-91d8-15112b8fd5be', -- Boston Financial
    'Corporate Innovation Platform',
    'Modern corporate website showcasing innovation and technology services',
    'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-laptop-mockup.png',
    ARRAY['Website', 'Corporate', 'Mockup', 'Dark Theme'],
    'Lead Designer',
    true,
    2
  ),
  (
    '01c83245-9881-4735-aa19-759895686f2f', -- Wedding Verse
    'Wedding Budget Planner Interface',
    'Interactive budget planning and venue selection interface for wedding planning',
    'https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-assets/ui-wedding-planner.png',
    ARRAY['Mobile App', 'Budget', 'Wedding', 'Red Theme'],
    'UI Designer',
    true,
    3
  );