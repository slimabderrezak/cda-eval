/**
 * 📋 TYPES TYPESCRIPT POUR L'APPLICATION DE RENCONTRES
 * Équivalent des types du projet météo
 */

// 👤 TYPES UTILISATEUR ET PROFIL
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  occupation: string;
  photos: string[];
  interests: string[];
  verified: boolean;
  premium: boolean;
  lastActive: Date;
  settings: UserSettings;
}

export interface UserSettings {
  ageRange: { min: number; max: number };
  maxDistance: number;
  lookingFor: 'serious' | 'casual' | 'friends' | 'all';
  showMe: 'men' | 'women' | 'everyone';
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  newMatches: boolean;
  messages: boolean;
  likes: boolean;
  superLikes: boolean;
}

// 💖 TYPES MATCH ET INTERACTIONS
export interface Match {
  id: string;
  profiles: [string, string];
  timestamp: Date;
  compatibility: number;
  chatId?: string;
  status: 'new' | 'chatting' | 'expired' | 'blocked';
}

export interface SwipeAction {
  id: string;
  profileId: string;
  action: 'like' | 'pass' | 'superlike';
  timestamp: Date;
}

export interface Like {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: 'regular' | 'super';
  timestamp: Date;
  seen: boolean;
}

// 💬 TYPES MESSAGES ET CHAT
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'image' | 'gif' | 'sticker';
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  imageUrl?: string;
  gifUrl?: string;
  stickerId?: string;
  replyTo?: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// 🔍 TYPES FILTRES ET RECHERCHE
export interface SearchFilters {
  ageRange: { min: number; max: number };
  maxDistance: number;
  interests: string[];
  occupation: string[];
  lookingFor?: UserProfile['settings']['lookingFor'];
  verified?: boolean;
  premium?: boolean;
  hasPhotos?: boolean;
}

export interface DiscoverySettings {
  showMeFirst: boolean;
  boostActive: boolean;
  invisibleMode: boolean;
  readReceipts: boolean;
}

// 🎯 TYPES NAVIGATION ET UI
export interface TabScreenParams {
  Discovery: undefined;
  Matches: undefined;
  Messages: { chatId?: string };
  Profile: { userId?: string };
  Settings: undefined;
}

export interface ModalParams {
  ProfileDetail: { profileId: string };
  Chat: { chatId: string };
  EditProfile: undefined;
  Filters: undefined;
  Premium: undefined;
}

// 🏷️ TYPES ÉNUMÉRATIONS
export type RelationshipType = 'serious' | 'casual' | 'friends' | 'all';
export type GenderPreference = 'men' | 'women' | 'everyone';
export type SwipeActionType = 'like' | 'pass' | 'superlike';
export type MessageType = 'text' | 'image' | 'gif' | 'sticker';
export type MatchStatus = 'new' | 'chatting' | 'expired' | 'blocked';
export type UserStatus = 'online' | 'recently_active' | 'offline';

// 📊 TYPES ANALYTICS ET STATS
export interface UserStats {
  totalSwipes: number;
  totalMatches: number;
  totalMessages: number;
  profileViews: number;
  likesReceived: number;
  superLikesReceived: number;
  responseRate: number;
}

export interface AppAnalytics {
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  averageSessionTime: number;
  matchRate: number;
  messageRate: number;
}