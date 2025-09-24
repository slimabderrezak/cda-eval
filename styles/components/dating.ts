/**
 * 🎨 STYLES POUR LES COMPOSANTS DE RENCONTRE
 */

import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const datingStyles = StyleSheet.create({
  // 📱 CARTE DE PROFIL
  profileCard: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },

  profileImage: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  profileInfo: {
    padding: 20,
    height: '30%',
    justifyContent: 'space-between',
  },

  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },

  profileBio: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },

  // 👆 BOUTONS D'ACTION
  actionButtons: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },

  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  passButton: {
    backgroundColor: '#FF6B6B',
  },

  likeButton: {
    backgroundColor: '#4ECDC4',
  },

  superLikeButton: {
    backgroundColor: '#45B7D1',
  },

  // 💖 MATCH MODAL
  matchModal: {
    flex: 1,
    backgroundColor: 'rgba(255, 20, 147, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  matchContent: {
    alignItems: 'center',
    padding: 40,
  },

  matchTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },

  matchProfiles: {
    flexDirection: 'row',
    marginVertical: 30,
    gap: 20,
  },

  matchProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },

  // 🏷️ BADGES
  verifiedBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#4ECDC4',
    borderRadius: 15,
    padding: 8,
  },

  premiumBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    padding: 8,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default datingStyles;