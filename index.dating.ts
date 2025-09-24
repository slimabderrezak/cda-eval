/**
 * 📋 INDEX PRINCIPAL - EXPORTS DE LA STRUCTURE DATING
 */

// 📱 Types
export * from './types/dating';

// 🛠️ Utilitaires
export * from './utils/dating';

// 🎨 Styles
export { default as datingStyles } from './styles/components/dating';

// 📁 Chemins de structure pour référence
export const STRUCTURE_PATHS = {
  // Composants
  DATING_COMPONENTS: './components/dating',
  PROFILE_COMPONENTS: './components/profiles',
  MATCH_COMPONENTS: './components/matches',
  CHAT_COMPONENTS: './components/chat',
  
  // Styles
  THEME_STYLES: './styles/theme',
  COMPONENT_STYLES: './styles/components',
  SCREEN_STYLES: './styles/screens',
  
  // Utilitaires
  DATING_UTILS: './utils/dating',
  API_UTILS: './utils/api',
  
  // Types
  DATING_TYPES: './types/dating',
  
  // Constantes
  DATING_CONSTANTS: './constants/dating',
} as const;