/**
 * 🎨 STYLES POUR LES COMPOSANTS DE RENCONTRE
 * Équivalent des styles CSS du projet météo
 */

import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// 💕 STYLES POUR CARTES DE PROFIL
export const profileStyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
});

// 🎯 STYLES POUR BOUTONS D'ACTION
export const actionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingVertical: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  likeButton: {
    backgroundColor: '#FF1493',
  },
  passButton: {
    backgroundColor: '#FF6B6B',
  },
  superLikeButton: {
    backgroundColor: '#4CAF50',
  },
});

// 💖 STYLES POUR MATCHES
export const matchStyles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(255, 20, 147, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: screenWidth * 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
});

// 🎨 STYLES GÉNÉRAUX
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E6',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF0F1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF1493',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 5,
  },
});