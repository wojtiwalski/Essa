// Utility functions for loading data from JSON files
// In a real application, these would be replaced with API calls

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface ControllerImage {
  id: string;
  url: string;
  alt: string;
  type: 'main' | 'detail' | 'back' | 'gallery' | 'comparison';
  description: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  slug: string;
  description: string;
  founded: number;
  country: string;
  website: string;
  logo: string;
  color: string;
  isActive: boolean;
}

export interface Generation {
  id: string;
  name: string;
  displayName: string;
  startYear: number;
  endYear: number | null;
  description: string;
  keyFeatures: string[];
}

export interface NewsCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  version: string;
  lastUpdated: string;
  stats: {
    totalControllers: number;
    totalManufacturers: number;
    yearsOfHistory: number;
    communityRating: string;
  };
  features: string[];
  socialLinks: {
    github?: string;
    twitter?: string;
    discord?: string;
  };
}

export interface Controller {
  id: string;
  name: string;
  slug: string;
  manufacturer: string;
  releaseYear: number;
  generation: string;
  series?: string;
  modelNumbers: string[];
  variants: string[];
  colorOptions: string[];
  platforms: string[];
  communicationMethods: string[];
  wired: boolean;
  wireless: boolean;
  interface: string;
  batteryType: string;
  batteryCapacity_mAh: number;
  estimatedBatteryLifeHours: string;
  chargingMethod: string;
  buttonsTotal: number;
  faceButtons: string[];
  shoulderButtons: string[];
  triggers: string[];
  analogSticks: number;
  stickFeatures: string[];
  dpadType: string;
  vibrationFeedback: boolean;
  vibrationTypes: string[];
  motionSensors: string[];
  touchpad: boolean;
  touchpadDetails: string;
  lightFeatures: string[];
  audioOutput: string;
  audioInput: string;
  expansionPorts: string[];
  macroSupport: boolean;
  programmableButtons: boolean;
  modularity: string;
  buildMaterial: string;
  weightGrams: number;
  dimensions_mm: {
    width: number;
    height: number;
    depth: number;
  };
  regionDifferences: string[];
  supportOnPC: string;
  notableGames: string[];
  successor?: string;
  predecessor?: string;
  discontinued: boolean;
  designers: string[];
  designNotes: string;
  history: string;
  reception: string;
  legacy: string;
  technicalChallenges: string[];
  descriptionShort: string;
  descriptionLong: string;
  externalLinks: {
    wikipedia?: string;
    manual?: string;
    supportPage?: string;
  };
  image: string;
  images?: ControllerImage[];
  variants?: ControllerVariant[];
  gallery?: string[];
  tags: string[];
}

export interface ControllerVariant {
  name: string;
  color: string;
  image: string;
  description: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: number;
  image: string;
  tags: string[];
  featured: boolean;
  relatedControllers: string[];
}

export interface TutorialSection {
  type: 'html' | 'images' | 'links';
  title: string;
  content: string | Array<{
    url: string;
    caption?: string;
    title?: string;
    description?: string;
  }>;
}

export interface Tutorial {
  id: string;
  controllerId: string;
  title: string;
  description: string;
  author: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  sections: TutorialSection[];
}

export interface ControllerVariant {
  name: string;
  color: string;
  image: string;
  description: string;
}

