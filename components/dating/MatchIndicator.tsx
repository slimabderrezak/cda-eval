import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 💖 COMPOSANT MATCH INDICATOR
 * Équivalent des indicateurs météo
 */

interface MatchIndicatorProps {
  compatibility: number;
  commonInterests: number;
  distance: number;
}

export const MatchIndicator: React.FC<MatchIndicatorProps> = ({
  compatibility,
  commonInterests,
  distance
}) => {
  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#FF5722';
  };

  return (
    <View style={styles.container}>
      <View style={styles.indicator}>
        <Text style={styles.label}>Compatibilité</Text>
        <Text style={[styles.value, { color: getCompatibilityColor(compatibility) }]}>
          {compatibility}%
        </Text>
      </View>
      
      <View style={styles.indicator}>
        <Text style={styles.label}>Intérêts communs</Text>
        <Text style={styles.value}>{commonInterests}</Text>
      </View>
      
      <View style={styles.indicator}>
        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>{distance} km</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF0F1',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  indicator: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF1493',
  },
});