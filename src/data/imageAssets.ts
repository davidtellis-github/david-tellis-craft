// Featured project images
import weddingverseFeatured from '@/assets/weddingverse-featured.png';
import ideabaazFeatured from '@/assets/ideabaaz-featured.png';
import futurcraftFeatured from '@/assets/futurcraft-featured.png';
import turbocloudFeatured from '@/assets/turbocloud-featured.png';

// Wedding Verse UI screens
import weddingVerseHome from '@/assets/wedding-verse-home.png';
import weddingVerseWelcome from '@/assets/wedding-verse-welcome.png';
import weddingVerseDatePicker from '@/assets/wedding-verse-date-picker.png';
import weddingVerseDashboard from '@/assets/wedding-verse-dashboard.png';
import weddingVerseVisionBoard from '@/assets/wedding-verse-vision-board.png';
import weddingVerseTheme from '@/assets/wedding-verse-theme.png';
import weddingVerseGallery from '@/assets/wedding-verse-gallery.png';
import weddingVerseBudget from '@/assets/wedding-verse-budget.png';
import weddingVerseTrending from '@/assets/wedding-verse-trending.png';
import weddingVerseUxFlow from '@/assets/wedding-verse-ux-flow.png';

// Turbocloud project images
import turbocloudDashboard1 from '@/assets/turbocloud-dashboard-1.jpg';
import turbocloudProviderSelection from '@/assets/turbocloud-provider-selection.jpg';
import turbocloudSignup from '@/assets/turbocloud-signup.jpg';

// Wedding Verse Design System
import designSystem1 from '@/assets/wedding-verse-design-system-1.png';
import designSystem2 from '@/assets/wedding-verse-design-system-2.png';
import designSystem3 from '@/assets/wedding-verse-design-system-3.png';

// Wedding Verse Iterations - New uploaded screenshots
import wvIterations1 from '@/assets/wedding-verse-iterations-1.png';
import wvIterations2 from '@/assets/wedding-verse-iterations-2.png';
import wvIterations3 from '@/assets/wedding-verse-iterations-3.png';
import wvIterations4 from '@/assets/wedding-verse-iterations-4.png';
import wvIterations5 from '@/assets/wedding-verse-iterations-5.png';

// Futurcraft AI project images
import futurcraftUrlInput from '@/assets/futurcraft-url-input.png';
import futurcraftBrandforge from '@/assets/futurcraft-brandforge.png';
import futurcraftContentCompare from '@/assets/futurcraft-content-compare.png';
import futurcraftDashboardDark from '@/assets/futurcraft-dashboard-dark.png';
import futurcraftBlogs from '@/assets/futurcraft-blogs.png';
import futurcraftBlogList from '@/assets/futurcraft-blog-list.png';
import futurcraftBlogEditor from '@/assets/futurcraft-blog-editor.png';

// Image asset mapping
export const imageAssets: Record<string, string> = {
  'weddingverse-featured.png': weddingverseFeatured,
  'ideabaaz-featured.png': ideabaazFeatured,
  'futurcraft-featured.png': futurcraftFeatured,
  'turbocloud-featured.png': turbocloudFeatured,
  'wedding-verse-design-system-1.png': designSystem1,
  'wedding-verse-design-system-2.png': designSystem2,
  'wedding-verse-design-system-3.png': designSystem3,
  'wedding-verse-iterations-1.png': wvIterations1,
  'wedding-verse-iterations-2.png': wvIterations2,
  'wedding-verse-iterations-3.png': wvIterations3,
  'wedding-verse-iterations-4.png': wvIterations4,
  'wedding-verse-iterations-5.png': wvIterations5,
  'wedding-verse-home.png': weddingVerseHome,
  'wedding-verse-welcome.png': weddingVerseWelcome,
  'wedding-verse-date-picker.png': weddingVerseDatePicker,
  'wedding-verse-dashboard.png': weddingVerseDashboard,
  'wedding-verse-vision-board.png': weddingVerseVisionBoard,
  'wedding-verse-theme.png': weddingVerseTheme,
  'wedding-verse-gallery.png': weddingVerseGallery,
  'wedding-verse-budget.png': weddingVerseBudget,
  'wedding-verse-trending.png': weddingVerseTrending,
  'wedding-verse-ux-flow.png': weddingVerseUxFlow,
  'turbocloud-dashboard-1.jpg': turbocloudDashboard1,
  'turbocloud-provider-selection.jpg': turbocloudProviderSelection,
  'turbocloud-signup.jpg': turbocloudSignup,
  'futurcraft-url-input.png': futurcraftUrlInput,
  'futurcraft-brandforge.png': futurcraftBrandforge,
  'futurcraft-content-compare.png': futurcraftContentCompare,
  'futurcraft-dashboard-dark.png': futurcraftDashboardDark,
  'futurcraft-blogs.png': futurcraftBlogs,
  'futurcraft-blog-list.png': futurcraftBlogList,
  'futurcraft-blog-editor.png': futurcraftBlogEditor,
};

// Helper function to resolve image paths
export const getImageUrl = (pathOrFilename: string): string => {
  // Handle full paths like '/src/assets/image.png'
  if (pathOrFilename.startsWith('/src/assets/')) {
    const filename = pathOrFilename.replace('/src/assets/', '');
    return imageAssets[filename] || pathOrFilename;
  }
  
  // Handle just filename
  return imageAssets[pathOrFilename] || pathOrFilename;
};