// Data loader functions
export const loadController = async (slug: string): Promise<Controller | null> => {
  try {
    const response = await fetch(`/data/controllers/${slug}.json`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading controller ${slug}:`, error);
    return null;
  }
};

export const loadAllControllers = async (): Promise<Controller[]> => {
  try {
    // In a real application, this would fetch from an API endpoint
    // For now, we'll automatically detect all controller files
    const controllers: Controller[] = [];
    
    // List of known controller files (in a real app, this would be fetched from an API)
    const controllerFiles = [
      'gamecube-controller.json',
      'dualshock-4.json', 
      'xbox-wireless-controller.json',
      'nintendo-64-controller.json',
      'nintendo-switch-pro-controller.json'
    ];
    
    for (const filename of controllerFiles) {
      const slug = filename.replace('.json', '');
      const controller = await loadController(slug);
      if (controller) {
        controllers.push(controller);
      }
    }
    
    return controllers;
  } catch (error) {
    console.error('Error loading all controllers:', error);
    return [];
  }
};

export const loadAllManufacturers = async (): Promise<Manufacturer[]> => {
  try {
    const response = await fetch('/data/manufacturers.json');
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading manufacturers:', error);
    return [];
  }
};

export const loadManufacturer = async (slug: string): Promise<Manufacturer | null> => {
  try {
    const manufacturers = await loadAllManufacturers();
    return manufacturers.find(m => m.slug === slug) || null;
  } catch (error) {
    console.error(`Error loading manufacturer ${slug}:`, error);
    return null;
  }
};

export const loadAllGenerations = async (): Promise<Generation[]> => {
  try {
    const response = await fetch('/data/generations.json');
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading generations:', error);
    return [];
  }
};

export const loadAllNewsCategories = async (): Promise<NewsCategory[]> => {
  try {
    const response = await fetch('/data/news-categories.json');
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading news categories:', error);
    return [];
  }
};

export const loadSiteConfig = async (): Promise<SiteConfig> => {
  try {
    const response = await fetch('/data/site-config.json');
    if (!response.ok) {
      throw new Error('Failed to load site config');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading site config:', error);
    // Return default config as fallback
    return {
      siteName: "Padpedia",
      siteDescription: "Największa encyklopedia kontrolerów do gier w Polsce",
      version: "1.0.0",
      lastUpdated: "2024-01-15",
      stats: {
        totalControllers: 150,
        totalManufacturers: 25,
        yearsOfHistory: 45,
        communityRating: "4.9/5"
      },
      features: [
        "Kompleksowa baza danych kontrolerów",
        "Szczegółowe specyfikacje techniczne",
        "Historia i ciekawostki",
        "Porównywarka kontrolerów",
        "Aktualności ze świata gamingu"
      ],
      socialLinks: {
        github: "https://github.com/padpedia",
        twitter: "https://twitter.com/padpedia",
        discord: "https://discord.gg/padpedia"
      }
    };
  }
};

export const loadNewsArticle = async (slug: string): Promise<NewsArticle | null> => {
  try {
    const response = await fetch(`/data/news/${slug}.json`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading news article ${slug}:`, error);
    return null;
  }
};

export const loadAllNews = async (): Promise<NewsArticle[]> => {
  try {
    // In a real application, this would fetch from an API endpoint
    // For now, we'll automatically detect all news files
    const news: NewsArticle[] = [];
    
    // List of known news files (in a real app, this would be fetched from an API)
    const newsFiles = [
      'sony-dualsense-edge-profesjonalny-kontroler.json',
      'microsoft-xbox-wireless-controller-aktualizacja.json'
    ];
    
    for (const filename of newsFiles) {
      const slug = filename.replace('.json', '');
      const article = await loadNewsArticle(slug);
      if (article) {
        news.push(article);
      }
    }
    
    return news;
  } catch (error) {
    console.error('Error loading all news:', error);
    return [];
  }
};

export const loadControllersByIds = async (ids: string[]): Promise<Controller[]> => {
  try {
    const controllers: Controller[] = [];
    
    for (const id of ids) {
      const controller = await loadController(id);
      if (controller) {
        controllers.push(controller);
      }
    }
    
    return controllers;
  } catch (error) {
    console.error('Error loading controllers by IDs:', error);
    return [];
  }
};

export const loadTutorialsByControllerId = async (controllerId: string): Promise<Tutorial[]> => {
  try {
    // In a real application, this would fetch from an API endpoint
    // For now, we'll automatically detect tutorial files
    const tutorials: Tutorial[] = [];
    
    // List of known tutorial files (in a real app, this would be fetched from an API)
    const tutorialFiles = [
      'dualshock4-setup.json',
      'gamecube-maintenance.json',
      'nintendo-switch-pro-setup.json',
      'xbox-wireless-maintenance.json'
    ];
    
    for (const filename of tutorialFiles) {
      try {
        const response = await fetch(`/data/tutorials/${filename}`);
        if (response.ok) {
          const tutorial = await response.json();
          if (tutorial.controllerId === controllerId) {
            tutorials.push(tutorial);
          }
        }
      } catch (error) {
        // Skip files that don't exist or can't be loaded
        continue;
      }
    }
    
    return tutorials;
  } catch (error) {
    console.error(`Error loading tutorials for controller ${controllerId}:`, error);
    return [];
  }
};

// Helper functions to get data dynamically
export const getManufacturerName = async (id: string): Promise<string> => {
  const manufacturers = await loadAllManufacturers();
  const manufacturer = manufacturers.find(m => m.id === id);
  return manufacturer?.name || id;
};

export const getGenerationName = async (id: string): Promise<string> => {
  const generations = await loadAllGenerations();
  const generation = generations.find(g => g.id === id);
  return generation?.displayName || id;
};

export const getNewsCategoryName = async (id: string): Promise<string> => {
  const categories = await loadAllNewsCategories();
  const category = categories.find(c => c.id === id);
  return category?.name || id;
};

export const getNewsCategoryColor = async (id: string): Promise<string> => {
  const categories = await loadAllNewsCategories();
  const category = categories.find(c => c.id === id);
  return category?.color || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
};