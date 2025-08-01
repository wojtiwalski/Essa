// Search aliases and typo corrections for controllers
export const searchAliases: Record<string, string[]> = {
  // DualShock variations
  'dualshock': ['dual shock', 'dual-shock', 'ds'],
  'dualshock-2': ['dualshock 2', 'dualshock ii', 'dual shock 2', 'ds2'],
  'dualshock-3': ['dualshock 3', 'dualshock iii', 'dual shock 3', 'ds3'],
  'dualshock-4': ['dualshock 4', 'dualshock iv', 'dual shock 4', 'ds4'],
  'dualsense': ['dual sense', 'dual-sense', 'ds5', 'dualshock 5'],
  
  // Xbox variations
  'xbox-controller': ['xbox pad', 'xbox gamepad', 'microsoft controller'],
  'xbox-360-controller': ['xbox 360 pad', '360 controller', 'x360'],
  'xbox-one-controller': ['xbox one pad', 'xbone controller', 'xb1'],
  'xbox-wireless-controller': ['xbox series controller', 'series x controller', 'series s controller'],
  
  // Nintendo variations
  'gamecube-controller': ['gc controller', 'gamecube pad', 'nintendo gamecube controller'],
  'nintendo-switch-pro-controller': ['switch pro', 'pro controller', 'nintendo pro'],
  'wii-remote': ['wiimote', 'wii controller', 'nintendo wii remote'],
  'joy-con': ['joycon', 'joy con', 'switch controller'],
  
  // Common typos and variations
  'nintendo': ['ninendo', 'nintedo', 'nintendo'],
  'sony': ['sony', 'playstation'],
  'microsoft': ['microsoft', 'xbox'],
  'controller': ['controler', 'contrller', 'pad', 'gamepad', 'joystick'],
  'wireless': ['wireles', 'cordless', 'bluetooth'],
  'wired': ['wire', 'cable', 'corded'],
};

// Function to normalize search query and find matches
export const normalizeSearchQuery = (query: string): string[] => {
  const normalizedQuery = query.toLowerCase().trim();
  const queries = [normalizedQuery];
  
  // Check for direct aliases
  for (const [key, aliases] of Object.entries(searchAliases)) {
    if (aliases.includes(normalizedQuery) || key === normalizedQuery) {
      queries.push(key);
      queries.push(...aliases);
    }
  }
  
  // Remove duplicates and return
  return [...new Set(queries)];
};

// Function to check if controller matches search query (including aliases)
export const matchesSearchQuery = (controller: any, searchQuery: string): boolean => {
  if (!searchQuery.trim()) return true;
  
  const searchQueries = normalizeSearchQuery(searchQuery);
  
  // Fields to search in
  const searchFields = [
    controller.name?.toLowerCase(),
    controller.manufacturer?.toLowerCase(),
    controller.slug?.toLowerCase(),
    ...(controller.tags || []).map((tag: string) => tag.toLowerCase()),
    ...(controller.platforms || []).map((platform: string) => platform.toLowerCase()),
    controller.generation?.toLowerCase(),
    controller.series?.toLowerCase(),
  ].filter(Boolean);
  
  // Check if any search query matches any field
  return searchQueries.some(query => 
    searchFields.some(field => field.includes(query))
  );
};