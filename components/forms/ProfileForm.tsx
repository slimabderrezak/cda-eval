import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../ui/Button';

/**
 * 📝 FORMULAIRE DE PROFIL UTILISATEUR
 * Équivalent des composants de formulaires
 */

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  initialData?: Partial<ProfileFormData>;
}

export interface ProfileFormData {
  name: string;
  age: string;
  bio: string;
  location: string;
  occupation: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  initialData = {}
}) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: initialData.name || '',
    age: initialData.age || '',
    bio: initialData.bio || '',
    location: initialData.location || '',
    occupation: initialData.occupation || '',
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const updateField = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Mon Profil</Text>
      
      <View style={styles.field}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => updateField('name', value)}
          placeholder="Votre nom"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Âge</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(value) => updateField('age', value)}
          placeholder="Votre âge"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.bio}
          onChangeText={(value) => updateField('bio', value)}
          placeholder="Parlez-nous de vous..."
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Localisation</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(value) => updateField('location', value)}
          placeholder="Votre ville"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Profession</Text>
        <TextInput
          style={styles.input}
          value={formData.occupation}
          onChangeText={(value) => updateField('occupation', value)}
          placeholder="Votre métier"
        />
      </View>

      <Button
        title="💾 Sauvegarder"
        onPress={handleSubmit}
        variant="primary"
        size="large"
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF1493',
    textAlign: 'center',
    marginBottom: 30,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 20,
  },
});