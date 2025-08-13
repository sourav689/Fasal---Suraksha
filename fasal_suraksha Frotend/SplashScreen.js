import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0); // For opacity
  const scaleAnim = new Animated.Value(0.5); // For scaling

  useEffect(() => {
    // Start the animation sequence
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500, // 1.5 seconds for fade-in
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500, // 1.5 seconds for scaling
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to LanguageSelectionPage after 5 seconds
    const timer = setTimeout(() => {
      navigation.replace('LanguageSelectionPage'); // Navigate to the next screen
    }, 5000); // Wait for 5 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Image
          source={require('./assets/splash_logo.png')} // Replace with your logo image path
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCF596', // Background color
  },
  logoContainer: {
    width: 200, // Adjust to fit your logo size
    height: 200, // Adjust to fit your logo size
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%', // Make the logo fit inside the container
    height: '100%', // Make the logo fit inside the container
    resizeMode: 'contain', // Ensure the logo scales proportionally
  },
});

export default SplashScreen;
