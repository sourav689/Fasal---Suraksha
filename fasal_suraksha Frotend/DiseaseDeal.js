import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function DiseaseDeal({ route }) {
  const { selectedLanguage } = route.params;
  const navigation = useNavigation();

  const translations = {
    hindi: {
      heading: "बीमारी का पता लगाना",
      subHeading: "अपने क्षेत्र में अक्सर होने वाली बीमारी",
      symptoms: "लक्षण लिखें",
      upload: "संक्रमित फसल की छवि अपलोड करें",
      submit: "प्रस्तुत करें",
      camera: "तस्वीर खींचें",
      gallery: "तस्वीर संक्रामित करें",
    },
    english: {
      heading: "Disease Detection",
      subHeading: "Frequently occurred Disease in your area",
      symptoms: "Write symptoms",
      upload: "Upload Crop Image",
      submit: "Submit",
      camera: "Click Photo",
      gallery: "Upload Photo",
    },
    marathi: {
      heading: "आजार शोध",
      subHeading: "तुमच्या क्षेत्रात वारंवार होणारा आजार",
      symptoms: "लक्षणे लिहा",
      upload: "संक्रमित पिकाची छायाचित्र अपलोड करा",
      submit: "सबमिट करा",
      camera: "फोटो क्लिक करा",
      gallery: "फोटो अपलोड करा",
    },
  };

  const translate = (key) =>
    translations[selectedLanguage]?.[key] || translations.english[key];

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [symptomsText, setSymptomsText] = useState("");

  useEffect(() => {
    const getPermissions = async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status !== "granted" ||
        galleryPermission.status !== "granted"
      ) {
        alert("We need camera and gallery permissions to proceed");
      }
    };

    getPermissions();
  }, []);

  const pickImage = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    }

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    setIsLoading(true);

    // Add artificial delay of 3 to 5 seconds
    const bufferTime = Math.floor(Math.random() * 2000) + 3000; // Random between 3000 to 5000 ms

    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("file", {
          uri: selectedImage,
          name: "image.jpg",
          type: "image/jpeg",
        });
        
        const response = await fetch("http://192.168.1.51:8000/predict", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = await response.json();
        setIsLoading(false);

        if (data.error) {
          Alert.alert("Error", data.error);
        } else {
          handleNavigation(data.class);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Submission Error:", error);
        Alert.alert("Error", "Failed to connect to the server. Ensure your backend is running and reachable.");
      }
    }, bufferTime);
  };

  const handleNavigation = (className) => {
    switch (className) {
      case "Black Gram_Anthracnose":
        navigation.navigate("BlackGramAnthracnose");
        break;
      case "Black Gram_Healthy":
        navigation.navigate("BlackGramHealthy");
        break;
      case "Black Gram_Leaf Crinckle":
        navigation.navigate("BlackGramLeafCrinckle");
        break;
      case "Black Gram_Powdery Mildew":
        navigation.navigate("BlackGramPowderyMildew");
        break;
      case "Rice_Bacterial Blight":
        navigation.navigate("RiceBacterialBlight");
        break;
      case "Unknown":
      default:
        navigation.navigate("Unknown");
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{translate("heading")}</Text>
        <Text style={styles.subHeading}>{translate("subHeading")}</Text>

        <View style={styles.uploadContainer}>
          <Text style={styles.uploadText}>{translate("upload")}</Text>
          <View style={styles.uploadButtons}>
            <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(true)}>
              <MaterialIcons name="camera-alt" size={28} color="#4CAF50" />
              <Text style={styles.buttonText}>{translate("camera")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(false)}>
              <MaterialIcons name="photo-library" size={28} color="#2196F3" />
              <Text style={styles.buttonText}>{translate("gallery")}</Text>
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: selectedImage }} style={styles.image} />
            </View>
          )}
        </View>

        <Text style={styles.inputLabel}>{translate("symptoms")}</Text>
        <TextInput
          style={styles.inputBox}
          placeholder={translate("symptoms")}
          multiline
          value={symptomsText}
          onChangeText={setSymptomsText}
        />

        <TouchableOpacity
          style={[styles.submitButton, (!selectedImage || isLoading) && styles.disabledButton]}
          disabled={!selectedImage || isLoading}
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{translate("submit")}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#f4f4f4",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
    textAlign: "center",
  },
  uploadContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  uploadButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  uploadButton: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#eef",
  },
  buttonText: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
    textAlign: "center",
  },
  imagePreview: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "contain",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputBox: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#dcdcdc",
  },
});
