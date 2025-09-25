import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, Text, View } from 'react-native';

/**
 * 💫 CARTE DE PROFIL ANIMÉE COMME LA PHOTO D'EMMA
 * Avec bordure gradient animée, badges flottants, et effets visuels
 */

const { width: screenWidth } = Dimensions.get('window');

interface AnimatedProfileCardProps {
  profile: {
    name: string;
    age: number;
    photo: string;
    tags: string[];
    bio: string;
  };
}

export const AnimatedProfileCard: React.FC<AnimatedProfileCardProps> = ({ profile }) => {
  // 🎭 ANIMATIONS
  const borderPulse = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 💫 Animation de bordure pulsante
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderPulse, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false
        }),
        Animated.timing(borderPulse, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false
        })
      ])
    ).start();

    // ✨ Animation de scintillement du texte
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();

    // 🌟 Animation flottante des badges
    Animated.loop(
      Animated.timing(floatAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      })
    ).start();
  }, []);

  // 🎨 STYLES ANIMÉS
  const animatedBorderStyle = {
    borderColor: borderPulse.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['#FF1493', '#FF69B4', '#FF1493']
    }),
    shadowColor: borderPulse.interpolate({
      inputRange: [0, 1],
      outputRange: ['#FF1493', '#FF69B4']
    }),
    shadowOpacity: borderPulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.8]
    })
  };

  const shimmerStyle = {
    opacity: shimmerAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1]
    })
  };

  const floatingStyle = {
    transform: [{
      translateY: floatAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -8, 0]
      })
    }]
  };

  return (
    <Animated.View style={[styles.container, animatedBorderStyle]}>
      {/* 📸 Image de profil */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: profile.photo }} style={styles.profileImage} />
        
        {/* 🎭 Overlay gradient comme la photo */}
        <View style={styles.gradientOverlay}>
          {/* Simulation d'un gradient avec plusieurs couches superposées */}
          <View style={styles.gradientLayer1} /> {/* Opacité 0.1 */}
          <View style={styles.gradientLayer2} /> {/* Opacité 0.2 */}
          <View style={styles.gradientLayer3} /> {/* Opacité 0.4 */}
        </View>
      </View>

      {/* 📱 Informations du profil */}
      <View style={styles.profileInfo}>
        {/* 💫 Nom avec effet shimmer */}
        <Animated.View style={shimmerStyle}>
          <Text style={styles.nameText}>
            {profile.name}, {profile.age}
          </Text>
        </Animated.View>

        {/* 🏷️ Tags flottants comme "Artiste passionnée" */}
        <Animated.View style={[styles.tagsContainer, floatingStyle]}>
          {profile.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </Animated.View>

        {/* 📝 Bio */}
        <Text style={styles.bioText}>{profile.bio}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    height: 600,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  
  imageContainer: {
    height: '70%',
    position: 'relative',
  },
  
  profileImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  
  // 🌈 Gradient overlay comme dans la photo
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  
  // Simulation de gradient avec plusieurs couches
  gradientLayer1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(255, 20, 147, 0.1)',
  },
  
  gradientLayer2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(255, 20, 147, 0.2)',
  },
  
  gradientLayer3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'rgba(255, 20, 147, 0.4)',
  },
  
  profileInfo: {
    height: '30%',
    padding: 20,
    justifyContent: 'space-between',
  },
  
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF1493',
    textShadowColor: 'rgba(255, 20, 147, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
  },
  
  tag: {
    backgroundColor: 'rgba(255, 20, 147, 0.1)',
    borderWidth: 1,
    borderColor: '#FF1493',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  
  tagText: {
    fontSize: 12,
    color: '#FF1493',
    fontWeight: '600',
  },
  
  bioText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default AnimatedProfileCard;