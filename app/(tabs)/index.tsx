import { profiles, UserProfile } from '@/constants/dating';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ProfileCardProps {
  profile: UserProfile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSwipeLeft, onSwipeRight }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    if (currentImageIndex < profile.photos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 120) {
          onSwipeRight();
        } else if (gestureState.dx < -120) {
          onSwipeLeft();
        }
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.card, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.imageContainer}>
        <TouchableOpacity 
          style={[styles.imageSection, styles.leftSection]} 
          onPress={prevImage}
          activeOpacity={1}
        />
        <TouchableOpacity 
          style={[styles.imageSection, styles.rightSection]} 
          onPress={nextImage}
          activeOpacity={1}
        />
        <Image source={profile.photos[currentImageIndex]} style={styles.image} />
        
        <View style={styles.imageIndicators}>
          {profile.photos.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { backgroundColor: index === currentImageIndex ? '#fff' : 'rgba(255,255,255,0.4)' }
              ]}
            />
          ))}
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
          <Text style={styles.profileBio}>{profile.bio}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const handleLike = () => {
    console.log('Liked!');
  };

  const handlePass = () => {
    console.log('Passed!');
  };

  const profileToShow = profiles[5];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>yoo</Text>
            <Text style={styles.logoHeart}>💕</Text>
            <Text style={styles.logoText}>e</Text>
          </View>
          <Text style={styles.tagline}>L'amour à portée de clic</Text>
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ProfileCard 
          profile={profileToShow}
          onSwipeLeft={handlePass}
          onSwipeRight={handleLike}
        />
        <Text style={{color: '#FF6B6B', fontSize: 16, marginTop: 20, fontWeight: 'bold'}}>
          🎬 {profileToShow.name} - {profileToShow.occupation}
        </Text>
        <Text style={{color: '#666', fontSize: 12, marginTop: 5}}>
          📍 {profileToShow.location} • {profileToShow.distance}km
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E6',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
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
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  logoHeart: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#FF8A95',
    fontStyle: 'italic',
  },
  card: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.65,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  imageSection: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
    zIndex: 2,
  },
  leftSection: {
    left: 0,
  },
  rightSection: {
    right: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  indicator: {
    width: 30,
    height: 3,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  profileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
});
