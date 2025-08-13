import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet } from 'react-native';

// Import the image from the assets folder
import diseaseImage from './assets/black disease.jpg';  // Adjust the path based on your folder structure

const DiseaseInfo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Anthracnose Disease in Black Gram</Text>
        
        {/* Display the image from the assets folder */}
        <Image source={diseaseImage} style={styles.image} />

        <Text style={styles.text}>
          <Text style={styles.subTitle}>Cause of Disease: </Text>
          Pathogen: Colletotrichum lindemuthianum (fungus).{' '}
          Environmental Factors: High humidity, warm temperatures, and prolonged leaf wetness due to rain, dew, or irrigation.
        </Text>

        <Text style={styles.text}>
          <Text style={styles.subTitle}>Cure: </Text>
          <Text>1. Carbendazim (0.1%) - Mix 1 g in 1 liter of water. Spray every 10-14 days if infection persists.</Text>{'\n'}
          <Text>2. Propiconazole (1 ml/liter) - Apply during early stages of infection.</Text>{'\n'}
          <Text>3. Mancozeb (2.5 g/liter) - Spray after 30-40 days for prevention.</Text>{'\n'}
          <Text>4. Neem Oil Spray - Mix 3-5 ml of neem oil with 1 liter of water. Spray every 7-10 days.</Text>{'\n'}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.subTitle}>Step-by-Step Treatment: </Text>
          <Text>• Step 1: Field Preparation. Clear debris, practice crop rotation.</Text>{'\n'}
          <Text>• Step 2: Seed Treatment. Treat with Carbendazim or Thiram.</Text>{'\n'}
          <Text>• Step 3: Sowing Practices. Maintain plant spacing, avoid waterlogging.</Text>{'\n'}
          <Text>• Step 4: Early Monitoring. Look for lesions and remove infected plants.</Text>{'\n'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40, // Ensure there is padding at the bottom to avoid clipping
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
    lineHeight: 24,  // Adds spacing between lines
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default DiseaseInfo;
