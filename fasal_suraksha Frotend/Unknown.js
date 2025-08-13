import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function Unknown() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./assets/alert.jpg')} // Replace with your image path
        style={styles.image}
      />
      <Text style={styles.heading}>Unknown Disease</Text>
      <Text style={styles.content}>
        {/* Add content about unknown disease */}
        We couldn't identify the disease from the image. Please check the uploaded image for accuracy.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
