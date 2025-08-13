import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Prediction = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Allow access to the gallery to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Allow access to the camera to capture images.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const sendImageToBackend = async () => {
    if (!selectedImage) {
      Alert.alert('No Image Selected', 'Please select or capture an image first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('http://192.168.1.51:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        Alert.alert('Error', data.error);
      } else {
        setPredictionResult(`Predicted Class: ${data.class}\nConfidence: ${(data.confidence * 100).toFixed(2)}%`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server. Ensure your backend is running.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Disease Detection</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={captureImage}>
          <Text style={styles.buttonText}>Capture Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={sendImageToBackend}>
        <Text style={styles.submitButtonText}>Submit for Prediction</Text>
      </TouchableOpacity>

      {predictionResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{predictionResult}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#388E3C',
    textAlign: 'center',
  },
});

export default Prediction;
