import { supabase } from "@/integrations/supabase/client";
import { projectsData } from "@/data/projectData";
import { uploadProjectAssets, createAssetRecords } from "./uploadAssets";

interface CategoryMap {
  [key: string]: string; // category slug -> category id
}

export const migrateProjectData = async () => {
  try {
    console.log("Starting project data migration...");

    // Step 1: Create categories
    const uniqueCategories = [...new Set(Object.values(projectsData).map(p => p.category))];
    const categoryMap: CategoryMap = {};

    for (const categorySlug of uniqueCategories) {
      // Check if category already exists
      const { data: existingCategory } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (existingCategory) {
        categoryMap[categorySlug] = existingCategory.id;
        continue;
      }

      // Create new category
      const categoryName = categorySlug === 'b2c' ? 'B2C' :
                          categorySlug === 'finops' ? 'FinOps' :
                          categorySlug === 'healthcare' ? 'Healthcare' :
                          categorySlug === 'ai' ? 'AI' :
                          categorySlug === 'webdesigns' ? 'Web Designs' :
                          categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

      const { data: newCategory, error: categoryError } = await supabase
        .from('categories')
        .insert({
          name: categoryName,
          slug: categorySlug,
          description: `${categoryName} projects`
        })
        .select('id')
        .single();

      if (categoryError) throw categoryError;
      categoryMap[categorySlug] = newCategory.id;
    }

    console.log("Categories created:", categoryMap);

    // Step 2: Migrate projects
    for (const [slug, projectData] of Object.entries(projectsData)) {
      // Check if project already exists
      const { data: existingProject } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existingProject) {
        console.log(`Project ${slug} already exists, skipping...`);
        continue;
      }

      // Insert project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          slug,
          title: projectData.title,
          subtitle: projectData.subtitle,
          description: projectData.description,
          category_id: categoryMap[projectData.category],
          year: projectData.year,
          services: projectData.services,
          role_title: projectData.role.title,
          role_duration: projectData.role.duration,
          role_team: projectData.role.team,
          role_tools: projectData.role.tools,
          context_problem: projectData.context.problem,
          context_objective: projectData.context.objective,
          context_audience: projectData.context.audience,
          reflection: projectData.reflection,
          live_link: projectData.links.live,
          github_link: projectData.links.github,
          figma_link: projectData.links.figma,
          is_published: true,
          sort_order: 0
        })
        .select('id')
        .single();

      if (projectError) throw projectError;

      console.log(`Created project: ${projectData.title}`);

      // Insert features
      if (projectData.features?.length > 0) {
        const features = projectData.features.map((feature, index) => ({
          project_id: project.id,
          title: feature.title,
          description: feature.description,
          icon: feature.icon,
          sort_order: index
        }));

        const { error: featuresError } = await supabase
          .from('project_features')
          .insert(features);

        if (featuresError) throw featuresError;
      }

      // Insert process steps
      if (projectData.process?.length > 0) {
        const processSteps = projectData.process.map((step, index) => ({
          project_id: project.id,
          step: step.step,
          description: step.description,
          icon: step.icon,
          sort_order: index
        }));

        const { error: processError } = await supabase
          .from('project_process')
          .insert(processSteps);

        if (processError) throw processError;
      }

      // Insert outcomes
      if (projectData.outcomes?.length > 0) {
        const outcomes = projectData.outcomes.map((outcome, index) => ({
          project_id: project.id,
          metric: outcome.metric,
          value: outcome.value,
          sort_order: index
        }));

        const { error: outcomesError } = await supabase
          .from('project_outcomes')
          .insert(outcomes);

        if (outcomesError) throw outcomesError;
      }
    }

    // Step 3: Upload and link assets
    console.log("Uploading project assets...");
    const assetResults = await uploadProjectAssets();
    
    if (assetResults.success) {
      console.log("Creating asset database records...");
      const assetRecordResults = await createAssetRecords(assetResults);
      
      if (!assetRecordResults.success) {
        console.warn("⚠️ Asset upload succeeded but database records failed:", assetRecordResults.message);
      }
    } else {
      console.warn("⚠️ Asset upload had issues:", assetResults.errors);
    }

    console.log("Project data migration completed successfully!");
    return { success: true, message: "Migration completed successfully with assets" };

  } catch (error) {
    console.error("Migration failed:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Migration failed" 
    };
  }
};

// Helper function to run migration and show results
export const runMigration = async () => {
  const result = await migrateProjectData();
  
  if (result.success) {
    alert("✅ Project data migrated successfully!");
  } else {
    alert(`❌ Migration failed: ${result.message}`);
  }
  
  return result;
};