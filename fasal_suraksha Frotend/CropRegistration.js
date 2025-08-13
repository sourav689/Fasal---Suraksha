import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function CropRegistration({ route, navigation }) {
  // Ensure selectedLanguage is passed from previous screen via route.params
  const { selectedLanguage } = route.params || { selectedLanguage: "english" }; // Default to English if undefined

  const translations = {
    hindi: {
      title: "अपनी फसल चुनें",
      rice: "चावल",
    },
    english: {
      title: "Select Your Crop",
      rice: "Rice",
    },
    marathi: {
      title: "तुमची फसल निवडा",
      rice: "तांदूळ",
    },
  };

  const translate = (key) =>
    translations[selectedLanguage]?.[key] || translations.english[key]; // Fallback to English if translation is not available

  const handleCropClick = () => {
    navigation.navigate("SoilTestingReport"); // Navigate to SoilTestingReport page
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{translate("title")}</Text>

      {/* Rice Crop Image */}
      <TouchableOpacity onPress={handleCropClick} style={styles.cropContainer}>
        <Image
          source={require("./assets/CROP_RICE.jpg")}
          style={styles.cropImage} // No round shape applied
        />
        <Text style={styles.cropName}>{translate("rice")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 40,
  },
  cropContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10, // Optional: You can add a slight border radius to make it look better
    width: 200, // Adjust size as needed
    height: 200, // Adjust size as needed
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 10,
  },
  cropImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Keeps the image aspect ratio intact
  },
  cropName: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    color: "#4CAF50",
  },
});
