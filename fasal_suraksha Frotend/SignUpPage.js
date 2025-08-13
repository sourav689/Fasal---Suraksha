import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function SignUpPage({ navigation, route }) {
  const { selectedLanguage, userId } = route.params || { selectedLanguage: "english" };

  const translations = {
    hindi: {
      name: "नाम",
      mobile: "मोबाइल नंबर",
      otp: "ओटीपी",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      signUp: "साइन अप करें",
      success: "साइन अप सफल। कृपया लॉगिन करें।",
      invalidMobile: "कृपया मान्य मोबाइल नंबर दर्ज करें।",
      passwordsMismatch: "पासवर्ड मेल नहीं खाते।",
      incompleteForm: "कृपया सभी विवरण भरें।",
    },
    english: {
      name: "Name",
      mobile: "Mobile Number",
      otp: "OTP",
      username: "Username",
      password: "Password",
      confirmPassword: "Confirm Password",
      signUp: "Sign Up",
      success: "Sign up successful. Please log in.",
      invalidMobile: "Please enter a valid mobile number.",
      passwordsMismatch: "Passwords do not match.",
      incompleteForm: "Please fill in all details.",
    },
    marathi: {
      name: "नाव",
      mobile: "मोबाइल नंबर",
      otp: "ओटीपी",
      username: "वापरकर्तानाव",
      password: "संकेतशब्द",
      confirmPassword: "संकेतशब्दची पुष्टी करा",
      signUp: "साइन अप करा",
      success: "साइन अप यशस्वी. कृपया लॉगिन करा.",
      invalidMobile: "कृपया वैध मोबाइल नंबर प्रविष्ट करा.",
      passwordsMismatch: "संकेतशब्द जुळत नाहीत.",
      incompleteForm: "कृपया सर्व तपशील भरा.",
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    otp: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const translate = (key) => translations[selectedLanguage]?.[key] || translations.english[key];

  const handleSignUp = async () => {
    const { name, mobile, otp, username, password, confirmPassword } = formData;

    if (!name || !mobile || !otp || !username || !password || !confirmPassword) {
      Alert.alert(translate("incompleteForm"));
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      Alert.alert(translate("invalidMobile"));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(translate("passwordsMismatch"));
      return;
    }

    const payload = {
      userId,
      name,
      mobile,
      otp,
      username,
      password,
      confirmPassword,
      selectedLanguage,
    };

    console.log("Payload being sent to backend:", payload); // Debug log
    
    try {
      const response = await axios.post("http://192.168.1.51:5000/api/auth/signup", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        Alert.alert(translate("success"));
        navigation.navigate("LoginPage", { selectedLanguage }); // Navigate to LoginPage after successful signup
      } else {
        Alert.alert(response.data.message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      Alert.alert("Network error. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerText}>{translate("signUp")}</Text>
        {[
          "name",
          "mobile",
          "otp",
          "username",
          "password",
          "confirmPassword",
        ].map((field) => (
          <View key={field}>
            <Text style={styles.label}>{translate(field)}</Text>
            <TextInput
              style={styles.input}
              placeholder={translate(field)}
              value={formData[field]}
              onChangeText={(value) => handleChange(field, value)}
              secureTextEntry={["password", "confirmPassword"].includes(field)}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>{translate("signUp")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f7f9fc" },
  container: { flex: 1, padding: 20, justifyContent: "center" },
  headerText: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 8 },
  signUpButton: { backgroundColor: "#4caf50", padding: 15, alignItems: "center", borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
