import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";

export default function Tomato({ route }) {
  const { selectedLanguage } = route.params || { selectedLanguage: "english" };

  const content = {
    english: [
      "Tomato requires warm climate and well-drained soil rich in organic matter.",
      "It thrives in temperatures between 20°C and 30°C.",
      "Regular pruning and staking increase fruit quality.",
      "Avoid overwatering to prevent root rot."
    ],
    hindi: [
      "टमाटर को गर्म जलवायु और जैविक पदार्थों से भरपूर अच्छी जल निकासी वाली मिट्टी की आवश्यकता होती है।",
      "यह 20°C से 30°C तापमान के बीच अच्छा बढ़ता है।",
      "नियमित कटाई और सहारा देने से फल की गुणवत्ता बढ़ती है।",
      "जड़ सड़न से बचने के लिए अधिक पानी न दें।"
    ],
    marathi: [
      "टोमॅटोला उष्ण हवामान आणि सेंद्रिय घटकांनी समृद्ध, निचरा होणारी माती आवश्यक असते.",
      "तो 20°C ते 30°C तापमानात चांगल्या प्रकारे वाढतो.",
      "नियमित छाटणी व आधार दिल्यास फळाची गुणवत्ता वाढते.",
      "अधिक पाणी दिल्यास मुळे कुजण्याची शक्यता असते."
    ]
  };

  const speak = () => {
    Speech.speak(content[selectedLanguage].join(" "), {
      language:
        selectedLanguage === "hindi"
          ? "hi-IN"
          : selectedLanguage === "marathi"
          ? "mr-IN"
          : "en-US",
      rate: 0.9,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.speakerButton} onPress={speak}>
          <Ionicons name="volume-high" size={28} color="#FF5722" />
        </TouchableOpacity>

        <Image
          source={require("./assets/CROP_TOMATO.jpg")}
          style={styles.image}
        />

        {content[selectedLanguage].map((tip, index) => (
          <Text key={index} style={styles.text}>{`• ${tip}`}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#333",
    textAlign: "left",
    marginBottom: 12,
    width: "100%",
  },
  speakerButton: {
    alignSelf: "flex-end",
    backgroundColor: "#FFEBEE",
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
});
