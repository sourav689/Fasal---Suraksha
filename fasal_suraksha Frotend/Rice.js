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

export default function Rice({ route }) {
  const { selectedLanguage } = route.params || { selectedLanguage: "english" };

  const content = {
    english: [
      "Rice grows best in areas with high humidity, abundant water, and fertile soil.",
      "It needs consistent water supply especially during early growth stages.",
      "Paddy fields are ideal for rice due to their water retention ability.",
      "Weeding and timely fertilization improve yield."
    ],
    hindi: [
      "चावल उच्च आर्द्रता, प्रचुर मात्रा में पानी और उपजाऊ मिट्टी वाले क्षेत्रों में सबसे अच्छा उगता है।",
      "विशेषकर प्रारंभिक वृद्धि चरणों में निरंतर जल आपूर्ति आवश्यक है।",
      "धान के खेत जल संरक्षण के कारण चावल के लिए उपयुक्त होते हैं।",
      "निराई और समय पर उर्वरक देना उपज बढ़ाता है।"
    ],
    marathi: [
      "तांदूळ जास्त आर्द्रता, मुबलक पाणी आणि सुपीक माती असलेल्या भागांमध्ये सर्वोत्तम उगवतो.",
      "प्रारंभिक वाढीच्या टप्प्यात पाण्याचा नियमित पुरवठा आवश्यक असतो.",
      "पाण्याचा साठा होणारे भातखच्चर क्षेत्र तांदळासाठी योग्य असतात.",
      "नियमित खुरपणी व खत वापरल्याने उत्पादन वाढते."
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
          <Ionicons name="volume-high" size={28} color="#3F51B5" />
        </TouchableOpacity>

        <Image
          source={require("./assets/CROP_RICE.jpeg")}
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
    backgroundColor: "#E8EAF6",
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
});
