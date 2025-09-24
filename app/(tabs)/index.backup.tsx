import { getWhoViewedMe, profiles, UserProfile } from '@/constants/dating';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  PanResponder,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

  // Animation de pulsation pour l'effet premium
  const cardPulse = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cardPulse, {
          toValue: 1.02,
          duration: 2000,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
          useNativeDriver: false,
        }),
        Animated.timing(cardPulse, {
          toValue: 1,
          duration: 2000,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
          useNativeDriver: false,
        }),
      ])
    );
    pulseAnimation.start();
    
    return () => pulseAnimation.stop();
  }, []);

  return (
    <Animated.View
      style={[styles.ultra3DCard, { 
        transform: [
          { translateX: pan.x }, 
          { translateY: pan.y },
          { scale: cardPulse },
          { rotateZ: pan.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-15deg', '0deg', '15deg'],
            extrapolate: 'clamp',
          })},
          { rotateY: pan.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp',
          })},
          { perspective: 1000 }
        ] 
      }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.premiumImageContainer}>
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
        <Image source={profile.photos[currentImageIndex]} style={styles.premiumImage} />
        
        {/* Overlay gradient moderne */}
        <View style={styles.gradientOverlayCard} />
        
        {/* Indicateurs d'images premium */}
        <View style={styles.premiumImageIndicators}>
          {profile.photos.map((_, index) => (
            <View
              key={index}
              style={[
                styles.premiumIndicator,
                index === currentImageIndex && styles.premiumIndicatorActive
              ]}
            />
          ))}
        </View>

        {/* Informations du profil avec design premium */}
        <View style={styles.premiumProfileInfo}>
          <Text style={styles.premiumProfileName}>{profile.name}, {profile.age}</Text>
          <Text style={styles.premiumProfileBio}>{profile.bio}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [showFilters, setShowFilters] = useState(false);
  const [ageRange, setAgeRange] = useState({ min: 18, max: 50 });
  const [selectedOccupations, setSelectedOccupations] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(50);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  
  // Nouveaux filtres flexibles
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'age' | 'name' | 'compatibility'>('distance');
  const [minDistance, setMinDistance] = useState(0);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [relationshipStatus, setRelationshipStatus] = useState<string[]>([]);
  const [heightRange, setHeightRange] = useState({ min: 150, max: 200 });
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Animations ultra-premium pour style au top
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const morphAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animation d'entrée cinématique ultra-premium
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: false,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1100,
          easing: Easing.elastic(1.5),
          useNativeDriver: false,
        }),
      ]),
    ]).start();
    
    // Animations continues ultra-sophistiquées
    const logoRotation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    
    const pulsation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1500,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
          useNativeDriver: false,
        }),
      ])
    );
    
    const glowEffect = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
          useNativeDriver: false,
        }),
      ])
    );
    
    const floatingEffect = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
          useNativeDriver: false,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
          useNativeDriver: false,
        }),
      ])
    );
    
    const sparkleEffect = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.delay(Math.random() * 2000),
      ])
    );
    
    const waveEffect = Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    
    const morphingEffect = Animated.loop(
      Animated.sequence([
        Animated.timing(morphAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: false,
        }),
        Animated.timing(morphAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: false,
        }),
      ])
    );
    
    logoRotation.start();
    pulsation.start();
    glowEffect.start();
    floatingEffect.start();
    sparkleEffect.start();
    waveEffect.start();
    morphingEffect.start();
    
    return () => {
      logoRotation.stop();
      pulsation.stop();
      glowEffect.stop();
      floatingEffect.stop();
      sparkleEffect.stop();
      waveEffect.stop();
      morphingEffect.stop();
    };
  }, []);

  const handleLike = () => {
    console.log('Liked!');
    nextProfile();
  };

  const handlePass = () => {
    console.log('Passed!');
    nextProfile();
  };

  const nextProfile = () => {
    if (currentProfileIndex < filteredProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0); // Revenir au début
    }
  };

  const applyFilters = () => {
    let filtered = profiles.filter(profile => {
      // Filtres de base
      const ageMatch = profile.age >= ageRange.min && profile.age <= ageRange.max;
      const distanceMatch = profile.distance >= minDistance && profile.distance <= maxDistance;
      const occupationMatch = selectedOccupations.length === 0 || 
                             selectedOccupations.includes(profile.occupation);
      
      // Recherche par mot-clé (nom, description, localisation)
      const keywordMatch = searchKeyword === '' || 
                          profile.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                          profile.location.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                          profile.occupation.toLowerCase().includes(searchKeyword.toLowerCase());
      
      // Filtre par statut relationnel (simulé)
      const statusMatch = relationshipStatus.length === 0 || relationshipStatus.includes('célibataire');
      
      // Filtre par taille (simulé entre 150-200cm)
      const simulatedHeight = 150 + (profile.age - 18) * 2; // Hauteur simulée basée sur l'âge
      const heightMatch = simulatedHeight >= heightRange.min && simulatedHeight <= heightRange.max;
      
      // Filtre en ligne uniquement (simulé - profils avec ID pair = en ligne)
      const onlineMatch = !showOnlineOnly || (profile.name.length % 2 === 0);
      
      return ageMatch && distanceMatch && occupationMatch && keywordMatch && statusMatch && heightMatch && onlineMatch;
    });
    
    // Tri des résultats
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'age':
          return a.age - b.age;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'compatibility':
          // Score de compatibilité simulé basé sur plusieurs facteurs
          const scoreA = Math.abs(a.age - 28) + a.distance + (selectedOccupations.includes(a.occupation) ? -10 : 0);
          const scoreB = Math.abs(b.age - 28) + b.distance + (selectedOccupations.includes(b.occupation) ? -10 : 0);
          return scoreA - scoreB;
        default:
          return 0;
      }
    });
    
    setFilteredProfiles(filtered);
    setCurrentProfileIndex(0);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setAgeRange({ min: 18, max: 50 });
    setSelectedOccupations([]);
    setMaxDistance(50);
    setMinDistance(0);
    setSearchKeyword('');
    setSortBy('distance');
    setShowOnlineOnly(false);
    setRelationshipStatus([]);
    setHeightRange({ min: 150, max: 200 });
    setFilteredProfiles(profiles);
    setCurrentProfileIndex(0);
  };

  const toggleOccupation = (occupation: string) => {
    if (selectedOccupations.includes(occupation)) {
      setSelectedOccupations(prev => prev.filter(o => o !== occupation));
    } else {
      setSelectedOccupations(prev => [...prev, occupation]);
    }
  };

  const uniqueOccupations = [...new Set(profiles.map(p => p.occupation))];
  
  const profileToShow = filteredProfiles.length > 0 ? filteredProfiles[currentProfileIndex] : profiles[5];
  
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.modernContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Gradient de fond moderne */}
      <View style={styles.gradientBackground} />
      <View style={styles.gradientOverlay} />
      
      {/* Système de particules ultra-premium */}
      <Animated.View style={[styles.floatingElement, styles.floatingElement1, {
        opacity: fadeAnim,
        backgroundColor: morphAnim.interpolate({
          inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
          outputRange: ['#FFB6C1', '#FF69B4', '#DC143C', '#FF4500', '#FFC0CB', '#FFB6C1']
        }),
        transform: [
          { rotate: rotateInterpolate },
          { scale: pulseAnim },
          { 
            translateY: floatAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -20],
            })
          }
        ],
      }]} />
      <Animated.View style={[styles.floatingElement, styles.floatingElement2, {
        opacity: fadeAnim,
        backgroundColor: morphAnim.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: ['#FFC0CB', '#8B4513', '#FF1493', '#DC143C', '#FFC0CB']
        }),
        transform: [
          { rotate: rotateInterpolate },
          { 
            translateX: waveAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 15],
            })
          },
          { 
            translateY: floatAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 25],
            })
          }
        ],
      }]} />
      <Animated.View style={[styles.floatingElement, styles.floatingElement3, {
        opacity: sparkleAnim,
        backgroundColor: sparkleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['#FFCCCB', '#FF69B4']
        }),
        transform: [
          { scale: sparkleAnim },
          { 
            translateY: floatAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -15],
            })
          }
        ],
      }]} />
      
      {/* Particules supplémentaires pour effet premium */}
      <Animated.View style={[styles.floatingElement, styles.floatingElement4, {
        opacity: glowAnim,
        transform: [
          { scale: morphAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1.2],
          })},
          { 
            translateX: waveAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 10],
            })
          }
        ],
      }]} />
      <Animated.View style={[styles.floatingElement, styles.floatingElement5, {
        opacity: fadeAnim,
        transform: [
          { rotate: rotateInterpolate },
          { scale: pulseAnim },
        ],
      }]} />
      <Animated.View style={[styles.sparkleElement, styles.sparkle1, {
        opacity: sparkleAnim,
        transform: [{ scale: sparkleAnim }],
      }]} />
      <Animated.View style={[styles.sparkleElement, styles.sparkle2, {
        opacity: glowAnim,
        transform: [{ scale: glowAnim }],
      }]} />
      <Animated.View style={[styles.sparkleElement, styles.sparkle3, {
        opacity: pulseAnim.interpolate({
          inputRange: [1, 1.15],
          outputRange: [0.3, 1],
        }),
        transform: [{ scale: pulseAnim }],
      }]} />

      <Animated.View style={[styles.container, {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }]}>
        <View style={styles.modernHeader}>
          <View style={styles.modernLogo}>
            {/* Effet de halo brillant autour du logo */}
            <Animated.View style={[styles.logoHalo, {
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.8],
              }),
              transform: [
                { scale: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                })},
              ],
            }]} />
            
            <Animated.View style={[styles.modernLogoContainer, {
              transform: [
                { rotate: rotateInterpolate },
                { scale: morphAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.1, 1],
                })},
                { 
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -3],
                  })
                },
              ],
              shadowOpacity: 0.6,
            }]}>
              <Animated.Text style={[styles.modernLogoText, {
                transform: [
                  { scale: pulseAnim },
                ],
                color: morphAnim.interpolate({
                  inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  outputRange: ['#FF1493', '#DC143C', '#FF4500', '#8B4513', '#FF69B4', '#FF1493']
                }),
              }]}>yoo</Animated.Text>
              
              <Animated.Text style={[styles.modernLogoHeart, {
                transform: [
                  { scale: pulseAnim.interpolate({
                    inputRange: [1, 1.15],
                    outputRange: [1, 1.4],
                  })},
                  { rotate: morphAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ['0deg', '15deg', '0deg'],
                  })},
                ],
                color: '#FF0000', // Rouge fixe pour le cœur
                textShadowColor: 'rgba(255, 0, 0, 0.8)',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 4,
              }]}>💕</Animated.Text>
              
              <Animated.Text style={[styles.modernLogoText, {
                transform: [
                  { scale: pulseAnim },
                ],
                color: morphAnim.interpolate({
                  inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  outputRange: ['#8B4513', '#FF1493', '#DC143C', '#FF69B4', '#FFB6C1', '#8B4513']
                }),
              }]}>e</Animated.Text>
            </Animated.View>
            <Animated.Text style={[styles.modernTagline, {
              opacity: fadeAnim,
              transform: [
                { 
                  translateY: slideAnim.interpolate({
                    inputRange: [-50, 0],
                    outputRange: [20, 0],
                  })
                },
                { scale: scaleAnim },
              ],
            }]}>L'amour à portée de clic</Animated.Text>
          </View>
          <View style={styles.modernHeaderButtons}>
          {/* Bouton Qui m'a vu - Ultra Premium */}
          <Animated.View style={[styles.ultraButtonContainer, {
            transform: [
              { scale: scaleAnim },
              { 
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -5],
                })
              },
              { 
                rotateY: morphAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '3deg']
                })
              },
              { perspective: 1000 }
            ],
            shadowOpacity: 0.6,
            shadowRadius: 20,
          }]}>
            <Animated.View style={[{
              backgroundColor: morphAnim.interpolate({
                inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                outputRange: [
                  'rgba(255, 20, 147, 0.2)',   // Rose passion
                  'rgba(220, 20, 60, 0.2)',    // Crimson séduisant
                  'rgba(255, 69, 0, 0.2)',     // Rouge orangé ardent
                  'rgba(139, 69, 19, 0.15)',   // Chocolat sensuel
                  'rgba(255, 182, 193, 0.2)',  // Rose poudré romantique
                  'rgba(255, 20, 147, 0.2)'    // Retour rose passion
                ]
              }),
              borderColor: morphAnim.interpolate({
                inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                outputRange: [
                  'rgba(255, 20, 147, 0.9)',   // Rose passion intense
                  'rgba(220, 20, 60, 0.9)',    // Crimson magnétique
                  'rgba(255, 69, 0, 0.9)',     // Rouge feu de l'amour
                  'rgba(139, 69, 19, 0.8)',    // Chocolat irrésistible
                  'rgba(255, 105, 180, 0.9)',  // Rose vif attirant
                  'rgba(255, 20, 147, 0.9)'    // Retour passion
                ]
              }),
              borderRadius: 30,
              borderWidth: 3,
              shadowColor: '#FF1493',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.6,
              shadowRadius: 20,
              elevation: 15,
            }]}>
              <TouchableOpacity 
                style={[styles.ultraButton, styles.holographicEffect, {
                  minWidth: 100,
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }]}
                onPress={() => router.push('/who-viewed-me')}
                activeOpacity={0.7}
              >
              <Animated.Text style={[styles.ultraButtonText, {
                transform: [
                  { scale: pulseAnim },
                  { rotateZ: waveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '1deg']
                  })}
                ],
                color: morphAnim.interpolate({
                  inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  outputRange: ['#FF1493', '#DC143C', '#FF4500', '#8B4513', '#FF69B4', '#FF1493']
                }),
              }]}>👀 Vues</Animated.Text>
              {(() => {
                const whoViewedData = getWhoViewedMe();
                return whoViewedData.newViews > 0 ? (
                  <Animated.View style={[styles.ultraBadge, {
                    transform: [
                      { scale: pulseAnim.interpolate({
                        inputRange: [1, 1.15],
                        outputRange: [1, 1.4],
                      })},
                      { rotateZ: sparkleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '5deg']
                      })},
                      { perspective: 500 }
                    ],
                    backgroundColor: morphAnim.interpolate({
                      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                      outputRange: ['#FF1493', '#DC143C', '#FF4500', '#8B4513', '#FF69B4', '#FF1493']
                    }),
                    shadowOpacity: 1.0,
                    shadowColor: '#FF1493',
                    borderColor: morphAnim.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: [
                        'rgba(255, 255, 255, 0.9)', 
                        'rgba(255, 215, 0, 0.8)', 
                        'rgba(0, 255, 255, 0.8)', 
                        'rgba(255, 255, 255, 0.9)'
                      ]
                    }),
                  }]}>
                    <Animated.Text style={[styles.ultraBadgeText, {
                      transform: [{ scale: sparkleAnim }],
                    }]}>{whoViewedData.newViews}</Animated.Text>
                  </Animated.View>
                ) : null;
              })()}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* Bouton filtres - Ultra Premium */}
          <Animated.View style={[styles.ultraButtonContainer, {
            transform: [
              { scale: scaleAnim },
              { 
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 3],
                })
              },
              { 
                rotateY: morphAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-2deg']
                })
              },
              { perspective: 1000 }
            ],
            shadowOpacity: 0.6,
            shadowColor: '#FF1493',
            shadowRadius: 20,
          }]}>
            <Animated.View style={[{
              backgroundColor: morphAnim.interpolate({
                inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                outputRange: [
                  'rgba(139, 69, 19, 0.15)',    // Chocolat sensuel
                  'rgba(255, 20, 147, 0.2)',    // Rose passion
                  'rgba(220, 20, 60, 0.2)',     // Crimson magnétique
                  'rgba(255, 192, 203, 0.18)',  // Rose poudré doux
                  'rgba(255, 105, 180, 0.2)',   // Rose vif séduisant
                  'rgba(139, 69, 19, 0.15)'     // Retour chocolat
                ]
              }),
              borderColor: morphAnim.interpolate({
                inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                outputRange: [
                  'rgba(139, 69, 19, 0.9)',     // Chocolat intense
                  'rgba(255, 20, 147, 0.9)',    // Rose passion vif
                  'rgba(220, 20, 60, 0.9)',     // Crimson envoûtant
                  'rgba(255, 182, 193, 0.8)',   // Rose tendre
                  'rgba(255, 105, 180, 0.9)',   // Rose chaud attirant
                  'rgba(139, 69, 19, 0.9)'      // Retour chocolat
                ]
              }),
              borderRadius: 30,
              borderWidth: 3,
              shadowColor: '#FF1493',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.6,
              shadowRadius: 20,
              elevation: 15,
            }]}>
              <TouchableOpacity 
                style={[styles.ultraButton, styles.holographicEffect, {
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }]}
                onPress={() => setShowFilters(true)}
                activeOpacity={0.7}
              >
              <Animated.Text style={[styles.ultraButtonText, {
                transform: [
                  { scale: pulseAnim },
                  { rotateZ: waveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-1deg']
                  })}
                ],
                color: morphAnim.interpolate({
                  inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  outputRange: ['#8B4513', '#FF1493', '#DC143C', '#FFC0CB', '#FF69B4', '#8B4513']
                }),
              }]}>🔍 Filtres</Animated.Text>
            {(selectedOccupations.length > 0 || 
              ageRange.min !== 18 || 
              ageRange.max !== 50 || 
              maxDistance !== 50 || 
              minDistance !== 0 ||
              searchKeyword !== '' ||
              showOnlineOnly ||
              relationshipStatus.length > 0 ||
              heightRange.min !== 150 ||
              heightRange.max !== 200 ||
              sortBy !== 'distance') && (
              <View style={styles.filterIndicator} />
            )}
            </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </View>

      {/* Statistiques des résultats - Design moderne */}
      <Animated.View style={[styles.modernStats, {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }]}>
        <Text style={styles.modernStatsText}>
          ✨ {filteredProfiles.length} profil{filteredProfiles.length > 1 ? 's' : ''} trouvé{filteredProfiles.length > 1 ? 's' : ''}
          {sortBy !== 'distance' && (
            <Text style={{fontSize: 14, color: '#FF69B4', fontWeight: '500'}}> • Tri: {
              sortBy === 'age' ? '🎂 âge' :
              sortBy === 'name' ? '🔤 nom' :
              sortBy === 'compatibility' ? '💕 compatibilité' : '📍 distance'
            }</Text>
          )}
        </Text>
        {filteredProfiles.length > 1 && (
          <Text style={[styles.modernStatsText, {marginTop: 5, fontSize: 14}]}>
            📍 Profil {currentProfileIndex + 1}/{filteredProfiles.length}
          </Text>
        )}
        {searchKeyword && (
          <Text style={{fontSize: 14, color: '#FF69B4', textAlign: 'center', marginTop: 8, fontWeight: '600'}}>
            🔍 Recherche: "{searchKeyword}"
          </Text>
        )}
      </Animated.View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
        {filteredProfiles.length > 0 ? (
          <>
            <Animated.View style={[styles.premiumCard, {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            }]}>
              <ProfileCard 
                profile={profileToShow}
                onSwipeLeft={handlePass}
                onSwipeRight={handleLike}
              />
            </Animated.View>
            <Animated.View style={[{
              marginTop: 25,
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              paddingVertical: 15,
              paddingHorizontal: 25,
              borderRadius: 25,
              shadowColor: '#FF69B4',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 15,
              elevation: 10,
              borderWidth: 1,
              borderColor: 'rgba(255, 105, 180, 0.2)',
            }, {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }]}>
              <Text style={{color: '#FF1493', fontSize: 18, fontWeight: '800', letterSpacing: 1}}>
                🎬 {profileToShow.name} • {profileToShow.occupation}
              </Text>
              <Text style={{color: '#FF69B4', fontSize: 14, marginTop: 8, fontWeight: '600'}}>
                📍 {profileToShow.location} • {profileToShow.distance}km
              </Text>
            </Animated.View>
          </>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>😔</Text>
            <Text style={styles.noResultsTitle}>Aucun profil trouvé</Text>
            <Text style={styles.noResultsSubtitle}>
              Essayez d'ajuster vos critères de recherche
            </Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Modal des filtres */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Critères de recherche</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.modalResetButton}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Recherche par mots-clés */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>🔍 Recherche</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Nom, ville, profession..."
                placeholderTextColor="#FF8A95"
                value={searchKeyword}
                onChangeText={setSearchKeyword}
              />
            </View>

            {/* Tri des résultats */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>📊 Trier par</Text>
              <View style={styles.sortContainer}>
                {[
                  { key: 'distance', label: '📍 Distance', icon: '📍' },
                  { key: 'age', label: '🎂 Âge', icon: '🎂' },
                  { key: 'name', label: '🔤 Nom', icon: '🔤' },
                  { key: 'compatibility', label: '💕 Compatibilité', icon: '💕' }
                ].map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.sortOption,
                      sortBy === option.key && styles.sortOptionSelected
                    ]}
                    onPress={() => setSortBy(option.key as any)}
                  >
                    <Text style={[
                      styles.sortOptionText,
                      sortBy === option.key && styles.sortOptionTextSelected
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Âge */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>🎂 Âge</Text>
              <View style={styles.ageContainer}>
                <View style={styles.ageInputContainer}>
                  <Text style={styles.ageLabel}>Min: {ageRange.min} ans</Text>
                  <View style={styles.ageButtons}>
                    <TouchableOpacity 
                      style={styles.ageButton}
                      onPress={() => setAgeRange(prev => ({...prev, min: Math.max(18, prev.min - 1)}))}
                    >
                      <Text style={styles.ageButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.ageButton}
                      onPress={() => setAgeRange(prev => ({...prev, min: Math.min(prev.max, prev.min + 1)}))}
                    >
                      <Text style={styles.ageButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.ageInputContainer}>
                  <Text style={styles.ageLabel}>Max: {ageRange.max} ans</Text>
                  <View style={styles.ageButtons}>
                    <TouchableOpacity 
                      style={styles.ageButton}
                      onPress={() => setAgeRange(prev => ({...prev, max: Math.max(prev.min, prev.max - 1)}))}
                    >
                      <Text style={styles.ageButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.ageButton}
                      onPress={() => setAgeRange(prev => ({...prev, max: Math.min(60, prev.max + 1)}))}
                    >
                      <Text style={styles.ageButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Distance */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>📍 Distance (de {minDistance}km à {maxDistance}km)</Text>
              <View style={styles.distanceContainer}>
                <View style={styles.ageInputContainer}>
                  <Text style={styles.ageLabel}>Min: {minDistance} km</Text>
                  <View style={styles.ageButtons}>
                    <TouchableOpacity 
                      style={styles.ageButton}
                      onPress={() => setMinDistance(prev => Math.max(0, prev - 5))}
                    >
                      <Text style={styles.ageButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.ageButton}
                      onPress={() => setMinDistance(prev => Math.min(maxDistance - 5, prev + 5))}
                    >
                      <Text style={styles.ageButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.ageInputContainer}>
                  <Text style={styles.ageLabel}>Max: {maxDistance} km</Text>
                  <View style={styles.ageButtons}>
                    <TouchableOpacity 
                      style={styles.ageButton}
                      onPress={() => setMaxDistance(prev => Math.max(minDistance + 5, prev - 5))}
                    >
                      <Text style={styles.ageButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.ageButton}
                      onPress={() => setMaxDistance(prev => Math.min(100, prev + 5))}
                    >
                      <Text style={styles.ageButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Filtres rapides */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>⚡ Filtres rapides</Text>
              
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>👥 En ligne uniquement</Text>
                <TouchableOpacity
                  style={[styles.toggleButton, showOnlineOnly && styles.toggleButtonActive]}
                  onPress={() => setShowOnlineOnly(!showOnlineOnly)}
                >
                  <Text style={styles.toggleText}>{showOnlineOnly ? 'ON' : 'OFF'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Métiers */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>💼 Métiers</Text>
              <View style={styles.occupationsContainer}>
                {uniqueOccupations.map(occupation => (
                  <TouchableOpacity
                    key={occupation}
                    style={[
                      styles.occupationChip,
                      selectedOccupations.includes(occupation) && styles.occupationChipSelected
                    ]}
                    onPress={() => toggleOccupation(occupation)}
                  >
                    <Text style={[
                      styles.occupationChipText,
                      selectedOccupations.includes(occupation) && styles.occupationChipTextSelected
                    ]}>
                      {occupation}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bouton pour les critères avancés */}
            <TouchableOpacity
              style={styles.advancedToggle}
              onPress={() => setShowAdvanced(!showAdvanced)}
            >
              <Text style={styles.advancedToggleText}>
                {showAdvanced ? '▼' : '▶'} Critères avancés
              </Text>
            </TouchableOpacity>

            {/* Critères avancés */}
            {showAdvanced && (
              <>
                <View style={styles.filterSection}>
                  <Text style={styles.filterTitle}>📏 Taille ({heightRange.min}cm - {heightRange.max}cm)</Text>
                  <View style={styles.ageContainer}>
                    <View style={styles.ageInputContainer}>
                      <Text style={styles.ageLabel}>Min: {heightRange.min} cm</Text>
                      <View style={styles.ageButtons}>
                        <TouchableOpacity 
                          style={styles.ageButton}
                          onPress={() => setHeightRange(prev => ({...prev, min: Math.max(150, prev.min - 5)}))}
                        >
                          <Text style={styles.ageButtonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.ageButton}
                          onPress={() => setHeightRange(prev => ({...prev, min: Math.min(prev.max - 5, prev.min + 5)}))}
                        >
                          <Text style={styles.ageButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    <View style={styles.ageInputContainer}>
                      <Text style={styles.ageLabel}>Max: {heightRange.max} cm</Text>
                      <View style={styles.ageButtons}>
                        <TouchableOpacity 
                          style={styles.ageButton}
                          onPress={() => setHeightRange(prev => ({...prev, max: Math.max(prev.min + 5, prev.max - 5)}))}
                        >
                          <Text style={styles.ageButtonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.ageButton}
                          onPress={() => setHeightRange(prev => ({...prev, max: Math.min(200, prev.max + 5)}))}
                        >
                          <Text style={styles.ageButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.filterSection}>
                  <Text style={styles.filterTitle}>💕 Statut relationnel</Text>
                  <View style={styles.occupationsContainer}>
                    {['célibataire', 'divorcé(e)', 'veuf(ve)'].map(status => (
                      <TouchableOpacity
                        key={status}
                        style={[
                          styles.occupationChip,
                          relationshipStatus.includes(status) && styles.occupationChipSelected
                        ]}
                        onPress={() => {
                          if (relationshipStatus.includes(status)) {
                            setRelationshipStatus(prev => prev.filter(s => s !== status));
                          } else {
                            setRelationshipStatus(prev => [...prev, status]);
                          }
                        }}
                      >
                        <Text style={[
                          styles.occupationChipText,
                          relationshipStatus.includes(status) && styles.occupationChipTextSelected
                        ]}>
                          {status}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Appliquer les filtres</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </Animated.View>
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
  // Styles pour les filtres
  filterButton: {
    position: 'absolute',
    right: 20,
    top: 60,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    marginLeft: 8,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 182, 193, 0.3)',
    alignItems: 'center',
  },
  statsText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  noResultsText: {
    fontSize: 64,
    marginBottom: 20,
  },
  noResultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
    textAlign: 'center',
  },
  noResultsSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Styles pour la modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFE4E6',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFB3B8',
    backgroundColor: '#FFF0F1',
  },
  modalCloseButton: {
    fontSize: 24,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  modalResetButton: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginVertical: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 15,
  },
  // Styles pour l'âge
  ageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ageInputContainer: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  ageLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  ageButtons: {
    flexDirection: 'row',
  },
  ageButton: {
    backgroundColor: '#FFF0F1',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  ageButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  // Styles pour la distance
  distanceContainer: {
    alignItems: 'center',
  },
  distanceLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 15,
  },
  distanceButtons: {
    flexDirection: 'row',
  },
  distanceButton: {
    backgroundColor: '#FFF0F1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  distanceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  // Styles pour les métiers
  occupationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  occupationChip: {
    backgroundColor: '#FFF0F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFB3B8',
  },
  occupationChipSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  occupationChipText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  occupationChipTextSelected: {
    color: 'white',
  },
  modalFooter: {
    padding: 20,
    backgroundColor: '#FFF0F1',
    borderTopWidth: 1,
    borderTopColor: '#FFB3B8',
  },
  applyButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Nouveaux styles pour les filtres avancés
  searchInput: {
    backgroundColor: '#FFF0F1',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: '#FFB3B8',
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sortOption: {
    backgroundColor: '#FFF0F1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFB3B8',
    flex: 1,
    minWidth: '45%',
  },
  sortOptionSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  sortOptionText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  sortOptionTextSelected: {
    color: 'white',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFB3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  toggleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  advancedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#FFB3B8',
    marginTop: 10,
  },
  advancedToggleText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  // Styles pour "Qui m'a vu"
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  whoViewedButton: {
    backgroundColor: '#FFF0F1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFB3B8',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whoViewedButtonText: {
    fontSize: 20,
    color: '#FF6B6B',
  },
  whoViewedBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF0F1',
  },
  whoViewedBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Styles pour la belle façade moderne
  modernContainer: {
    flex: 1,
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#8B0000', // Rouge sombre et sensuel
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 20, 147, 0.15)', // Overlay rose passion
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.1,
  },
  floatingElement1: {
    width: 120,
    height: 120,
    backgroundColor: '#FFB6C1',
    top: 100,
    right: 30,
  },
  floatingElement2: {
    width: 80,
    height: 80,
    backgroundColor: '#FFC0CB',
    bottom: 200,
    left: 20,
  },
  floatingElement3: {
    width: 60,
    height: 60,
    backgroundColor: '#FFCCCB',
    top: 300,
    left: 50,
  },
  modernHeader: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 182, 193, 0.3)',
  },
  modernLogo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  modernLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 105, 180, 0.2)',
  },
  modernLogoText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FF1493',
    textShadowColor: 'rgba(255, 20, 147, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  modernLogoHeart: {
    fontSize: 32,
    marginHorizontal: 5,
    transform: [{ rotate: '10deg' }],
    color: '#FF0000', // Rouge pour le cœur
    textShadowColor: 'rgba(255, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  modernTagline: {
    fontSize: 16,
    color: '#FF69B4',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  modernHeaderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modernButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 105, 180, 0.3)',
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    minWidth: 120,
    alignItems: 'center',
  },
  modernButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF1493',
    letterSpacing: 0.5,
  },
  premiumCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    margin: 20,
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 25,
    borderWidth: 3,
    borderColor: 'rgba(255, 182, 193, 0.3)',
  },
  modernStats: {
    backgroundColor: 'rgba(255, 240, 245, 0.9)',
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 182, 193, 0.2)',
  },
  modernStatsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF1493',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  
  // Styles premium pour les cartes de profil
  premiumProfileCard: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 25,
    borderWidth: 3,
    borderColor: 'rgba(255, 105, 180, 0.2)',
    overflow: 'hidden',
  },
  premiumImageContainer: {
    flex: 1,
    borderRadius: 27,
    overflow: 'hidden',
    margin: 3,
    position: 'relative',
  },
  premiumImage: {
    width: '100%',
    height: '100%',
    borderRadius: 27,
  },
  premiumImageIndicators: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  premiumIndicator: {
    height: 4,
    flex: 1,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  premiumIndicatorActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowOpacity: 0.5,
  },
  premiumProfileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: 25,
    borderBottomLeftRadius: 27,
    borderBottomRightRadius: 27,
  },
  premiumProfileName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF1493',
    marginBottom: 10,
    textShadowColor: 'rgba(255, 20, 147, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  premiumProfileBio: {
    fontSize: 16,
    color: '#FF69B4',
    lineHeight: 22,
    fontWeight: '500',
  },
  gradientOverlayCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderBottomLeftRadius: 27,
    borderBottomRightRadius: 27,
    backgroundColor: 'rgba(255, 20, 147, 0.1)',
  },
  
  // Styles ultra-premium pour le style au top
  floatingElement4: {
    width: 150,
    height: 150,
    backgroundColor: '#FF1493',
    top: 50,
    right: -30,
    borderRadius: 75,
  },
  floatingElement5: {
    width: 100,
    height: 100,
    backgroundColor: '#FF69B4',
    bottom: 100,
    left: -20,
    borderRadius: 50,
  },
  sparkleElement: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  sparkle1: {
    top: 150,
    right: 80,
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  sparkle2: {
    top: 250,
    left: 60,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  sparkle3: {
    bottom: 300,
    right: 40,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 12,
  },
  logoHalo: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 20, 147, 0.2)',
    top: -50,
    left: -50,
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 20,
  },
  ultraPremiumGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'linear-gradient(45deg, #FF1493, #FF69B4, #FFB6C1, #FFC0CB)',
  },
  neonGlow: {
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 25,
  },
  glassMorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(30px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  premiumShadow: {
    shadowColor: '#FF1493',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 30,
  },
  holographicEffect: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 2.5,
    borderTopColor: 'rgba(255, 255, 255, 0.7)',
    borderLeftColor: 'rgba(255, 105, 180, 0.4)',
    borderRightColor: 'rgba(255, 20, 147, 0.6)',
    borderBottomColor: 'rgba(148, 0, 211, 0.5)',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 2, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 20,
    // Effet de réfraction
    overflow: 'hidden',
  },
  ultra3DCard: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    shadowColor: '#FF1493',
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.7,
    shadowRadius: 40,
    elevation: 35,
    borderWidth: 3,
    borderTopColor: 'rgba(255, 255, 255, 0.8)',
    borderLeftColor: 'rgba(255, 105, 180, 0.3)',
    borderRightColor: 'rgba(255, 20, 147, 0.5)',
    borderBottomColor: 'rgba(255, 20, 147, 0.7)',
    overflow: 'hidden',
    // Effet de réflection 3D
    backfaceVisibility: 'visible',
  },
  ultraButtonContainer: {
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 12,
  },
  ultraButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.9)',
    borderLeftColor: 'rgba(255, 105, 180, 0.4)',
    borderRightColor: 'rgba(255, 20, 147, 0.6)',
    borderBottomColor: 'rgba(255, 20, 147, 0.8)',
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ultraButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FF1493',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 20, 147, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ultraBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FF1493',
    borderRadius: 15,
    minWidth: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
  },
  ultraBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
