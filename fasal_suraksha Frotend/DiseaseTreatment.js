import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech'; // Import expo-speech
import { FontAwesome5 } from '@expo/vector-icons'; // For the speaker icon

const DiseaseTreatmentPage = () => {

  // Function to read the entire content
  const readContent = () => {
    const content = "Rice Bacterial Blight Treatment: \n\nCause of Disease...\n Cure... Step-by-Step Treatment and Overall Care...";
    Speech.speak(content, {
      language: 'en',
      rate: 2.0 , // Adjust the speech rate
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rice Bacterial Blight Treatment</Text>

      {/* Speaker Icon */}
      <TouchableOpacity onPress={readContent} style={styles.speakerIcon}>
        <FontAwesome5 name="volume-up" size={30} color="green" />
      </TouchableOpacity>

      {/* Disease Image */}
      <Image 
        source={require('./assets/rice_bacterial_blight_image.jpg')}  // Use require for local images
        style={styles.diseaseImage}
      />

      {/* Disease Cause Section */}
      <Text style={styles.subtitle}>Cause of Disease</Text>
      <Text style={styles.text}>
        • Pathogen: Xanthomonas oryzae pv. oryzae (bacteria).{'\n'}
        • Favorable Conditions:{'\n'}
        {'\u2022'} High humidity (70–90%), heavy rainfall, severe wind, and warm temperatures (28–34°C).{'\n'}
        {'\u2022'} Wind-driven rain and flooding spread the bacteria.{'\n'}
        {'\u2022'} Injuries caused by insect feeding or mechanical damage facilitate infection.{'\n'}
        {'\u2022'} Application of excessive nitrogen, especially late top dressing.
      </Text>

      {/* Cure Section */}
      <Text style={styles.subtitle}>Cure</Text>
      <Text style={styles.text}>Chemical Treatments:</Text>
      <Text style={styles.text}>
        1. Streptocycline (200 ppm): Mix 2g in 10 liters of water. Spray on plants.{'\n'}
        2. Copper Oxychloride (2.5g/liter of water): Spray at the first sign of infection.{'\n'}
        3. Kasugamycin (2 ml/liter of water): Use as a preventive spray.
      </Text>

      <Text style={styles.text}>Organic Treatments:</Text>
      <Text style={styles.text}>
        1. Garlic and Ginger Extract: Mix 100g garlic, 50g ginger, and 1 liter of water.{'\n'}
        2. Neem Oil Spray: Mix 3-5ml neem oil with 1 liter of water.{'\n'}
        3. Baking Soda Solution: Mix 1 tablespoon of baking soda in 1 liter of water.{'\n'}
        4. Cow Urine Spray: Mix 1 liter of fermented cow urine with 10 liters of water.
      </Text>

      {/* Step-by-Step Treatment Section */}
      <Text style={styles.subtitle}>Step-by-Step Treatment and Overall Care</Text>
      <Text style={styles.text}>
        Step 1: Field Preparation{'\n'}
        • Remove and destroy infected crop residues.{'\n'}
        Step 2: Seed Treatment{'\n'}
        • Soak seeds in Streptocycline solution for 30 minutes.{'\n'}
        Step 3: Early Monitoring{'\n'}
        • Monitor for early symptoms during humid/rainy conditions.{'\n'}
        Step 4: Chemical Spray{'\n'}
        • Spray Streptocycline or Copper Oxychloride.{'\n'}
        Step 5: Balanced Fertilization{'\n'}
        • Apply balanced doses of nitrogen, phosphorus, and potassium.{'\n'}
        Step 6: Water Management{'\n'}
        • Avoid over-irrigation and use alternate wetting and drying.{'\n'}
        Step 7: Resistant Varieties{'\n'}
        • Grow resistant rice varieties like IR20 or IR64.{'\n'}
        Step 8: Post-Harvest Care{'\n'}
        • Remove and burn infected plants after harvest.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  diseaseImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  speakerIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default DiseaseTreatmentPage;
