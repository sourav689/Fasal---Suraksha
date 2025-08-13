import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AdminHomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page</Text>
      <Button
        title="Check NDVI"
        onPress={() => {
          // Handle checking NDVI
          console.log('Checking NDVI...');
          // Navigate to NDVI check screen or perform other actions
        }}
        color="#4CAF50" // Green background
      />
      <Button
        title="Take Action"
        onPress={() => {
          // Handle taking action
          console.log('Taking action...');
          // Navigate to action screen or perform other actions
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AdminHomePage;