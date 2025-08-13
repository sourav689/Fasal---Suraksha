import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios"; // Axios for API calls

export default function LanguageSelectionPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigation = useNavigation();

  // Translations for different languages
  const translations = {
    hindi: {
      welcome: "नमस्ते! 🙏",
      chooseLanguage: "अपनी भाषा चुनें",
      help: "मदद के लिए इसे दबाएं",
      learn: "उपयोग करना सीखें",
      accept: "स्वीकार करें",
    },
    english: {
      welcome: "Namaste! 🙏",
      chooseLanguage: "Choose your language",
      help: "Press this for help",
      learn: "Learn how to use",
      accept: "Accept",
    },
    marathi: {
      welcome: "नमस्कार! 🙏",
      chooseLanguage: "तुमची भाषा निवडा",
      help: "मदतीसाठी हे दाबा",
      learn: "वापरण्यास शिका",
      accept: "स्वीकारा",
    },
  };

  // Translation function
  const translate = (key) =>
    translations[selectedLanguage]?.[key] || translations.english[key];

  // Handle language selection
  const handleLanguageSelect = (langKey) => {
    setSelectedLanguage(langKey);
  };

  // Save language preference and generate user ID
  const saveLanguagePreference = async () => {
    if (!selectedLanguage) {
      Alert.alert("Error", "Please select a language before proceeding.");
      return;
    }

    const payload = {
      selectedLanguage, // Sending selected language
    };
    

    try {
      
      // Replace `localhost` with the correct IP if running on a physical device
      const response = await axios.post(
        `http://192.168.1.51:5000/api/languageSelection`, // For Android Emulator
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      

      if (response.status === 201) {
        const { userId } = response.data; // Get the unique user ID from response
        // Pass the selected language and user ID to the LoginPage
        navigation.navigate("LoginPage", {
          selectedLanguage,
          userId,
        });
      } else {
        Alert.alert("Error", response.data.message || "Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving language preference:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Handle the accept button press
  const handleAccept = () => {
    saveLanguagePreference();
  };

  // Available languages for selection
  const languages = [
    { key: "hindi", label: "हिंदी" },
    { key: "english", label: "English" },
    { key: "marathi", label: "मराठी" },
    { key: "gujarati", label: "ગુજરાતી" },
    { key: "tamil", label: "தமிழ்" },
    { key: "telugu", label: "తెలుగు" },
    { key: "kannada", label: "ಕನ್ನಡ" },
    { key: "urdu", label: "اردو" },
    { key: "bengali", label: "বাংলা" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>{translate("welcome")}</Text>
        <Text style={styles.subText}>{translate("chooseLanguage")}</Text>
        <View style={styles.languagesContainer}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.key}
              style={[
                styles.languageButton,
                selectedLanguage === language.key && styles.selectedLanguage,
              ]}
              onPress={() => handleLanguageSelect(language.key)}
            >
              <Text style={styles.languageText}>{language.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[
            styles.acceptButton,
            !selectedLanguage && styles.disabledAcceptButton,
          ]}
          disabled={!selectedLanguage}
          onPress={handleAccept}
        >
          <Text style={styles.acceptText}>{translate("accept")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  subText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  languageButton: {
    width: width * 0.3,
    height: 50,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
  },
  selectedLanguage: {
    backgroundColor: "#e0ffe0",
  },
  languageText: {
    fontSize: 14,
    textAlign: "center",
  },
  acceptButton: {
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    backgroundColor: "green",
  },
  disabledAcceptButton: {
    backgroundColor: "gray",
  },
  acceptText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
