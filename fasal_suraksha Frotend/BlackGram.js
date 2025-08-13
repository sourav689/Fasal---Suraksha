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

export default function BlackGram({ route }) {
  const { selectedLanguage } = route.params || { selectedLanguage: "english" };

  const content = {
    english: [
      "Black Gram is a leguminous crop, enriches soil and needs moderate rainfall.",
      "It improves nitrogen content of soil naturally.",
      "Prefers loamy to sandy-loam soil with good drainage.",
      "Avoid water logging as roots may decay."
    ],
    hindi: [
      "काली मटर एक दलहनी फसल है, जो मिट्टी को उर्वर बनाती है और मध्यम वर्षा की आवश्यकता होती है।",
      "यह प्राकृतिक रूप से मिट्टी में नाइट्रोजन की मात्रा बढ़ाती है।",
      "इसे अच्छी जल निकासी वाली दोमट से रेतीली दोमट मिट्टी पसंद है।",
      "पानी का जमाव होने से जड़ें सड़ सकती हैं।"
    ],
    marathi: [
      "उडीद हे एक कडधान्य पीक आहे, जे मातीची सुपीकता वाढवते आणि मध्यम पर्जन्याची गरज असते.",
      "हे मातीतील नायट्रोजनची पातळी नैसर्गिकरित्या वाढवते.",
      "सुपीक, निचरा होणारी वाळवंटी दोमट माती त्यासाठी योग्य आहे.",
      "पाण्याचा साठा टाळावा, अन्यथा मुळे सडतात."
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
          <Ionicons name="volume-high" size={28} color="#4CAF50" />
        </TouchableOpacity>

        <Image
          source={require("./assets/CROP_BLACKGRAM.webp")}
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
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
});
