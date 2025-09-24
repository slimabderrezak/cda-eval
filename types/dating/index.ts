/**
 * 💕 TYPES POUR L'APPLICATION DE RENCONTRES
 */

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  occupation: string;
  photos: string[];
  interests: string[];
  lookingFor: 'serious' | 'casual' | 'friends' | 'all';
  verified: boolean;
  premium: boolean;
  lastActive: Date;
  distance?: number;
}

export interface Match {
  id: string;
  profiles: [string, string]; // IDs des deux profils
  timestamp: Date;
  chatId?: string;
  status: 'new' | 'chatting' | 'expired';
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'image' | 'gif';
}

export interface SwipeAction {
  profileId: string;
  action: 'like' | 'pass' | 'superlike';
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface Filter {
  ageRange: { min: number; max: number };
  maxDistance: number;
  interests: string[];
  lookingFor?: UserProfile['lookingFor'];
  verified?: boolean;
  premium?: boolean;
}