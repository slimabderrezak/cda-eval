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

export interface ProfileView {
  id: string;
  viewerId: string;
  viewedProfileId: string;
  timestamp: Date;
  isRead: boolean;
  viewerProfile: UserProfile;
}

export interface WhoViewedMe {
  views: ProfileView[];
  totalViews: number;
  newViews: number;
}

// Images pour les profils - Chaque avatar représente une personne unique et distincte
// Images d'avatar réelles + nouvelle image Gemini
const avatarGemini = require('@/assets/images/Gemini_Generated_Image_7vhmpa7vhmpa7vhm.png'); // Nouvelle image générée
const avatarEmma1 = require('@/assets/images/avatar-emma-1.png');
const avatarEmma2 = require('@/assets/images/avatar-emma-2.png'); 
const avatarEmma3 = require('@/assets/images/avatar-emma-3.png');
const avatarLucas1 = require('@/assets/images/avatar-lucas-1.png');
const avatarLucas2 = require('@/assets/images/avatar-lucas-2.png');
const avatarLucas3 = require('@/assets/images/avatar-lucas-3.png');
const avatarLucas4 = require('@/assets/images/avatar-lucas-4.png');
const avatarSophie1 = require('@/assets/images/avatar-sophie-1.png');
const avatarSophie2 = require('@/assets/images/avatar-sophie-2.png');
const avatarSophie3 = require('@/assets/images/avatar-sophie-3.png');
const avatarSophie4 = require('@/assets/images/avatar-sophie-4.png');
const avatarAntoine1 = require('@/assets/images/avatar-antoine-1.png');
const avatarAntoine2 = require('@/assets/images/avatar-antoine-2.png');
const avatarAntoine3 = require('@/assets/images/avatar-antoine-3.png');
const avatarAntoine4 = require('@/assets/images/avatar-antoine-4.png');
const avatarCamille1 = require('@/assets/images/avatar-camille-1.png');
const avatarCamille2 = require('@/assets/images/avatar-camille-2.png');
const avatarCamille3 = require('@/assets/images/avatar-camille-3.png');
const avatarCamille4 = require('@/assets/images/avatar-camille-4.png');
const avatarMarie1 = require('@/assets/images/avatar-marie.png');
const avatarMarie2 = require('@/assets/images/avatar-marie-2.png');
const avatarMarie3 = require('@/assets/images/avatar-marie-3.png');
const avatarJulien1 = require('@/assets/images/avatar-julien-1.png');
const avatarJulien2 = require('@/assets/images/avatar-julien-2.png');
const avatarJulien3 = require('@/assets/images/avatar-julien-3.png');
const avatarJulien4 = require('@/assets/images/avatar-julien-4.png');

export const ProfileImages = {
  // Emma - Jeune femme artiste de 26 ans, cheveux châtains, style bohème  
  emma1: avatarGemini, // Photo principale d'Emma (nouvelle image Gemini)
  emma2: avatarEmma2, // Emma en train de peindre
  emma3: avatarEmma3, // Emma en tenue de sport
  
  // Lucas - Homme de 29 ans, barbe soignée, style casual-chic
  lucas1: avatarLucas4, // Photo principale de Lucas (avatar-lucas-4.png)
  lucas2: avatarLucas2, // Lucas avec sa guitare
  lucas3: avatarLucas3, // Lucas en randonnée
  
  // Sophie - Jeune femme de 24 ans, blonde, look naturel et zen
  sophie1: avatarSophie4, // Photo principale de Sophie (avatar-sophie-4.png)
  sophie2: avatarSophie2, // Sophie en séance yoga
  sophie3: avatarSophie3, // Sophie en blouse médicale
  
  // Antoine - Homme sportif de 31 ans, musclé, sourire éclatant
  antoine1: avatarAntoine4, // Photo principale d'Antoine (avatar-antoine-4.png)
  antoine2: avatarAntoine2, // Antoine à la salle de sport
  antoine3: avatarAntoine3, // Antoine en voyage
  
  // Camille - Femme élégante de 27 ans, rousse, style sophistiqué
  camille1: avatarCamille4, // Photo principale de Camille (avatar-camille-4.png)
  camille2: avatarCamille2, // Camille sur scène
  camille3: avatarCamille3, // Camille en soirée chic
  
  // Marie - Utilisatrice actuelle: Femme de 25 ans, brune, développeuse moderne
  marie1: avatarMarie1, // Photo principale de Marie
  marie2: avatarMarie2, // Marie au travail (bureau/café)
  marie3: avatarMarie3, // Marie en sortie décontractée
  
  // Julien - Homme créatif de 28 ans, cheveux mi-longs, style artistique
  julien1: avatarJulien4, // Photo principale de Julien (avatar-julien-4.png)
  julien2: avatarJulien2, // Julien avec matériel de tournage
  julien3: avatarJulien3, // Julien à vélo dans la nature
};

