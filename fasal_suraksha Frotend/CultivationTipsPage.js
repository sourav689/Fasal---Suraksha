import React, { useEffect } from "react";
import { Text, ScrollView, Button, StyleSheet } from "react-native";
import * as Localization from "expo-localization";
import * as Speech from "expo-speech";
import { translations } from "./translations"; // Import your translations file

const CultivationTipsPage = ({ route }) => {
  const { selectedLanguage } = route.params; // Extract selected language from route params

  // Get the user's locale (language)
  const userLocale = Localization.locale.split("-")[0]; // Extract language code
  const currentLanguage = translations[selectedLanguage] || translations["en"]; // Use selectedLanguage from route or fallback to "en"

  // Function to speak text
  const speakText = (text) => {
    Speech.speak(text, {
      language: userLocale,
      rate: 0.9, // Adjust speed of speech
    });
  };

  useEffect(() => {
    speakText(currentLanguage.cultivationTips); // Speak title when page loads
  }, [currentLanguage]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{currentLanguage.cultivationTips}</Text>
      <Text style={styles.sectionTitle}>{currentLanguage.landPreparation}</Text>
      <Text style={styles.tip}>• Tip: Begin land preparation by clearing the field of weeds and debris.</Text>
      <Text style={styles.activity}>• Activity: Plough the field 2-3 times to break up the soil and improve aeration. Level the field to ensure uniform water distribution.</Text>
      
      <Text style={styles.sectionTitle}>{currentLanguage.sowing}</Text>
      <Text style={styles.tip}>• Tip: Choose high-yielding and disease-resistant varieties suitable for the Kokan region.</Text>
      <Text style={styles.activity}>• Activity: For direct sowing, ensure the soil is moist but not waterlogged.</Text>

      <Text style={styles.sectionTitle}>{currentLanguage.vegetativeGrowth}</Text>
      <Text style={styles.tip}>• Tip: Maintain water levels in the field (about 3–5 cm) to avoid water stress.</Text>
      <Text style={styles.activity}>• Activity: Fertilize with nitrogen-rich fertilizers at 20-25 days after transplanting to support growth.</Text>

      {/* Button to speak all the tips */}
      <Button
        title="Read All Tips"
        onPress={() => {
          const allTips = [
            currentLanguage.landPreparation,
            currentLanguage.sowing,
            currentLanguage.vegetativeGrowth,
          ].join(' '); // Join all the text with a space
          speakText(allTips); // Speak the concatenated string
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4CAF50",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#2196F3",
  },
  tip: {
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 5,
  },
  activity: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 5,
    fontStyle: "italic",
  },
});

export default CultivationTipsPage;
