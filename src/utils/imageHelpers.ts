import { ControllerImage } from './dataLoader';

/**
 * Gets the main image URL from a controller
 * Falls back to the legacy 'image' field if no images array is available
 */
export const getMainImageUrl = (controller: { image: string; images?: ControllerImage[] }): string => {
  if (controller.images && controller.images.length > 0) {
    const mainImage = controller.images.find(img => img.type === 'main');
    return mainImage ? mainImage.url : controller.images[0].url;
  }
  return controller.image;
};

/**
 * Gets the main image alt text from a controller
 */
export const getMainImageAlt = (controller: { name: string; images?: ControllerImage[] }): string => {
  if (controller.images && controller.images.length > 0) {
    const mainImage = controller.images.find(img => img.type === 'main');
    return mainImage ? mainImage.alt : controller.images[0].alt;
  }
  return controller.name;
};

/**
 * Gets all images for a controller, ensuring backward compatibility
 */
export const getControllerImages = (controller: { image: string; images?: ControllerImage[] }): ControllerImage[] => {
  if (controller.images && controller.images.length > 0) {
    return controller.images;
  }
  
  // Fallback: create a single image object from the legacy image field
  return [{
    id: 'main',
    url: controller.image,
    alt: 'Controller image',
    type: 'main' as const,
    description: 'Controller image'
  }];
};

/**
 * Gets images by type
 */
export const getImagesByType = (images: ControllerImage[], type: ControllerImage['type']): ControllerImage[] => {
  return images.filter(img => img.type === type);
};

/**
 * Checks if controller has multiple images
 */
export const hasMultipleImages = (controller: { images?: ControllerImage[] }): boolean => {
  return !!(controller.images && controller.images.length > 1);
}; 