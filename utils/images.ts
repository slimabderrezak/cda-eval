/**
 * Utilitaires pour la gestion des images dans l'application
 */

// Images des produits organisées par catégorie
export const Images = {
  // Chaussures
  shoes: {
    nike: require('@/assets/images/sneaker-nike.png'),
    adidas: require('@/assets/images/sneaker-adidas.png'),
  },
  
  // Audio & Électronique
  audio: {
    headphones: require('@/assets/images/casque-audio.png'),
  },
  
  // Vêtements
  clothing: {
    jacket: require('@/assets/images/vetement-mode.png'),
  },
  
  // Sport & Accessoires
  sport: {
    accessory: require('@/assets/images/sport-accessoire.png'),
  },
  
  // Interface utilisateur
  ui: {
    logo: require('@/assets/images/icon.png'),
    defaultProduct: require('@/assets/images/react-logo.png'),
  },
  
  // Avatars et profils
  avatars: {
    marie: require('@/assets/images/avatar-marie.png'),
    default: require('@/assets/images/icon.png'),
  },
  
  // Catégories
  categories: {
    shoes: require('@/assets/images/category-shoes.png'),
    clothes: require('@/assets/images/category-clothes.png'),
  }
};

// Fonction utilitaire pour obtenir une image par défaut
export const getDefaultImage = (category?: string) => {
  switch (category?.toLowerCase()) {
    case 'chaussures':
    case 'shoes':
      return Images.shoes.nike;
    case 'audio':
    case 'électronique':
      return Images.audio.headphones;
    case 'vêtements':
    case 'clothing':
      return Images.clothing.jacket;
    case 'sport':
      return Images.sport.accessory;
    default:
      return Images.ui.defaultProduct;
  }
};

// Configuration des images pour différentes densités d'écran
export const getImageVariants = (baseName: string) => ({
  '1x': require(`@/assets/images/${baseName}.png`),
  '2x': require(`@/assets/images/${baseName}@2x.png`),
  '3x': require(`@/assets/images/${baseName}@3x.png`),
});

// Placeholder pour les images en cours de chargement
export const placeholderImage = Images.ui.defaultProduct;