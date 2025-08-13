import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function BlackGramAnthracnose() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./assets/BlackGramAnthracnose.jpg')}
        style={styles.image}
      />
      <Text style={styles.heading}>Black Gram Anthracnose</Text>

      <Text style={styles.subheading}>1. Cause of Disease</Text>
      <Text style={styles.content}>
        • <Text style={styles.bold}>Pathogen:</Text> Colletotrichum lindemuthianum (fungus).{"\n"}
        • <Text style={styles.bold}>Environment:</Text> High humidity, warm temperatures, leaf wetness from rain/dew/irrigation.{"\n"}
        • <Text style={styles.bold}>Transmission:</Text> Infected seeds, soil, crop debris, wind, water splashes, mechanical handling.
      </Text>

      <Text style={styles.subheading}>2. Chemical Fungicide Treatments</Text>
      <Text style={styles.content}>
        • Carbendazim (0.1%) – 1g/liter of water. Spray every 10–14 days.{"\n"}
        • Propiconazole (1 ml/liter) – Early stage use.{"\n"}
        • Mancozeb (2.5 g/liter) – Use after 30–40 days of planting.{"\n"}
        • <Text style={styles.bold}>Seed Treatment:</Text> Thiram or Carbendazim (2–3 g/kg of seed).
      </Text>

      <Text style={styles.subheading}>3. Organic Treatments</Text>
      <Text style={styles.content}>
        • <Text style={styles.bold}>Neem Oil Spray:</Text> 3–5 ml/liter + few drops of soap. Spray every 7–10 days.{"\n"}
        • <Text style={styles.bold}>Garlic Extract:</Text> 100g crushed garlic in 1 liter of water (ferment 24 hrs).{"\n"}
        • <Text style={styles.bold}>Cow Urine Spray:</Text> 1 liter fermented cow urine + 10 liters of water.{"\n"}
        • <Text style={styles.bold}>Trichoderma:</Text> 4g/kg seed or soil application at planting.{"\n"}
        • <Text style={styles.bold}>Compost Tea:</Text> Brew 24–48 hrs and spray every 7–10 days.
      </Text>

      <Text style={styles.subheading}>4. Step-by-Step Treatment and Care</Text>
      <Text style={styles.content}>
        <Text style={styles.bold}>Step 1 – Field Preparation:</Text> Remove debris, rotate crops.{"\n"}
        <Text style={styles.bold}>Step 2 – Seed Treatment:</Text> Use certified, treated seeds.{"\n"}
        <Text style={styles.bold}>Step 3 – Sowing:</Text> Proper spacing and drainage.{"\n"}
        <Text style={styles.bold}>Step 4 – Monitoring:</Text> Look for dark lesions; remove infected plants.{"\n"}
        <Text style={styles.bold}>Step 5 – Spraying:</Text> Carbendazim or Neem oil depending on choice.{"\n"}
        <Text style={styles.bold}>Step 6 – Biological Control:</Text> Apply Trichoderma or Pseudomonas.{"\n"}
        <Text style={styles.bold}>Step 7 – Irrigation:</Text> Avoid overhead irrigation, water early morning.{"\n"}
        <Text style={styles.bold}>Step 8 – Post-Harvest:</Text> Burn/compost infected residues.
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
