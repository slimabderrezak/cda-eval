import { getWhoViewedMe, markViewsAsRead, ProfileImages, ProfileView } from '@/constants/dating';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Fonction pour obtenir l'image d'un profil par son ID
const getProfileImage = (profileId: string) => {
  const imageMap: { [key: string]: any } = {
    '1': ProfileImages.emma1,
    '2': ProfileImages.lucas1,
    '3': ProfileImages.sophie1,
    '4': ProfileImages.antoine1,
    '5': ProfileImages.camille1,
    '6': ProfileImages.julien1,
    '7': ProfileImages.marie1,
  };
  
  return imageMap[profileId] || ProfileImages.emma1;
};

export default function WhoViewedMeScreen() {
  const [whoViewedData, setWhoViewedData] = useState(() => getWhoViewedMe());
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

  useEffect(() => {
    // Marquer toutes les nouvelles vues comme lues après 2 secondes
    const timer = setTimeout(() => {
      const unreadViews = whoViewedData.views
        .filter(view => !view.isRead)
        .map(view => view.id);
      
      if (unreadViews.length > 0) {
        markViewsAsRead(unreadViews);
        setWhoViewedData(getWhoViewedMe());
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const formatTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
      return `Il y a ${diffInMinutes}min`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Il y a ${diffInDays}j`;
    }
  };

  const handleProfilePress = (profile: ProfileView) => {
    // Naviguer vers le profil détaillé ou permettre une action
    Alert.alert(
      `${profile.viewerProfile.name} 💕`,
      `${profile.viewerProfile.name}, ${profile.viewerProfile.age} ans\n📍 ${profile.viewerProfile.location}\n💼 ${profile.viewerProfile.occupation}\n\n${profile.viewerProfile.bio}`,
      [
        { text: 'Passer', style: 'cancel' },
        { text: '💕 Liker', onPress: () => handleLike(profile) },
        { text: '👀 Voir profil', onPress: () => handleViewProfile(profile) },
      ]
    );
  };

  const handleLike = (profile: ProfileView) => {
    // Simulation de match (50% de chances)
    const isMatch = Math.random() > 0.5;
    
    if (isMatch) {
      Alert.alert(
        'C\'est un MATCH ! 🎉💕',
        `${profile.viewerProfile.name} vous a aussi liké ! Vous pouvez maintenant vous envoyer des messages.`,
        [
          { text: 'Super !', style: 'default' },
          { text: '💬 Envoyer un message', onPress: () => handleSendMessage(profile) },
        ]
      );
    } else {
      Alert.alert(
        'Like envoyé ! 💕',
        `Votre like a été envoyé à ${profile.viewerProfile.name}. Si cette personne vous like aussi, vous recevrez une notification de match !`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const handleViewProfile = (profile: ProfileView) => {
    // Ici on pourrait naviguer vers un écran de profil détaillé
    Alert.alert('Profil', `Voir le profil complet de ${profile.viewerProfile.name}`);
  };

  const handleSendMessage = (profile: ProfileView) => {
    // Simulation d'ouverture de la messagerie
    Alert.alert(
      `💬 Message à ${profile.viewerProfile.name}`,
      'Cette fonctionnalité ouvrira la conversation dans la messagerie !',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: '📱 Ouvrir Chat', onPress: () => console.log('Ouverture du chat avec', profile.viewerProfile.name) },
      ]
    );
  };

  const toggleProfileSelection = (profileId: string) => {
    if (selectedProfiles.includes(profileId)) {
      setSelectedProfiles(prev => prev.filter(id => id !== profileId));
    } else {
      setSelectedProfiles(prev => [...prev, profileId]);
    }
  };

  const handleMultipleLikes = () => {
    if (selectedProfiles.length === 0) return;
    
    Alert.alert(
      'Super Like ! 💫',
      `Vous allez liker ${selectedProfiles.length} profil${selectedProfiles.length > 1 ? 's' : ''} !`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Confirmer', 
          onPress: () => {
            // Simulation de matches multiples
            const matchCount = Math.floor(Math.random() * selectedProfiles.length) + 1;
            
            if (matchCount > 0) {
              Alert.alert(
                '🎉 Incroyable !', 
                `${selectedProfiles.length} like${selectedProfiles.length > 1 ? 's' : ''} envoyé${selectedProfiles.length > 1 ? 's' : ''} !\n\n🔥 ${matchCount} nouveau${matchCount > 1 ? 'x' : ''} match${matchCount > 1 ? 's' : ''} !`,
                [{ text: 'Fantastique ! 🚀', style: 'default' }]
              );
            } else {
              Alert.alert('Envoyé ! 🚀', `${selectedProfiles.length} like${selectedProfiles.length > 1 ? 's' : ''} envoyé${selectedProfiles.length > 1 ? 's' : ''} !`);
            }
            setSelectedProfiles([]);
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF0F1" />
      
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Qui m'a vu 👀</Text>
          <Text style={styles.headerSubtitle}>
            {whoViewedData.totalViews} vue{whoViewedData.totalViews > 1 ? 's' : ''}
            {whoViewedData.newViews > 0 && (
              <Text style={styles.newBadge}> • {whoViewedData.newViews} nouvelle{whoViewedData.newViews > 1 ? 's' : ''}</Text>
            )}
          </Text>
        </View>

        {selectedProfiles.length > 0 && (
          <TouchableOpacity style={styles.multiLikeButton} onPress={handleMultipleLikes}>
            <Text style={styles.multiLikeText}>💫 {selectedProfiles.length}</Text>
          </TouchableOpacity>
        )}
      </View>

      {whoViewedData.views.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>👀</Text>
          <Text style={styles.emptyTitle}>Personne n'a encore vu votre profil</Text>
          <Text style={styles.emptySubtitle}>
            Continuez à swiper pour augmenter votre visibilité !
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.profilesList}>
            {whoViewedData.views.map((view) => {
              const isSelected = selectedProfiles.includes(view.id);
              const isNew = !view.isRead;
              
              return (
                <TouchableOpacity
                  key={view.id}
                  style={[
                    styles.profileCard,
                    isNew && styles.newProfileCard,
                    isSelected && styles.selectedProfileCard,
                  ]}
                  onPress={() => handleProfilePress(view)}
                  onLongPress={() => toggleProfileSelection(view.id)}
                >
                  {isNew && <View style={styles.newIndicator} />}
                  
                  <View style={styles.profileImageContainer}>
                    <Image 
                      source={getProfileImage(view.viewerProfile.id)} 
                      style={styles.profileImage}
                      resizeMode="cover"
                    />
                    {isSelected && (
                      <View style={styles.selectionOverlay}>
                        <Text style={styles.selectionCheck}>✓</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.profileInfo}>
                    <View style={styles.profileHeader}>
                      <Text style={styles.profileName}>{view.viewerProfile.name}</Text>
                      <Text style={styles.profileAge}>{view.viewerProfile.age}</Text>
                    </View>
                    
                    <Text style={styles.profileLocation}>📍 {view.viewerProfile.location}</Text>
                    <Text style={styles.profileOccupation}>💼 {view.viewerProfile.occupation}</Text>
                    
                    <View style={styles.profileFooter}>
                      <Text style={styles.timeAgo}>{formatTimeAgo(view.timestamp)}</Text>
                      {view.viewerProfile.isOnline && (
                        <View style={styles.onlineBadge}>
                          <Text style={styles.onlineText}>🟢 En ligne</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.likeButton}
                    onPress={() => handleLike(view)}
                  >
                    <Text style={styles.likeButtonText}>💕</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              💡 Astuce : Appuyez longuement pour sélectionner plusieurs profils !
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF0F1',
    borderBottomWidth: 1,
    borderBottomColor: '#FFB3B8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FF8A95',
    marginTop: 2,
  },
  newBadge: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  multiLikeButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  multiLikeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  profilesList: {
    padding: 20,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  newProfileCard: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF8F8',
  },
  selectedProfileCard: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF0F1',
    transform: [{ scale: 0.98 }],
  },
  newIndicator: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 12,
    height: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 6,
    zIndex: 1,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 107, 107, 0.8)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionCheck: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileAge: {
    fontSize: 18,
    color: '#666',
    marginLeft: 8,
  },
  profileLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  profileOccupation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeAgo: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  onlineBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  onlineText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  likeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0F1',
    borderWidth: 2,
    borderColor: '#FFB3B8',
  },
  likeButtonText: {
    fontSize: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#FF8A95',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#FF8A95',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});