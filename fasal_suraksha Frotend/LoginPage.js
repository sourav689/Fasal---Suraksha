import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage({ route, navigation }) {
  const { selectedLanguage } = route.params || { selectedLanguage: "english" };

  const translations = {
    hindi: {
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      proceed: "आगे बढ़ें",
      incorrect: "गलत उपयोगकर्ता नाम या पासवर्ड! कृपया पुनः प्रयास करें।",
      enterDetails: "कृपया अपना उपयोगकर्ता नाम और पासवर्ड दर्ज करें।",
      success: "सत्यापन सफल। कृपया आगे बढ़ें।",
      noAccount: "खाता नहीं है? साइन अप करें।",
    },
    english: {
      username: "Username",
      password: "Password",
      proceed: "Proceed Further",
      incorrect: "Incorrect username or password! Please try again.",
      enterDetails: "Please enter your username and password.",
      success: "Verification successful. Please proceed.",
      noAccount: "Don't have an account? Sign Up.",
    },
    marathi: {
      username: "वापरकर्ता नाव",
      password: "संकेतशब्द",
      proceed: "पुढे जा",
      incorrect: "चुका वापरकर्ता नाव किंवा संकेतशब्द! कृपया पुन्हा प्रयत्न करा.",
      enterDetails: "कृपया आपले वापरकर्ता नाव आणि संकेतशब्द भरा.",
      success: "सत्यापन यशस्वी. कृपया पुढे जा.",
      noAccount: "खाते नाही? साइन अप करा.",
    },
  };

  const translate = (key) =>
    translations[selectedLanguage]?.[key] || translations.english[key];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  

  const handleProceed = async () => {
    
    try {
      console.log("Initiating login with:", { username, password });


      const response = await fetch("http://192.168.1.51:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();
      console.log("Server Response:", responseData);

      if (!response.ok) {
        console.error("Login failed:", responseData.message);
        Alert.alert(translate("incorrect"));
        return;
      }
      const { userId, selectedLanguage, mobile } = responseData;

      Alert.alert(translate("success"));
      navigation.navigate("KissanIDPage", {
        userId,
        selectedLanguage,
        mobile,
      });
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Network error. Please try again.");
    }
  };

  const isProceedEnabled = username.trim() && password.trim();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerText}>{translate("enterDetails")}</Text>
        <Text style={styles.label}>{translate("username")}</Text>
        <TextInput
          style={styles.input}
          placeholder={translate("username")}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>{translate("password")}</Text>
        <TextInput
          style={styles.input}
          placeholder={translate("password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[
            styles.proceedButton,
            !isProceedEnabled && styles.disabledButton,
          ]}
          onPress={handleProceed}
          disabled={!isProceedEnabled}
        >
          <Text style={styles.buttonText}>{translate("proceed")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SignUpPage", { selectedLanguage })
          }
        >
          <Text style={styles.signUpLink}>{translate("noAccount")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f7fa" },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 20,
  },
  label: { fontSize: 16, marginBottom: 5, color: "#555555" },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  proceedButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  disabledButton: { backgroundColor: "#b0bec5" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  signUpLink: {
    marginTop: 15,
    color: "#1e88e5",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
