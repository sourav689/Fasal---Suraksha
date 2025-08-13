import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KissanIDPage({ route, navigation }) {
  const { userId, selectedLanguage, mobile } = route.params || {};

  const translations = {
    hindi: {
      kissanID: "किसान आईडी",
      submit: "जमा करें",
      success: "किसान आईडी सफलतापूर्वक भेजा गया!",
      enterID: "कृपया 12 अंकों का किसान आईडी दर्ज करें",
      skip: "विचलित करें",
    },
    english: {
      kissanID: "Kissan ID",
      submit: "Submit",
      success: "Kissan ID submitted successfully!",
      enterID: "Please enter the 12-digit Kissan ID",
      skip: "Skip",
    },
    marathi: {
      kissanID: "किसान आयडी",
      submit: "जमा करा",
      success: "किसान आयडी यशस्वीपणे सादर केला गेला!",
      enterID: "कृपया 12 अंकी किसान आयडी प्रविष्ट करा",
      skip: "वगळा",
    },
  };

  const translate = (key) =>
    translations[selectedLanguage]?.[key] || translations.english[key];

  const [kissanID, setKissanID] = useState("");

  const handleIDChange = (text) => {
    if (/^\d*$/.test(text)) {
      setKissanID(text);
    }
  };

  const handleSubmit = async () => {
    if (kissanID.length === 12) {
      try {
        const response = await fetch("http://192.168.1.51:5000/api/kissanID", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ kissanID, userId, selectedLanguage }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert(translate("success"));
          navigation.navigate("HomePage", {
            selectedLanguage,
            mobile,
          });
        } else {
          Alert.alert(data.message || "Failed to save Kissan ID. Please try again.");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    } else {
      Alert.alert(translate("enterID"));
    }
  };

  const handleSkip = () => {
    navigation.navigate("HomePage", {
      selectedLanguage,
      mobile,
    });
  };

  const isSubmitEnabled = kissanID.length === 12;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>{translate("kissanID")}</Text>
        <Image
          source={require("./assets/real_farmer.png")}
          style={styles.farmerImage}
        />
        <TextInput
          style={styles.input}
          placeholder={translate("enterID")}
          value={kissanID}
          onChangeText={handleIDChange}
          keyboardType="numeric"
          maxLength={12}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, isSubmitEnabled && styles.submitButtonEnabled]}
            onPress={handleSubmit}
            disabled={!isSubmitEnabled}
          >
            <Text style={styles.buttonText}>{translate("submit")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.buttonText}>{translate("skip")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  farmerImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: "cover",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    width: "100%",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  submitButtonEnabled: {
    backgroundColor: "#4CAF50",
  },
  skipButton: {
    flex: 1,
    backgroundColor: "#87CEEB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
