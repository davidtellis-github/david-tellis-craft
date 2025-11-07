// Featured project images
import weddingverseFeatured from '@/assets/weddingverse-featured.png';
import ideabaazFeatured from '@/assets/ideabaaz-featured.png';
import futurcraftFeatured from '@/assets/futurcraft-featured.png';
import turbocloudFeatured from '@/assets/turbocloud-featured.png';

// Wedding Verse Design System
import designSystem1 from '@/assets/wedding-verse-design-system-1.png';
import designSystem2 from '@/assets/wedding-verse-design-system-2.png';
import designSystem3 from '@/assets/wedding-verse-design-system-3.png';

// Wedding Verse Iterations - New uploaded screenshots
import wvIterations1 from '@/assets/wedding-verse-iterations-1.png';
import wvIterations2 from '@/assets/wedding-verse-iterations-2.png';
import wvIterations3 from '@/assets/wedding-verse-iterations-3.png';

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
