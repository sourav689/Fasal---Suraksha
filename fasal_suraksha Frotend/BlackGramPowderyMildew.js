import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function BlackGramPowderyMildew() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./assets/BlackGramPowderyMildew.webp')}
        style={styles.image}
      />
      <Text style={styles.heading}>Black Gram Powdery Mildew</Text>

      <Text style={styles.subheading}>1. Symptoms</Text>
      <Text style={styles.content}>
        • White, powdery growth on leaf surfaces, stems, and pods.{"\n"}
        • Leaves become yellow and dry prematurely.{"\n"}
        • Reduced photosynthesis and poor pod development.{"\n"}
        • In severe cases, plants become stunted and yield declines.
      </Text>

      <Text style={styles.subheading}>2. Cause of Disease</Text>
      <Text style={styles.content}>
        • Caused by the fungus <Text style={styles.bold}>Erysiphe polygoni</Text>.{"\n"}
        • Favors dry and warm conditions with cool nights.{"\n"}
        • Wind-borne conidia spread the disease rapidly.{"\n"}
        • Dense canopy and poor air circulation enhance infection.
      </Text>

      <Text style={styles.subheading}>3. Chemical Treatments</Text>
      <Text style={styles.content}>
        • <Text style={styles.bold}>Wettable Sulphur:</Text> 2–3 g/liter water, spray every 10–15 days.{"\n"}
        • <Text style={styles.bold}>Hexaconazole / Propiconazole:</Text> 1 ml/liter water at first symptom.{"\n"}
        • <Text style={styles.bold}>Mancozeb:</Text> 2–2.5 g/liter water as preventive spray.{"\n"}
        • Repeat application if infection persists.
      </Text>

      <Text style={styles.subheading}>4. Organic Treatments</Text>
      <Text style={styles.content}>
        • <Text style={styles.bold}>Neem Oil Spray:</Text> 3–5 ml/liter + soap every 7–10 days.{"\n"}
        • <Text style={styles.bold}>Baking Soda Solution:</Text> 1 tbsp per liter of water.{"\n"}
        • <Text style={styles.bold}>Garlic-Chili Extract:</Text> Fermented extract sprayed weekly.{"\n"}
        • <Text style={styles.bold}>Cow Urine:</Text> Mix 1 liter of fermented urine in 10 liters water.
      </Text>

      <Text style={styles.subheading}>5. General Care & Prevention</Text>
      <Text style={styles.content}>
        • Avoid excess nitrogen fertilizers that promote lush growth.{"\n"}
        • Provide proper plant spacing and air movement.{"\n"}
        • Avoid overhead irrigation.{"\n"}
        • Practice crop rotation and field sanitation.{"\n"}
        • Use resistant varieties if available.
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
