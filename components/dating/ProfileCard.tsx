import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 💕 COMPOSANT CARTE DE PROFIL
 * Équivalent des composants météo
 */

interface ProfileCardProps {
  name: string;
  age: number;
  bio: string;
  onLike: () => void;
  onPass: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  age,
  bio,
  onLike,
  onPass
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}, {age}</Text>
      </View>
      
      <Text style={styles.bio}>{bio}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.passButton} onPress={onPass}>
          <Text style={styles.buttonText}>❌ Pass</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.likeButton} onPress={onLike}>
          <Text style={styles.buttonText}>💖 Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    margin: 10,
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  bio: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 15,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  passButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  likeButton: {
    backgroundColor: '#FF1493',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});