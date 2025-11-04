// Image asset mapping - ready for new uploads
export const imageAssets: Record<string, string> = {
  // Project mockup images will be added here when re-uploaded
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
