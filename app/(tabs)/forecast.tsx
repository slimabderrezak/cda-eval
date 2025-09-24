import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 📱 ÉCRAN DES PRÉVISIONS DE MATCHES
 * Équivalent de forecast.tsx dans CDA-météo
 */

export default function ForecastScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💕 Prévisions de Matches</Text>
      <Text style={styles.subtitle}>Vos prochaines rencontres potentielles</Text>
      
      {/* TODO: Ajouter la logique des prévisions de matches */}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});