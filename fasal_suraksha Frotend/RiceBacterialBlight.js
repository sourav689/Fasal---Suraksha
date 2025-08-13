import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function RiceBacterialBlight() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./assets/rice_bacterialblight.jpg')} // Replace with your image path
        style={styles.image}
      />
      <Text style={styles.heading}>Rice Bacterial Blight</Text>

      <Text style={styles.subheading}>1. Symptoms</Text>
      <Text style={styles.content}>
        • Yellowing and drying of leaf tips, progressing down the leaf blade.{"\n"}
        • Water-soaked lesions become yellow and then straw-colored.{"\n"}
        • Wilting of seedlings and drying of leaves in older plants.{"\n"}
        • Bacterial ooze may appear on infected tissues.
      </Text>

      <Text style={styles.subheading}>2. Cause of Disease</Text>
      <Text style={styles.content}>
        • Caused by <Text style={styles.bold}>Xanthomonas oryzae pv. oryzae</Text>.{"\n"}
        • Spread through wind-blown rain, irrigation water, tools, and infected seed.{"\n"}
        • Enters through wounds, leaf tips, or stomata.{"\n"}
        • High humidity and temperatures of 25–34°C favor development.
      </Text>

      <Text style={styles.subheading}>3. Chemical Control</Text>
      <Text style={styles.content}>
        • <Text style={styles.bold}>Streptocycline:</Text> 100–200 ppm (0.1–0.2 g/l) with copper oxychloride.{"\n"}
        • <Text style={styles.bold}>Copper-based fungicides:</Text> 2.5 g/liter of water.{"\n"}
        • Spray twice at 15-day intervals starting from the first symptom.{"\n"}
        • Avoid overuse of nitrogen fertilizers which favor disease.
      </Text>

      <Text style={styles.subheading}>4. Organic Control</Text>
      <Text style={styles.content}>
        • <Text style={styles.bold}>Cow Urine Spray:</Text> Mix 1 liter fermented urine with 10 liters of water.{"\n"}
        • <Text style={styles.bold}>Garlic-Chili Extract:</Text> Acts as antimicrobial; spray weekly.{"\n"}
        • <Text style={styles.bold}>Panchagavya or Jeevamrut:</Text> Spray every 10 days for resistance boosting.{"\n"}
        • <Text style={styles.bold}>Neem Leaf Extract:</Text> Natural antibacterial and preventive.
      </Text>

      <Text style={styles.subheading}>5. Cultural Practices</Text>
      <Text style={styles.content}>
        • Use disease-free seeds and resistant varieties (e.g., IR64, TNAU Rice ADT 43).{"\n"}
        • Avoid excessive nitrogen and ensure balanced nutrition.{"\n"}
        • Maintain proper spacing and drainage.{"\n"}
        • Remove and destroy infected plant residues after harvest.{"\n"}
        • Rotate rice with legumes or non-host crops.
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
