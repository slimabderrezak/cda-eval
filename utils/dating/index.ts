/**
 * 💖 UTILITAIRES POUR LES FONCTIONNALITÉS DE RENCONTRE
 */

import { UserProfile } from '../../types/dating';

/**
 * 🧮 Calcule la compatibilité entre deux profils
 */
export const calculateCompatibility = (profile1: UserProfile, profile2: UserProfile): number => {
  let compatibility = 0;
  
  // Intérêts communs (40% du score)
  const commonInterests = profile1.interests.filter(interest => 
    profile2.interests.includes(interest)
  );
  compatibility += (commonInterests.length / Math.max(profile1.interests.length, profile2.interests.length)) * 40;
  
  // Différence d'âge (30% du score)
  const ageDiff = Math.abs(profile1.age - profile2.age);
  const ageScore = Math.max(0, 30 - ageDiff * 2);
  compatibility += ageScore;
  
  // Même lieu (20% du score)
  if (profile1.location === profile2.location) {
    compatibility += 20;
  }
  
  // Statut vérifié (10% du score)
  if (profile1.verified && profile2.verified) {
    compatibility += 10;
  }
  
  return Math.min(100, compatibility);
};

/**
 * 📍 Calcule la distance entre deux positions (simulation)
 */
export const calculateDistance = (location1: string, location2: string): number => {
  // Simulation simple - dans une vraie app, utiliser la géolocalisation
  const distances: Record<string, Record<string, number>> = {
    'Paris': { 'Lyon': 460, 'Marseille': 770, 'Toulouse': 680 },
    'Lyon': { 'Paris': 460, 'Marseille': 320, 'Toulouse': 540 },
    'Marseille': { 'Paris': 770, 'Lyon': 320, 'Toulouse': 400 },
    'Toulouse': { 'Paris': 680, 'Lyon': 540, 'Marseille': 400 }
  };
  
  return distances[location1]?.[location2] || Math.floor(Math.random() * 50) + 1;
};

/**
 * 🔍 Filtre les profils selon les critères
 */
export const filterProfiles = (
  profiles: UserProfile[],
  filters: {
    ageRange?: { min: number; max: number };
    maxDistance?: number;
    interests?: string[];
    lookingFor?: string;
    verified?: boolean;
  }
): UserProfile[] => {
  return profiles.filter(profile => {
    // Filtre par âge
    if (filters.ageRange) {
      if (profile.age < filters.ageRange.min || profile.age > filters.ageRange.max) {
        return false;
      }
    }
    
    // Filtre par distance
    if (filters.maxDistance && profile.distance && profile.distance > filters.maxDistance) {
      return false;
    }
    
    // Filtre par intérêts
    if (filters.interests && filters.interests.length > 0) {
      const hasCommonInterest = filters.interests.some(interest => 
        profile.interests.includes(interest)
      );
      if (!hasCommonInterest) return false;
    }
    
    // Filtre par type de relation
    if (filters.lookingFor && profile.lookingFor !== filters.lookingFor && profile.lookingFor !== 'all') {
      return false;
    }
    
    // Filtre par vérification
    if (filters.verified && !profile.verified) {
      return false;
    }
    
    return true;
  });
};