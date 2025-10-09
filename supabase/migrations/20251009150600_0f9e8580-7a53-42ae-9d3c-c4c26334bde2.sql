-- Update category names to remove "Design" and reorder
UPDATE categories SET name = 'Product', sort_order = 1 WHERE slug = 'product-design';
UPDATE categories SET name = 'Concepts', sort_order = 2 WHERE slug = 'concepts-experiments';
UPDATE categories SET name = 'Interaction', sort_order = 3 WHERE slug = 'interaction-design';
UPDATE categories SET name = 'UI', sort_order = 4 WHERE slug = 'ui-design';