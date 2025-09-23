// Images statiques pour éviter les problèmes avec require() dynamiques
// Cette approche utilise des imports directs pour garantir le fonctionnement

// Images disponibles dans assets/images
export const AppImages = {
  icon: require('@/assets/images/icon.png'),
  reactLogo: require('@/assets/images/react-logo.png'),
  partialReactLogo: require('@/assets/images/partial-react-logo.png'),
  favicon: require('@/assets/images/favicon.png'),
  splashIcon: require('@/assets/images/splash-icon.png'),
} as const;

// Avatars par défaut utilisant les images disponibles
export const DefaultAvatars = {
  // Emma - Jeune femme artiste
  emma: AppImages.reactLogo,
  
  // Lucas - Homme barbu  
  lucas: AppImages.icon,
  
  // Sophie - Femme blonde zen
  sophie: AppImages.partialReactLogo,
  
  // Antoine - Homme sportif
  antoine: AppImages.splashIcon,
  
  // Camille - Femme rousse élégante
  camille: AppImages.favicon,
  
  // Marie - Utilisatrice actuelle
  marie: AppImages.icon,
  
  // Julien - Homme créatif
  julien: AppImages.reactLogo,
} as const;

// Type pour les clés d'avatars
export type AvatarKey = keyof typeof DefaultAvatars;