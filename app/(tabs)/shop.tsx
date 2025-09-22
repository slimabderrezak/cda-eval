import { profiles, UserProfile } from '@/constants/dating';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

interface ProfileCardProps {
  profile: UserProfile;
  colorScheme: 'light' | 'dark';
  onPress: () => void;
}

const ProfileCard = ({ profile, colorScheme, onPress }: ProfileCardProps) => (
  <TouchableOpacity 
    style={[styles.profileCard, { backgroundColor: Colors[colorScheme].card }]}
    onPress={onPress}
  >
    <Image source={profile.photos[0]} style={styles.profileImage} />
    <View style={styles.profileInfo}>
      <Text style={[styles.profileName, { color: Colors[colorScheme].text }]}>
        {profile.name}, {profile.age}
      </Text>
      <Text style={[styles.profileLocation, { color: Colors[colorScheme].icon }]}>
        📍 {profile.location}
      </Text>
      <Text style={[styles.profileInterests, { color: Colors[colorScheme].icon }]} numberOfLines={1}>
        {profile.interests.slice(0, 3).join(' • ')}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function DiscoverScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Exclure le profil actuel (ID "1")
  const availableProfiles = profiles.filter(p => p.id !== "1");

  const handleProfilePress = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
            Découvrir
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme].icon }]}>
            Trouvez votre match parfait
          </Text>
        </View>

        {/* Bannière motivationnelle */}
        <TouchableOpacity style={[styles.promoBanner, { backgroundColor: Colors[colorScheme].primary }]}>
          <Text style={styles.promoText}>� NOUVEAUX PROFILS</Text>
          <Text style={styles.promoSubtext}>{availableProfiles.length} personnes vous attendent</Text>
        </TouchableOpacity>

        {/* Grille de profils */}
        <View style={styles.profilesContainer}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
            Profils recommandés
          </Text>
          <View style={styles.profilesGrid}>
            {availableProfiles.map((profile) => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                colorScheme={colorScheme}
                onPress={() => handleProfilePress(profile)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal de détails du profil */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: Colors[colorScheme].background }]}>
            {selectedProfile && (
              <>
                <Image source={selectedProfile.photos[0]} style={styles.modalImage} />
                <ScrollView style={styles.modalDetails}>
                  <Text style={[styles.modalName, { color: Colors[colorScheme].text }]}>
                    {selectedProfile.name}, {selectedProfile.age}
                  </Text>
                  <Text style={[styles.modalOccupation, { color: Colors[colorScheme].icon }]}>
                    {selectedProfile.occupation}
                  </Text>
                  <Text style={[styles.modalLocation, { color: Colors[colorScheme].icon }]}>
                    📍 {selectedProfile.location}
                  </Text>
                  <Text style={[styles.modalBio, { color: Colors[colorScheme].text }]}>
                    {selectedProfile.bio}
                  </Text>
                  <View style={styles.interestsContainer}>
                    <Text style={[styles.interestsTitle, { color: Colors[colorScheme].text }]}>
                      Centres d'intérêt
                    </Text>
                    <View style={styles.interestsTags}>
                      {selectedProfile.interests.map((interest, index) => (
                        <View key={index} style={[styles.interestTag, { backgroundColor: Colors[colorScheme].primary + '20' }]}>
                          <Text style={[styles.interestText, { color: Colors[colorScheme].primary }]}>
                            {interest}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </ScrollView>
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.modalCloseButton} 
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalCloseText}>Fermer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalLikeButton, { backgroundColor: Colors[colorScheme].primary }]}>
                    <Text style={styles.modalLikeText}>💕 J'aime</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  promoBanner: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  promoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  promoSubtext: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
  },
  profilesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  profileCard: {
    width: cardWidth,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  profileImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  profileInfo: {
    padding: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    marginBottom: 6,
  },
  profileInterests: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  modalDetails: {
    padding: 20,
    maxHeight: 250,
  },
  modalName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modalOccupation: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalLocation: {
    fontSize: 16,
    marginBottom: 12,
  },
  modalBio: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  interestsContainer: {
    marginBottom: 10,
  },
  interestsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  interestsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  modalCloseButton: {
    flex: 1,
    backgroundColor: '#FFE4E6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  modalLikeButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalLikeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});