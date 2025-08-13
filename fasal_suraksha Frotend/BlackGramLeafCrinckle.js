import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function BlackGramLeafCrinckle() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./assets/BlackGramLeafCrinckle.webp')}
        style={styles.image}
      />
      <Text style={styles.heading}>Black Gram Leaf Crinkle</Text>

      <Text style={styles.subheading}>1. Symptoms</Text>
      <Text style={styles.content}>
        • Crinkled, twisted, and deformed leaves.{"\n"}
        • Mosaic patterns, stunted growth, brittle stems.{"\n"}
        • Severe cases lead to flower drop and poor pod formation.
      </Text>

      <Text style={styles.subheading}>2. Cause of Disease</Text>
      <Text style={styles.content}>
        • Caused by <Text style={styles.bold}>ULCV (Urdbean Leaf Crinkle Virus)</Text>.{"\n"}
        • Transmitted by whiteflies (Bemisia tabaci) and aphids.{"\n"}
        • Spread through infected seeds and secondary vectors.
      </Text>

      <Text style={styles.subheading}>3. Chemical Treatments</Text>
      <Text style={styles.content}>
        • <Text style={styles.bold}>Imidacloprid:</Text> 0.5 ml/liter of water.{"\n"}
        • <Text style={styles.bold}>Thiamethoxam:</Text> 0.3 g/liter of water.{"\n"}
        • <Text style={styles.bold}>Acetamiprid:</Text> 0.5 g/liter of water.{"\n"}
        • Spray every 10–14 days at early crop stages.{"\n"}
        • <Text style={styles.bold}>Seed Treatment:</Text> Imidacloprid 5g/kg of seed before sowing.
      </Text>

      <Text style={styles.subheading}>4. Organic Treatments</Text>
      <Text style={styles.content}>
        • <Text style={styles.bold}>Neem Oil:</Text> 3–5 ml/liter + few drops of soap. Spray every 7–10 days.{"\n"}
        • <Text style={styles.bold}>Garlic-Chili Extract:</Text> Mix crushed garlic and chili in water and spray.{"\n"}
        • <Text style={styles.bold}>Cow Urine Spray:</Text> 1 liter cow urine + 10 liters water.{"\n"}
        • <Text style={styles.bold}>Sticky Yellow Traps:</Text> Install to catch whiteflies and aphids.
      </Text>

      <Text style={styles.subheading}>5. General Prevention</Text>
      <Text style={styles.content}>
        • Sow early in the season to escape peak vector population.{"\n"}
        • Use certified virus-free seeds.{"\n"}
        • Remove and destroy infected plants immediately.{"\n"}
        • Maintain crop hygiene and field sanitation.{"\n"}
        • Avoid overlapping of susceptible crops nearby.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  image: { width: '100%', height: 250, resizeMode: 'contain', borderRadius: 10, marginBottom: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#2a2a2a', textAlign: 'center' },
  subheading: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  content: { fontSize: 16, lineHeight: 24 },
  bold: { fontWeight: 'bold' },
});
