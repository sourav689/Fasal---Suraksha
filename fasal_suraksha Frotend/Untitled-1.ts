import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageSelection = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct reference to image media type
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      alert("Error selecting image.");
    }
  };

  const handlePrediction = async () => {
    if (!imageUri) {
      alert("Please select an image first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg", // Adjust this based on image type
        name: "image.jpg",
      });

      const serverUrl = "http://192.168.0.167:8000/predict"; // Replace <your-server-ip> with the server's IP

      const response = await axios.post(serverUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction(
        `Class: ${response.data.class}, Confidence: ${(
          response.data.confidence * 100
        ).toFixed(2)}%`
      );
    } catch (error) {
      console.error("Prediction error:", error);
      alert("An error occurred while predicting. Ensure the server is running.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crop Disease Prediction</Text>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No Image Selected</Text>
      )}

      <Button title="Select Image" onPress={handleImageSelection} />
      <Button title="Predict" onPress={handlePrediction} />

      {prediction && <Text style={styles.result}>{prediction}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  placeholder: {
    fontSize: 16,
    color: "gray",
    marginVertical: 20,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});
