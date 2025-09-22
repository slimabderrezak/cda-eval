export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews?: number;
  description?: string;
  category: string;
  image: any;
  images?: any[];
  colors?: string[];
  sizes?: string[];
  features?: string[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  image?: any;
}

// Images des produits
export const ProductImages = {
  sneakerNike: require('@/assets/images/sneaker-nike.png'),
  sneakerAdidas: require('@/assets/images/sneaker-adidas.png'),
  casqueAudio: require('@/assets/images/casque-audio.png'),
  vetementMode: require('@/assets/images/vetement-mode.png'),
  sportAccessoire: require('@/assets/images/sport-accessoire.png'),
  avatar: require('@/assets/images/avatar-marie.png'),
};

// Catégories de produits
export const categories: Category[] = [
  { 
    id: 1, 
    name: 'Chaussures', 
    icon: '👟', 
    color: '#FF6B7D',
    image: ProductImages.sneakerNike
  },
  { 
    id: 2, 
    name: 'Audio', 
    icon: '🎧', 
    color: '#4ECDC4',
    image: ProductImages.casqueAudio
  },
  { 
    id: 3, 
    name: 'Vêtements', 
    icon: '👕', 
    color: '#45B7D1',
    image: ProductImages.vetementMode
  },
  { 
    id: 4, 
    name: 'Sport', 
    icon: '⚽', 
    color: '#96CEB4',
    image: ProductImages.sportAccessoire
  },
];

// Base de données des produits
export const products: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max Premium',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 128,
    description: 'Une chaussure premium avec une technologie Air Max révolutionnaire pour un confort exceptionnel. Parfaite pour le sport et le style urbain.',
    category: 'Chaussures',
    image: ProductImages.sneakerNike,
    images: [ProductImages.sneakerNike, ProductImages.sneakerAdidas, ProductImages.sportAccessoire],
    colors: ['#FF4757', '#3742FA', '#2F3542', '#FFFFFF'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    features: ['Technologie Air Max', 'Semelle en mousse', 'Design moderne', 'Respirant'],
  },
  {
    id: 2,
    name: 'Adidas UltraBoost',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.3,
    reviews: 89,
    description: 'Chaussure de course haute performance avec technologie Boost pour un retour d\'énergie optimal.',
    category: 'Chaussures',
    image: ProductImages.sneakerAdidas,
    images: [ProductImages.sneakerAdidas, ProductImages.sneakerNike, ProductImages.sportAccessoire],
    colors: ['#000000', '#FFFFFF', '#FF4757', '#45B7D1'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    features: ['Technologie Boost', 'Tige Primeknit', 'Semelle Continental', 'Respirant'],
  },
  {
    id: 3,
    name: 'Casque Audio Premium',
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.1,
    reviews: 156,
    description: 'Casque audio sans fil avec réduction de bruit active et autonomie de 30 heures.',
    category: 'Audio',
    image: ProductImages.casqueAudio,
    images: [ProductImages.casqueAudio, ProductImages.vetementMode, ProductImages.sportAccessoire],
    colors: ['#000000', '#FFFFFF', '#FF4757'],
    features: ['Réduction de bruit', 'Sans fil Bluetooth 5.0', 'Autonomie 30h', 'Micro intégré'],
  },
  {
    id: 4,
    name: 'Veste Trendy Mode',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.4,
    reviews: 203,
    description: 'Veste moderne et élégante, parfaite pour toutes les occasions. Coupe ajustée et matériaux premium.',
    category: 'Vêtements',
    image: ProductImages.vetementMode,
    images: [ProductImages.vetementMode, ProductImages.casqueAudio, ProductImages.sneakerNike],
    colors: ['#2F3542', '#FF4757', '#45B7D1', '#96CEB4'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['Coupe ajustée', 'Matériau premium', 'Respirant', 'Facile d\'entretien'],
  },
  {
    id: 5,
    name: 'Accessoire Sport Pro',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.2,
    reviews: 87,
    description: 'Accessoire de sport polyvalent pour tous vos entraînements. Design ergonomique et durable.',
    category: 'Sport',
    image: ProductImages.sportAccessoire,
    images: [ProductImages.sportAccessoire, ProductImages.sneakerNike, ProductImages.casqueAudio],
    colors: ['#FF4757', '#000000', '#45B7D1'],
    features: ['Design ergonomique', 'Matériau durable', 'Polyvalent', 'Facile à transporter'],
  },
];

// Produits mis en avant
export const featuredProducts = products.slice(0, 3);

// Produits populaires
export const popularProducts = products.filter(p => p.rating >= 4.3);