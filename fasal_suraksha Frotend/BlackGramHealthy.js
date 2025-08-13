import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function BlackGramHealthy() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./assets/BlackGramHealthy.jpg')}
        style={styles.image}
      />
      <Text style={styles.heading}>Black Gram (Healthy Crop)</Text>

      <Text style={styles.subheading}>Symptoms</Text>
      <Text style={styles.content}>
        • Healthy crop, no visible disease symptoms.{'\n'}
        • Lush green foliage, uniform growth, no lesions or wilting.
      </Text>

      <Text style={styles.subheading}>Care & Maintenance</Text>
      <Text style={styles.content}>
        • Maintain proper irrigation and avoid waterlogging.{'\n'}
        • Follow recommended fertilization schedule with balanced NPK.{'\n'}
        • Monitor regularly to catch early signs of pests or diseases.{'\n'}
        • Use certified seeds for continued healthy yield.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 250, resizeMode: 'contain', borderRadius: 10, marginBottom: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#2a2a2a' },
  subheading: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  content: { fontSize: 16, lineHeight: 24 },
});
