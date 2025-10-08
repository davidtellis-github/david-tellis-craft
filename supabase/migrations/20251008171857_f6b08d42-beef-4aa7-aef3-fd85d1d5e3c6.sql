-- Add Ideabaaz project to the database
INSERT INTO projects (
  slug,
  title,
  subtitle,
  description,
  category_id,
  year,
  services,
  contribution_level,
  is_published,
  role_title,
  role_duration,
  role_team,
  role_tools,
  context_problem,
  context_objective,
  context_audience,
  reflection
) VALUES (
  'ideabaaz',
  'Ideabaaz',
  'Get visible. Get funded. Get growing.',
  'A web portal built for startups and their ecosystem — a digital space that connects founders, investors, mentors, and solution providers to help ideas grow and scale. The platform acts as a launchpad for India''s new-generation entrepreneurs, combining funding access, mentorship, and business solutions in one place.',
  (SELECT id FROM categories WHERE slug = 'b2b' LIMIT 1),
  '2025',
  'Strategy + Design + Stakeholder Management',
  'Lead Designer',
  true,
  'Product Designer & Project Lead',
  '2025',
  'Presented by Zee • Curated by Turbostart',
  ARRAY['Figma'],
  'India''s startup ecosystem is buzzing — but fragmented. Early-stage founders struggle to find visibility, guidance, and funding opportunities. On the other side, investors and mentors lack a centralized, reliable space to discover and support new ventures.',
  'Design a landing experience that introduces the ecosystem and inspires action, while building trust and credibility through visual tone, partner branding, and content flow.',
  'Founders, investors, mentors, and solution providers in India''s startup ecosystem',
  'Ideabaaz was about creating more than just a platform — it was about building a web portal where ideas, mentorship, funding, and solutions meet seamlessly. Simplifying complex ecosystems into digestible, inspiring storytelling improves engagement. Strong brand voice alignment early on helps in setting the tone for future UX. Even pre-launch pages can act as powerful brand assets when designed with intention. Every idea deserves the right stage.'
);

-- Add project features for Ideabaaz
INSERT INTO project_features (project_id, title, description, icon, sort_order)
SELECT 
  (SELECT id FROM projects WHERE slug = 'ideabaaz'),
  title,
  description,
  icon,
  sort_order
FROM (VALUES
  ('For Founders', 'Get visible to investors, access funding opportunities, and showcase your startup to the right audience.', '🚀', 1),
  ('For Investors', 'Discover vetted startups, connect with high-potential founders, and expand your investment portfolio.', '💼', 2),
  ('For Mentors', 'Guide the next generation of entrepreneurs, share your expertise, and contribute to the ecosystem.', '🎓', 3),
  ('For Solution Providers', 'Connect with startups in need of your services, from legal to marketing to technology solutions.', '🔧', 4)
) AS features(title, description, icon, sort_order);

-- Add project process steps for Ideabaaz
INSERT INTO project_process (project_id, step, description, icon, sort_order)
SELECT 
  (SELECT id FROM projects WHERE slug = 'ideabaaz'),
  step,
  description,
  icon,
  sort_order
FROM (VALUES
  ('Hero Section', 'Bold messaging with "Get visible. Get funded. Get growing." and startup registration CTA to build anticipation.', '🎯', 1),
  ('Partner Logos', 'Built social proof instantly with known brands like House of Cheer, Wizcraft, Zee, Dangal, and YourStory.', '🤝', 2),
  ('Ecosystem Breakdown', 'Introduced 4 key groups with light, friendly tone and quick CTAs for each user type.', '🧩', 3),
  ('Get Started Section', 'Motivational messaging encouraging each user type to begin their journey on Ideabaaz.', '✨', 4),
  ('FAQs & Footer', 'Added transparency, trust signals, and clear ownership credits.', '📋', 5)
) AS process_steps(step, description, icon, sort_order);

-- Add project outcomes for Ideabaaz
INSERT INTO project_outcomes (project_id, metric, value, sort_order)
SELECT 
  (SELECT id FROM projects WHERE slug = 'ideabaaz'),
  metric,
  value,
  sort_order
FROM (VALUES
  ('Brand foundation', 'Established solid identity', 1),
  ('Landing page design', 'High-conversion ready', 2),
  ('Content structure', 'Adaptable for future features', 3),
  ('Brand positioning', 'Credible accelerator backed by Zee', 4)
) AS outcomes(metric, value, sort_order);