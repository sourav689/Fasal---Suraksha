import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";

export default function Cultivation({ route, navigation }) {
  const { selectedLanguage } = route.params || { selectedLanguage: "english" };

  const translations = {
    hindi: {
      title: "अपनी फसल चुनें",
      rice: "चावल",
      tomato: "टमाटर",
      blackGram: "काली मटर",
    },
    english: {
      title: "Select Your Crop",
      rice: "Rice",
      tomato: "Tomato",
      blackGram: "Black Gram",
    },
    marathi: {
      title: "तुमची फसल निवडा",
      rice: "तांदूळ",
      tomato: "टोमॅटो",
      blackGram: "उडीद",
    },
  };

  const translate = (key) =>
    translations[selectedLanguage]?.[key] || translations.english[key];

  const handleCropClick = (crop) => {
    navigation.navigate(crop, { selectedLanguage });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{translate("title")}</Text>

        <View style={styles.grid}>
          {/* Rice */}
          <TouchableOpacity
            onPress={() => handleCropClick("Rice")}
            style={styles.cropContainer}
          >
            <Image
              source={require("./assets/CROP_RICE.jpeg")}
              style={styles.cropImage}
            />
            <Text style={styles.cropName}>{translate("rice")}</Text>
          </TouchableOpacity>

          {/* Tomato */}
          <TouchableOpacity
            onPress={() => handleCropClick("Tomato")}
            style={styles.cropContainer}
          >
            <Image
              source={require("./assets/CROP_TOMATO.jpg")}
              style={styles.cropImage}
            />
            <Text style={styles.cropName}>{translate("tomato")}</Text>
          </TouchableOpacity>

          {/* Black Gram */}
          <TouchableOpacity
            onPress={() => handleCropClick("BlackGram")}
            style={styles.cropContainer}
          >
            <Image
              source={require("./assets/CROP_BLACKGRAM.webp")}
              style={styles.cropImage}
            />
            <Text style={styles.cropName}>{translate("blackGram")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 30,
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    rowGap: 20,
  },
  cropContainer: {
    width: "42%",
    height: 160,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    padding: 10,
  },
  cropImage: {
    width: 90,
    height: 90,
    resizeMode: "cover",
    borderRadius: 8,
  },
  cropName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    color: "#4CAF50",
    textAlign: "center",
  },
});
