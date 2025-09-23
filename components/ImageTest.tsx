import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// Test simple pour vérifier le chargement des images
const avatarTest = require('@/assets/images/icon.png'); // Image de référence qui fonctionne
const avatarGemini = require('@/assets/images/Gemini_Generated_Image_7vhmpa7vhmpa7vhm.png'); // Nouvelle image Gemini
const avatarEmma = require('@/assets/images/avatar-emma-1.png'); // Vraie image d'avatar

export default function ImageTest() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Images - Nouvelle Image Gemini</Text>
      
      {/* Test 1: Nouvelle image Gemini */}
      <View style={{marginBottom: 20}}>
        <Text style={{textAlign: 'center', marginBottom: 10, fontWeight: 'bold', color: '#FF6B6B'}}>
          Image Gemini (Nouveau)
        </Text>
        <Image 
          source={avatarGemini}
          style={[styles.image, {width: 200, height: 200, borderRadius: 10}]}
          onError={(error) => console.log('❌ Erreur image Gemini:', error)}
          onLoad={() => console.log('✅ Image Gemini chargée avec succès!')}
        />
      </View>
      
      {/* Test 2: Image icon.png (référence) */}
      <View style={{marginBottom: 20}}>
        <Text style={{textAlign: 'center', marginBottom: 10}}>Icon (référence)</Text>
        <Image 
          source={avatarTest}
          style={[styles.image, {width: 100, height: 100}]}
          onError={(error) => console.log('❌ Erreur icon:', error)}
          onLoad={() => console.log('✅ Icon chargée')}
        />
      </View>
      
      <Text style={{marginTop: 20, textAlign: 'center', color: '#666'}}>
        Test de la nouvelle image générée par Gemini
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE4E6',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});