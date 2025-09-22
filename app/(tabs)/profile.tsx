import { currentUser, matches } from '@/constants/dating';
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

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  colorScheme: 'light' | 'dark';
  onPress?: () => void;
}

const MenuItem = ({ icon, title, subtitle, colorScheme, onPress }: MenuItemProps) => (
  <TouchableOpacity 
    style={[styles.menuItem, { backgroundColor: Colors[colorScheme].card }]}
    onPress={onPress}
  >
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuContent}>
      <Text style={[styles.menuTitle, { color: Colors[colorScheme].text }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.menuSubtitle, { color: Colors[colorScheme].icon }]}>
          {subtitle}
        </Text>
      )}
    </View>
    <Text style={[styles.chevron, { color: Colors[colorScheme].icon }]}>›</Text>
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  const handlePhotoPress = (photo: any) => {
    setSelectedPhoto(photo);
    setPhotoModalVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Profile */}
        <View style={[styles.profileHeader, { backgroundColor: Colors[colorScheme].primary }]}>
          <TouchableOpacity onPress={() => handlePhotoPress(currentUser.photos[0])}>
            <Image 
              source={currentUser.photos[0]} 
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.userName}>{currentUser.name}, {currentUser.age}</Text>
          <Text style={styles.userOccupation}>{currentUser.occupation}</Text>
          <Text style={styles.userLocation}>📍 {currentUser.location}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        {/* Bio Section */}
        <View style={[styles.bioSection, { backgroundColor: Colors[colorScheme].card }]}>
          <Text style={[styles.bioTitle, { color: Colors[colorScheme].text }]}>
            À propos de moi
          </Text>
          <Text style={[styles.bioText, { color: Colors[colorScheme].text }]}>
            {currentUser.bio}
          </Text>
        </View>

        {/* Photos Gallery */}
        <View style={styles.photosSection}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
            Mes photos ({currentUser.photos.length})
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {currentUser.photos.map((photo, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => handlePhotoPress(photo)}
                style={styles.photoItem}
              >
                <Image source={photo} style={styles.photoImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Interests */}
        <View style={[styles.interestsSection, { backgroundColor: Colors[colorScheme].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
            Centres d'intérêt
          </Text>
          <View style={styles.interestsTags}>
            {currentUser.interests.map((interest, index) => (
              <View key={index} style={[styles.interestTag, { backgroundColor: Colors[colorScheme].primary + '20' }]}>
                <Text style={[styles.interestText, { color: Colors[colorScheme].primary }]}>
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme].card }]}>
            <Text style={[styles.statNumber, { color: Colors[colorScheme].primary }]}>
              {matches.length}
            </Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme].icon }]}>Matchs</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme].card }]}>
            <Text style={[styles.statNumber, { color: Colors[colorScheme].primary }]}>42</Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme].icon }]}>Likes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme].card }]}>
            <Text style={[styles.statNumber, { color: Colors[colorScheme].primary }]}>128</Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme].icon }]}>Vues</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
            Mon profil
          </Text>
          
          <MenuItem
            icon="�"
            title="Mes matchs"
            subtitle={`${matches.length} nouveaux matchs`}
            colorScheme={colorScheme}
          />
          
          <MenuItem
            icon="👁️"
            title="Qui m'a vu"
            subtitle="Découvrir les visiteurs"
            colorScheme={colorScheme}
          />
          
          <MenuItem
            icon="⚡"
            title="Boost mon profil"
            subtitle="Être plus visible"
            colorScheme={colorScheme}
          />
        </View>

        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
            Préférences de recherche
          </Text>
          
          <MenuItem
            icon="🎯"
            title="Critères de recherche"
            subtitle="Âge, distance, etc."
            colorScheme={colorScheme}
          />
          
          <MenuItem
            icon="🔔"
            title="Notifications"
            subtitle="Messages et matchs"
            colorScheme={colorScheme}
          />
          
          <MenuItem
            icon="🔒"
            title="Confidentialité"
            subtitle="Contrôle de visibilité"
            colorScheme={colorScheme}
          />
          
          <MenuItem
            icon="🛡️"
            title="Sécurité"
            subtitle="Sécurité et données"
            colorScheme={colorScheme}
          />
          
          <MenuItem
            icon="📞"
            title="Support"
            subtitle="Aide et contact"
            colorScheme={colorScheme}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: Colors[colorScheme].accent }]}>
          <Text style={[styles.logoutText, { color: Colors[colorScheme].primary }]}>
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Photo Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={photoModalVisible}
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <View style={styles.photoModalOverlay}>
          <TouchableOpacity 
            style={styles.photoModalClose}
            onPress={() => setPhotoModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          {selectedPhoto && (
            <Image source={selectedPhoto} style={styles.photoModalImage} />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userOccupation: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
    marginBottom: 4,
    fontWeight: '600',
  },
  userLocation: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FF4757',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuIcon: {
    fontSize: 24,
    width: 40,
  },
  menuContent: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
  },
  logoutButton: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // New styles for dating app
  bioSection: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
  photosSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  photoItem: {
    marginRight: 12,
  },
  photoImage: {
    width: 100,
    height: 120,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  interestsSection: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
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
    fontWeight: '600',
  },
  // Photo modal styles
  photoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoModalClose: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  photoModalImage: {
    width: width - 40,
    height: width - 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
});