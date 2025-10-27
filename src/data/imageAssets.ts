// Import all project mockup images
import weddingverse1 from '@/assets/weddingverse-mockup-1.jpg';
import weddingverse2 from '@/assets/weddingverse-mockup-2.jpg';
import weddingverse3 from '@/assets/weddingverse-mockup-3.jpg';
import weddingverse4 from '@/assets/weddingverse-mockup-4.jpg';
import weddingverse5 from '@/assets/weddingverse-mockup-5.jpg';
import weddingverse6 from '@/assets/weddingverse-mockup-6.jpg';
import weddingverse7 from '@/assets/weddingverse-mockup-7.jpg';
import weddingverse8 from '@/assets/weddingverse-mockup-8.jpg';
import weddingverse9 from '@/assets/weddingverse-mockup-9.jpg';

import futurcraft1 from '@/assets/futurcraft-mockup-1.jpg';
import futurcraft2 from '@/assets/futurcraft-mockup-2.jpg';
import futurcraft3 from '@/assets/futurcraft-mockup-3.jpg';
import futurcraft4 from '@/assets/futurcraft-mockup-4.jpg';
import futurcraft5 from '@/assets/futurcraft-mockup-5.jpg';
import futurcraft6 from '@/assets/futurcraft-mockup-6.jpg';
import futurcraft7 from '@/assets/futurcraft-mockup-7.jpg';
import futurcraft8 from '@/assets/futurcraft-mockup-8.jpg';
import futurcraft9 from '@/assets/futurcraft-mockup-9.jpg';
import futurcraft10 from '@/assets/futurcraft-mockup-10.jpg';
import futurcraft11 from '@/assets/futurcraft-mockup-11.jpg';

import turbocloud1 from '@/assets/turbocloud-mockup-1.jpg';
import turbocloud2 from '@/assets/turbocloud-mockup-2.jpg';
import turbocloud3 from '@/assets/turbocloud-mockup-3.jpg';
import turbocloud4 from '@/assets/turbocloud-mockup-4.jpg';

import medpass1 from '@/assets/medpass-mockup-1.jpg';
import medpass2 from '@/assets/medpass-mockup-2.jpg';
import medpass3 from '@/assets/medpass-mockup-3.jpg';
import medpass4 from '@/assets/medpass-mockup-4.jpg';
import medpass5 from '@/assets/medpass-mockup-5.jpg';

import bostonFinancial1 from '@/assets/boston-financial-mockup-1.png';
import bostonFinancial2 from '@/assets/boston-financial-mockup-2.png';

import ideabaaz1 from '@/assets/ideabaaz-mockup-1.jpg';
import ideabaaz2 from '@/assets/ideabaaz-mockup-2.jpg';

// Map filenames to imported image URLs
export const imageAssets: Record<string, string> = {
  'weddingverse-mockup-1.jpg': weddingverse1,
  'weddingverse-mockup-2.jpg': weddingverse2,
  'weddingverse-mockup-3.jpg': weddingverse3,
  'weddingverse-mockup-4.jpg': weddingverse4,
  'weddingverse-mockup-5.jpg': weddingverse5,
  'weddingverse-mockup-6.jpg': weddingverse6,
  'weddingverse-mockup-7.jpg': weddingverse7,
  'weddingverse-mockup-8.jpg': weddingverse8,
  'weddingverse-mockup-9.jpg': weddingverse9,
  
  'futurcraft-mockup-1.jpg': futurcraft1,
  'futurcraft-mockup-2.jpg': futurcraft2,
  'futurcraft-mockup-3.jpg': futurcraft3,
  'futurcraft-mockup-4.jpg': futurcraft4,
  'futurcraft-mockup-5.jpg': futurcraft5,
  'futurcraft-mockup-6.jpg': futurcraft6,
  'futurcraft-mockup-7.jpg': futurcraft7,
  'futurcraft-mockup-8.jpg': futurcraft8,
  'futurcraft-mockup-9.jpg': futurcraft9,
  'futurcraft-mockup-10.jpg': futurcraft10,
  'futurcraft-mockup-11.jpg': futurcraft11,
  
  'turbocloud-mockup-1.jpg': turbocloud1,
  'turbocloud-mockup-2.jpg': turbocloud2,
  'turbocloud-mockup-3.jpg': turbocloud3,
  'turbocloud-mockup-4.jpg': turbocloud4,
  
  'medpass-mockup-1.jpg': medpass1,
  'medpass-mockup-2.jpg': medpass2,
  'medpass-mockup-3.jpg': medpass3,
  'medpass-mockup-4.jpg': medpass4,
  'medpass-mockup-5.jpg': medpass5,
  
  'boston-financial-mockup-1.png': bostonFinancial1,
  'boston-financial-mockup-2.png': bostonFinancial2,
  
  'ideabaaz-mockup-1.jpg': ideabaaz1,
  'ideabaaz-mockup-2.jpg': ideabaaz2,
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
