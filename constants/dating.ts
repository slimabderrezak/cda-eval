export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: any[];
  location: string;
  distance: number;
  interests: string[];
  occupation: string;
  education?: string;
  height?: number;
  isOnline: boolean;
  lastSeen?: string;
  verified: boolean;
}

export interface Match {
  id: string;
  userId: string;
  matchedWith: string;
  timestamp: Date;
  isNewMatch: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'emoji';
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  messages: Message[];
  isActive: boolean;
}

// Images pour les profils - Toutes utilisent la même image cohérente
const avatarImage = require('@/assets/images/avatar-marie.png');

export const ProfileImages = {
  user1: avatarImage,
  user2: avatarImage, // Emma
  user3: avatarImage, // Lucas
  user4: avatarImage, // Sophie
  user5: avatarImage, // Antoine
  user6: avatarImage, // Camille
  currentUser: avatarImage, // Utilisateur actuel (Marie)
};

// Base de données des profils d'utilisateurs
export const profiles: UserProfile[] = [
  {
    id: '1',
    name: 'Emma',
    age: 26,
    bio: '🎨 Artiste passionnée | 🏃‍♀️ Running addict | 🍕 Food lover\nÀ la recherche d\'aventures et de beaux moments à partager !',
    photos: [ProfileImages.user2, ProfileImages.user2, ProfileImages.user2],
    location: 'Paris, France',
    distance: 2,
    interests: ['Art', 'Sport', 'Voyage', 'Cuisine', 'Photographie'],
    occupation: 'Designer Graphique',
    education: 'École des Beaux-Arts',
    height: 165,
    isOnline: true,
    verified: true,
  },
  {
    id: '2',
    name: 'Lucas',
    age: 29,
    bio: '💻 Développeur | 🎮 Gamer | 🎸 Musicien amateur\nToujours partant pour découvrir de nouveaux endroits !',
    photos: [ProfileImages.user3, ProfileImages.user3, ProfileImages.user3],
    location: 'Lyon, France',
    distance: 5,
    interests: ['Technologie', 'Musique', 'Gaming', 'Cinéma', 'Randonnée'],
    occupation: 'Ingénieur Logiciel',
    education: 'École d\'Ingénieurs',
    height: 180,
    isOnline: false,
    lastSeen: 'Il y a 2h',
    verified: true,
  },
  {
    id: '3',
    name: 'Sophie',
    age: 24,
    bio: '📚 Étudiante en médecine | 🧘‍♀️ Yoga enthusiast | 🌱 Végétarienne\nPassionnée par les discussions profondes et les couchers de soleil.',
    photos: [ProfileImages.user4, ProfileImages.user4, ProfileImages.user4],
    location: 'Marseille, France',
    distance: 8,
    interests: ['Médecine', 'Yoga', 'Nature', 'Lecture', 'Bien-être'],
    occupation: 'Étudiante',
    education: 'Faculté de Médecine',
    height: 170,
    isOnline: true,
    verified: false,
  },
  {
    id: '4',
    name: 'Antoine',
    age: 31,
    bio: '🏋️‍♂️ Coach sportif | 🌍 Voyageur | 📸 Photographe\nLa vie est une aventure, vivons-la ensemble !',
    photos: [ProfileImages.user5, ProfileImages.user5, ProfileImages.user5],
    location: 'Nice, France',
    distance: 12,
    interests: ['Sport', 'Voyage', 'Photographie', 'Nature', 'Aventure'],
    occupation: 'Coach Sportif',
    education: 'STAPS',
    height: 185,
    isOnline: false,
    lastSeen: 'Il y a 1 jour',
    verified: true,
  },
  {
    id: '5',
    name: 'Camille',
    age: 27,
    bio: '🎭 Actrice | 🍷 Œnologue amateur | 🎵 Mélomane\nJ\'adore les soirées entre amis et les discussions passionnantes.',
    photos: [ProfileImages.user6, ProfileImages.user6, ProfileImages.user6],
    location: 'Bordeaux, France',
    distance: 15,
    interests: ['Théâtre', 'Vin', 'Musique', 'Culture', 'Gastronomie'],
    occupation: 'Actrice',
    education: 'Conservatoire',
    height: 172,
    isOnline: true,
    verified: true,
  },
];

// Profil de l'utilisateur courant
export const currentUser: UserProfile = {
  id: 'current',
  name: 'Marie',
  age: 25,
  bio: '🌟 Développeuse passionnée | ☕ Coffee addict | 🎯 Toujours motivée\nÀ la recherche de quelqu\'un qui partage mes passions !',
  photos: [ProfileImages.currentUser, ProfileImages.currentUser, ProfileImages.currentUser],
  location: 'Paris, France',
  distance: 0,
  interests: ['Technologie', 'Café', 'Innovation', 'Sport', 'Voyage'],
  occupation: 'Développeuse Full-Stack',
  education: 'École d\'Ingénieurs',
  height: 168,
  isOnline: true,
  verified: true,
};

// Matches de l'utilisateur
export const matches: Match[] = [
  {
    id: '1',
    userId: 'current',
    matchedWith: '1',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2h
    isNewMatch: true,
  },
  {
    id: '2',
    userId: 'current',
    matchedWith: '2',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Il y a 1 jour
    isNewMatch: false,
  },
];

// Messages et conversations
export const conversations: Conversation[] = [
  {
    id: '1',
    participants: ['current', '1'],
    isActive: true,
    messages: [
      {
        id: '1',
        senderId: '1',
        receiverId: 'current',
        content: 'Salut ! Ton profil m\'a vraiment plu 😊',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
        type: 'text',
      },
      {
        id: '2',
        senderId: 'current',
        receiverId: '1',
        content: 'Merci beaucoup ! J\'adore tes créations artistiques 🎨',
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        isRead: true,
        type: 'text',
      },
      {
        id: '3',
        senderId: '1',
        receiverId: 'current',
        content: 'Ça te dit qu\'on en discute autour d\'un café ? ☕',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: false,
        type: 'text',
      },
    ],
    lastMessage: {
      id: '3',
      senderId: '1',
      receiverId: 'current',
      content: 'Ça te dit qu\'on en discute autour d\'un café ? ☕',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      type: 'text',
    },
  },
  {
    id: '2',
    participants: ['current', '2'],
    isActive: true,
    messages: [
      {
        id: '4',
        senderId: '2',
        receiverId: 'current',
        content: 'Hey ! On a matché ! 🎉',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isRead: true,
        type: 'text',
      },
    ],
    lastMessage: {
      id: '4',
      senderId: '2',
      receiverId: 'current',
      content: 'Hey ! On a matché ! 🎉',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      type: 'text',
    },
  },
];

// Fonction pour obtenir un profil par ID
export const getProfileById = (id: string): UserProfile | undefined => {
  if (id === 'current') return currentUser;
  return profiles.find(profile => profile.id === id);
};

// Fonction pour obtenir les conversations de l'utilisateur
export const getUserConversations = (userId: string = 'current'): Conversation[] => {
  return conversations.filter(conv => conv.participants.includes(userId));
};

// Fonction pour calculer l'âge à partir d'une date de naissance
export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  
  return age;
};