// Base de données des profils d'utilisateurs
export const profiles: UserProfile[] = [
  {
    id: '1',
    name: 'Emma',
    age: 26,
    bio: '🎨 Artiste passionnée | 🏃‍♀️ Running addict | 🍕 Food lover\nÀ la recherche d\'aventures et de beaux moments à partager !',
    photos: [ProfileImages.emma1, ProfileImages.emma2, ProfileImages.emma3],
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
    photos: [ProfileImages.lucas1, ProfileImages.lucas2, ProfileImages.lucas3],
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
    photos: [ProfileImages.sophie1, ProfileImages.sophie2, ProfileImages.sophie3],
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
    photos: [ProfileImages.antoine1, ProfileImages.antoine2, ProfileImages.antoine3],
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
    photos: [ProfileImages.camille1, ProfileImages.camille2, ProfileImages.camille3],
    location: 'Bordeaux, France',
    distance: 15,
    interests: ['Théâtre', 'Vin', 'Musique', 'Culture', 'Gastronomie'],
    occupation: 'Actrice',
    education: 'Conservatoire',
    height: 172,
    isOnline: true,
    verified: true,
  },
  {
    id: '6',
    name: 'Julien',
    age: 28,
    bio: '🎬 Réalisateur | 🚴‍♂️ Cycliste passionné | ☕ Amateur de café\nÀ la recherche de nouvelles aventures créatives et romantiques !',
    photos: [ProfileImages.julien1, ProfileImages.julien2, ProfileImages.julien3],
    location: 'Toulouse, France',
    distance: 18,
    interests: ['Cinéma', 'Cyclisme', 'Café', 'Art', 'Nature'],
    occupation: 'Réalisateur',
    education: 'École de Cinéma',
    height: 177,
    isOnline: false,
    lastSeen: 'Il y a 3h',
    verified: true,
  },
];

// Profil de l'utilisateur courant
export const currentUser: UserProfile = {
  id: 'current',
  name: 'Marie',
  age: 25,
  bio: '🌟 Développeuse passionnée | ☕ Coffee addict | 🎯 Toujours motivée\nÀ la recherche de quelqu\'un qui partage mes passions !',
  photos: [ProfileImages.marie1, ProfileImages.marie2, ProfileImages.marie3],
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

// Données simulées pour "Qui m'a vu"
export const profileViews: ProfileView[] = [
  {
    id: '1',
    viewerId: '1',
    viewedProfileId: 'current',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2 heures
    isRead: false,
    viewerProfile: profiles[0], // Emma
  },
  {
    id: '2',
    viewerId: '2',
    viewedProfileId: 'current',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // Il y a 5 heures
    isRead: false,
    viewerProfile: profiles[1], // Lucas
  },
  {
    id: '3',
    viewerId: '3',
    viewedProfileId: 'current',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // Il y a 8 heures
    isRead: true,
    viewerProfile: profiles[2], // Sophie
  },
  {
    id: '4',
    viewerId: '4',
    viewedProfileId: 'current',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // Il y a 12 heures
    isRead: false,
    viewerProfile: profiles[3], // Antoine
  },
  {
    id: '5',
    viewerId: '5',
    viewedProfileId: 'current',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Il y a 1 jour
    isRead: true,
    viewerProfile: profiles[4], // Camille
  },
  {
    id: '6',
    viewerId: '6',
    viewedProfileId: 'current',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Il y a 2 jours
    isRead: true,
    viewerProfile: profiles[5], // Julien
  },
  {
    id: '7',
    viewerId: '7',
    viewedProfileId: 'current',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Il y a 3 jours
    isRead: false,
    viewerProfile: profiles[6], // Marie
  },
];

// Fonction pour obtenir qui a vu mon profil
export const getWhoViewedMe = (userId: string = 'current'): WhoViewedMe => {
  const views = profileViews
    .filter(view => view.viewedProfileId === userId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  
  const newViews = views.filter(view => !view.isRead).length;
  
  return {
    views,
    totalViews: views.length,
    newViews,
  };
};

// Fonction pour marquer les vues comme lues
export const markViewsAsRead = (viewIds: string[]) => {
  viewIds.forEach(id => {
    const view = profileViews.find(v => v.id === id);
    if (view) {
      view.isRead = true;
    }
  });
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