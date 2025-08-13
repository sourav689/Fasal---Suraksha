import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function LocationWeather({ route, navigation }) {
  const { selectedLanguage } = route.params || {}; // Fallback if selectedLanguage is undefined

  // Check if selectedLanguage is undefined
  if (!selectedLanguage) {
    return <Text style={styles.errorText}>Language not selected! Please go back and select a language.</Text>;
  }

  // Translations
  const translations = {
    hindi: { next: 'अगला' },
    english: { next: 'Next' },
    marathi: { next: 'पुढे' },
  };

  const translate = (key) => translations[selectedLanguage]?.[key] || translations.english[key];

  const [locationPermission, setLocationPermission] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Request location permission
  const askForLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
      setLocationPermission(false);
      return;
    }
    setLocationPermission(true);
    getLocation();
  };

  // Get the user's current location
  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      getWeather(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      setErrorMessage('Error fetching location');
    }
  };

  // Fetch weather data
  const getWeather = async (latitude, longitude) => {
    const apiKey = "28be9af80f61313f64b21ca62a8af4a4";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      setErrorMessage('Error fetching weather data');
    }
  };

  useEffect(() => {
    if (locationPermission === null) {
      askForLocationPermission();
    }
  }, [locationPermission]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location and Weather</Text>
      {locationPermission === null ? (
        <Text>Requesting location permission...</Text>
      ) : locationPermission === false ? (
        <Text>{errorMessage}</Text>
      ) : (
        <>
          <Text>Location fetched successfully!</Text>
          <Text style={styles.subTitle}>Weather Information:</Text>
          {weatherData ? (
            <View style={styles.weatherContainer}>
              <Text>Location: {weatherData.name || 'N/A'}</Text>
              <Text>Temperature: {weatherData.main?.temp || 'N/A'}°C</Text>
              <Text>Weather: {weatherData.weather?.[0]?.description || 'N/A'}</Text>
            </View>
          ) : (
            <Text>Fetching weather data...</Text>
          )}
        </>
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomePage', { selectedLanguage })}
      >
        <Text style={styles.buttonText}>{translate('next')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 20,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});
