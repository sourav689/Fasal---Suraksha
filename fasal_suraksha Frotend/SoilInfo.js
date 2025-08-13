import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";

export default function SoilInfo({ route }) {
  const { selectedLanguage } = route.params || { selectedLanguage: "english" };

  const [soilReport, setSoilReport] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [pdfUri, setPdfUri] = useState(null);

  const translations = {
    hindi: {
      title: "मृदा परीक्षण रिपोर्ट",
      submit: "सबमिट करें",
      chooseFile: "फ़ाइल चुनें",
      camera: "कैमरा",
      gallery: "गैलरी",
      pdf: "पीडीएफ",
      uploaded: "अपलोड सफल रहा!",
    },
    english: {
      title: "Soil Testing Report",
      submit: "Submit",
      chooseFile: "Choose a file",
      camera: "Camera",
      gallery: "Gallery",
      pdf: "PDF",
      uploaded: "Uploaded Successfully!",
    },
    marathi: {
      title: "मृदा परीक्षण अहवाल",
      submit: "सादर करा",
      chooseFile: "फाइल निवडा",
      camera: "कॅमेरा",
      gallery: "गॅलरी",
      pdf: "पीडीएफ",
      uploaded: "यशस्वीरित्या अपलोड झाले!",
    },
  };

  const translate = (key) =>
    translations[selectedLanguage]?.[key] || translations.english[key];

  const handleSubmit = () => {
    console.log("Soil report submitted:", soilReport);
    console.log("Image Uri:", imageUri);
    console.log("PDF Uri:", pdfUri);
    Alert.alert(translate("uploaded"));
  };

  const handleCamera = async () => {
    const result = await launchCameraAsync();
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPdfUri(null); // Only one type allowed
    }
  };

  const handleGallery = async () => {
    const result = await launchImageLibraryAsync();
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPdfUri(null);
    }
  };

  const handlePdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (result.type === "success") {
      setPdfUri(result.uri);
      setImageUri(null);
    }
  };

  const isFileUploaded = !!(imageUri || pdfUri);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{translate("title")}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Soil Report Details"
          value={soilReport}
          onChangeText={(text) => setSoilReport(text)}
        />

        <Text style={styles.instruction}>{translate("chooseFile")}</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconBox} onPress={handleCamera}>
            <Ionicons name="camera" size={50} color="#4CAF50" />
            <Text style={styles.iconText}>{translate("camera")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBox} onPress={handleGallery}>
            <Ionicons name="image" size={50} color="#4CAF50" />
            <Text style={styles.iconText}>{translate("gallery")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBox} onPress={handlePdf}>
            <FontAwesome name="file-pdf-o" size={50} color="#4CAF50" />
            <Text style={styles.iconText}>{translate("pdf")}</Text>
          </TouchableOpacity>
        </View>

        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        )}
        {pdfUri && <Text style={styles.pdfText}>PDF Selected: {pdfUri}</Text>}

        <TouchableOpacity
          style={[
            styles.submitButton,
            !isFileUploaded && { backgroundColor: "#ccc" },
          ]}
          onPress={handleSubmit}
          disabled={!isFileUploaded}
        >
          <Text style={styles.submitButtonText}>{translate("submit")}</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: 20,
  },
  instruction: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconBox: {
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    marginTop: 8,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 20,
    resizeMode: "contain",
  },
  pdfText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: "#FF9800",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
