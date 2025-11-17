// Anima Color Palette - Extracted from original design
export const ANIMA_COLORS = {
  // Primary colors from Anima design
  primary: {
    white: '#ffffff',
    black: '#000000',
    accent: '#995c00', // Orange/brown accent color from design
    neutral: '#999999',
    dark_gray: '#666666',
    medium_gray: '#4d4d4d',
    light_gray: '#e5e5e5',
    darker_gray: '#333333'
  },
  
  // Background colors
  backgrounds: {
    white: '#ffffff',
    black: '#000000',
    light_gray: '#e5e5e5',
    overlay_light: '#0000000d', // 5% black overlay
    overlay_medium: '#0000001a', // 10% black overlay
    overlay_dark: '#00000003' // 1% black overlay
  },
  
  // Text colors
  text: {
    primary: '#000000',
    white: '#ffffff',
    accent: '#995c00',
    muted: '#4d4d4d',
    light: '#999999'
  },
  
  // Border colors
  borders: {
    light: '#e5e5e5',
    white: '#ffffff',
    black: '#000000',
    overlay: '#0000000d'
  }
};

// Convert Anima colors to modern real estate palette
export const GEA_COLOR_MAPPING = {
  // Map Anima colors to Grants Estate Agents brand colors
  primary: ANIMA_COLORS.primary.accent, // Use the accent color as primary
  secondary: '#2563eb', // Modern blue for real estate
  accent: '#10b981', // Green for success/sold states
  warning: '#f59e0b', // Yellow for pending states
  
  // Neutral palette
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5', 
    200: ANIMA_COLORS.primary.light_gray, // #e5e5e5
    300: '#d4d4d4',
    400: ANIMA_COLORS.primary.neutral, // #999999
    500: ANIMA_COLORS.primary.medium_gray, // #4d4d4d
    600: '#525252',
    700: '#404040',
    800: ANIMA_COLORS.primary.darker_gray, // #333333
    900: '#171717',
    950: ANIMA_COLORS.primary.black // #000000
  },
  
  // Background variations
  backgrounds: {
    primary: ANIMA_COLORS.backgrounds.white,
    secondary: '#f8fafc',
    dark: ANIMA_COLORS.backgrounds.black,
    overlay: {
      light: ANIMA_COLORS.backgrounds.overlay_light,
      medium: ANIMA_COLORS.backgrounds.overlay_medium,
      dark: 'rgba(0, 0, 0, 0.5)'
    }
  }
};

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  return `
:root {
  /* Anima Original Colors */
  --anima-white: ${ANIMA_COLORS.primary.white};
  --anima-black: ${ANIMA_COLORS.primary.black};
  --anima-accent: ${ANIMA_COLORS.primary.accent};
  --anima-neutral: ${ANIMA_COLORS.primary.neutral};
  --anima-light-gray: ${ANIMA_COLORS.primary.light_gray};
  --anima-medium-gray: ${ANIMA_COLORS.primary.medium_gray};
  --anima-dark-gray: ${ANIMA_COLORS.primary.dark_gray};
  
  /* GEA Brand Colors */
  --gea-primary: ${GEA_COLOR_MAPPING.primary};
  --gea-secondary: ${GEA_COLOR_MAPPING.secondary};
  --gea-accent: ${GEA_COLOR_MAPPING.accent};
  --gea-warning: ${GEA_COLOR_MAPPING.warning};
  
  /* Neutral Scale */
  --neutral-50: ${GEA_COLOR_MAPPING.neutral[50]};
  --neutral-100: ${GEA_COLOR_MAPPING.neutral[100]};
  --neutral-200: ${GEA_COLOR_MAPPING.neutral[200]};
  --neutral-300: ${GEA_COLOR_MAPPING.neutral[300]};
  --neutral-400: ${GEA_COLOR_MAPPING.neutral[400]};
  --neutral-500: ${GEA_COLOR_MAPPING.neutral[500]};
  --neutral-600: ${GEA_COLOR_MAPPING.neutral[600]};
  --neutral-700: ${GEA_COLOR_MAPPING.neutral[700]};
  --neutral-800: ${GEA_COLOR_MAPPING.neutral[800]};
  --neutral-900: ${GEA_COLOR_MAPPING.neutral[900]};
  --neutral-950: ${GEA_COLOR_MAPPING.neutral[950]};
  
  /* Background Variations */
  --bg-primary: ${GEA_COLOR_MAPPING.backgrounds.primary};
  --bg-secondary: ${GEA_COLOR_MAPPING.backgrounds.secondary};
  --bg-dark: ${GEA_COLOR_MAPPING.backgrounds.dark};
  --bg-overlay-light: ${GEA_COLOR_MAPPING.backgrounds.overlay.light};
  --bg-overlay-medium: ${GEA_COLOR_MAPPING.backgrounds.overlay.medium};
  --bg-overlay-dark: ${GEA_COLOR_MAPPING.backgrounds.overlay.dark};
}
`;
};

