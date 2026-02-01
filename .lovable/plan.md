

## Organize Futurcraft AI Images by Feature Area

Restructure the gallery to group images logically by product feature, making it easier for viewers to understand the product's capabilities.

### Current State

Images are currently split into Light Mode and Dark Mode sections with a somewhat random order:

**Light Mode (6 images):**
1. URL Input
2. Brandforge
3. Content Compare
4. Blogs Overview
5. Blog List
6. Blog Editor

**Dark Mode (2 images):**
1. Dashboard
2. AI Interface

### Proposed Feature-Based Organization

Reorganize into 4 clear feature areas, each with a descriptive label:

**1. Brand Analysis** (Onboarding & Analysis Tools)
   - URL Input (user enters website to analyze)
   - Brandforge (brand identity generation)

**2. AI Tools** (Core AI Features)
   - Content Compare (AI comparison tool)
   - AI Interface (dark mode AI chat/tools)

**3. Dashboard** (Central Hub)
   - Dashboard Dark (main control center)

**4. Blog Management** (Content Creation Suite)
   - Blogs Overview
   - Blog List
   - Blog Editor

### Visual Design

Each feature section will have:
- A colored indicator dot matching the feature theme
- Clear section heading
- Images displayed in logical order within each group

### Technical Details

**File: `src/pages/ProjectDetails.tsx`**

1. **Replace the two arrays** (lines 147-159):
   ```javascript
   const futurcraftFeatureGroups = [
     {
       title: "Brand Analysis",
       description: "Onboarding and brand identity tools",
       indicatorColor: "bg-blue-500",
       images: [
         { src: futurcraftUrlInput, alt: "URL Input" },
         { src: futurcraftBrandforge, alt: "Brandforge" },
       ]
     },
     {
       title: "AI Tools",
       description: "Core AI-powered features",
       indicatorColor: "bg-purple-500",
       images: [
         { src: futurcraftContentCompare, alt: "Content Compare" },
         { src: futurcraftAi, alt: "AI Interface" },
       ]
     },
     {
       title: "Dashboard",
       description: "Central command center",
       indicatorColor: "bg-emerald-500",
       images: [
         { src: futurcraftDashboardDark, alt: "Dashboard" },
       ]
     },
     {
       title: "Blog Management",
       description: "Content creation suite",
       indicatorColor: "bg-amber-500",
       images: [
         { src: futurcraftBlogs, alt: "Blogs Overview" },
         { src: futurcraftBlogList, alt: "Blog List" },
         { src: futurcraftBlogEditor, alt: "Blog Editor" },
       ]
     }
   ];
   ```

2. **Update the rendering section** (lines 354-441):
   - Replace the Light/Dark mode sections with a loop through feature groups
   - Each group shows its colored indicator, title, and images
   - Maintains the same hover effects and lightbox functionality