// Utility function to convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Utility function to create RGBA color
export const createRgba = (hex: string, opacity: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

// Color contrast utilities
export const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast check - return white or black text based on background
  const lightColors = [
    ANIMA_COLORS.primary.white,
    ANIMA_COLORS.primary.light_gray,
    GEA_COLOR_MAPPING.neutral[50],
    GEA_COLOR_MAPPING.neutral[100],
    GEA_COLOR_MAPPING.neutral[200]
  ];
  
  return lightColors.includes(backgroundColor) 
    ? ANIMA_COLORS.primary.black 
    : ANIMA_COLORS.primary.white;
};

// Property status colors for real estate
export const PROPERTY_STATUS_COLORS = {
  for_sale: {
    background: GEA_COLOR_MAPPING.secondary,
    text: ANIMA_COLORS.primary.white,
    border: GEA_COLOR_MAPPING.secondary
  },
  sold: {
    background: '#dc2626', // Red
    text: ANIMA_COLORS.primary.white,
    border: '#dc2626'
  },
  new_listing: {
    background: GEA_COLOR_MAPPING.accent,
    text: ANIMA_COLORS.primary.white,
    border: GEA_COLOR_MAPPING.accent
  },
  under_offer: {
    background: GEA_COLOR_MAPPING.warning,
    text: ANIMA_COLORS.primary.black,
    border: GEA_COLOR_MAPPING.warning
  },
  off_market: {
    background: GEA_COLOR_MAPPING.neutral[500],
    text: ANIMA_COLORS.primary.white,
    border: GEA_COLOR_MAPPING.neutral[500]
  }
};

// Component color schemes
export const COMPONENT_COLORS = {
  button: {
    primary: {
      background: GEA_COLOR_MAPPING.primary,
      text: ANIMA_COLORS.primary.white,
      hover: '#7c4900' // Darker version of accent
    },
    secondary: {
      background: ANIMA_COLORS.primary.white,
      text: GEA_COLOR_MAPPING.primary,
      hover: ANIMA_COLORS.primary.light_gray,
      border: GEA_COLOR_MAPPING.primary
    },
    ghost: {
      background: 'transparent',
      text: GEA_COLOR_MAPPING.primary,
      hover: ANIMA_COLORS.backgrounds.overlay_light
    }
  },
  
  card: {
    background: ANIMA_COLORS.primary.white,
    border: ANIMA_COLORS.primary.light_gray,
    shadow: ANIMA_COLORS.backgrounds.overlay_medium,
    hover_shadow: ANIMA_COLORS.backgrounds.overlay_medium
  },
  
  input: {
    background: ANIMA_COLORS.primary.white,
    border: ANIMA_COLORS.primary.light_gray,
    focus_border: GEA_COLOR_MAPPING.secondary,
    placeholder: GEA_COLOR_MAPPING.neutral[400],
    text: ANIMA_COLORS.primary.black
  }
};

export default {
  ANIMA_COLORS,
  GEA_COLOR_MAPPING,
  PROPERTY_STATUS_COLORS,
  COMPONENT_COLORS,
  generateCSSVariables,
  hexToRgb,
  createRgba,
  getContrastColor
};