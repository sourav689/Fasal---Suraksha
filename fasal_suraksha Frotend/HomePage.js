import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    ScrollView,
    Dimensions,
    Platform,
    StatusBar,
    Image,
    ActivityIndicator,
    RefreshControl,
    Alert, // Import Alert for error handling
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

// --- Configuration ---
const OPENWEATHERMAP_API_KEY = "5b6b8beb8edf6a016dd29a418dbe0946"; // Your OpenWeatherMap Key - MAKE SURE THIS IS CORRECT
const SMS_API_ENDPOINT = "http://192.168.1.51:3000/send-sms"; // Ensure this is correct and reachable from your device

// --- Translations ---
const translations = {
    hindi: {
        userName: "उपयोगकर्ता",
        diseaseDeal: "रोग निदान",
        soilInfo: "मिट्टी की जानकारी",
        cultivationTips: "खेती के सुझाव",
        kissanYojna: "किसान योजना",
        forHelp: "सहायता हेतु",
        contacts: "संपर्क",
        weather: "मौसम",
        location: "स्थान",
        temperature: "तापमान",
        humidity: "नमी",
        wind: "हवा",
        fetchingWeather: "मौसम ला रहा है...",
        fetchingLocation: "स्थान ला रहा है...",
        fetchError: "जानकारी प्राप्त करने में त्रुटि",
        noPermission: "स्थान अनुमति अस्वीकृत",
        adviceDefault: "अपनी फसल की स्थिति जांचें।",
        adviceHot: "बहुत गरम! फसलों को पर्याप्त पानी दें।",
        adviceCold: "ठंड का खतरा! फसलों को पाले से बचाएं।",
        adviceRain: "बारिश हो रही है। जल निकासी की जाँच करें।",
        adviceGoodSowing: "मौसम बुवाई के लिए अनुकूल है।",
        adviceModerate: "मौसम ठीक है। नियमित देखभाल जारी रखें।",
        adviceWindy: "तेज हवा! नाजुक फसलों को सहारा दें।",
        pullToRefresh: "ताज़ा करने के लिए नीचे खींचें",
        gettingLocationName: "स्थान का नाम मिल रहा है...",
        errorOpeningLinkTitle: "लिंक खोलने में त्रुटि",
        errorOpeningLinkMessage: "यह लिंक नहीं खोला जा सका। कृपया सुनिश्चित करें कि आपके पास एक वेब ब्राउज़र स्थापित है।",
        invalidApiKey: "अमान्य API कुंजी या सदस्यता समस्या",
        networkErrorWeather: "नेटवर्क त्रुटि: मौसम सेवा तक नहीं पहुंचा जा सकता",
        apiKeyConfigError: "API कुंजी कॉन्फ़िगरेशन त्रुटि",
        smsError: "SMS भेजने में त्रुटि",
        smsSkippedNoNumber: "कोई फ़ोन नंबर नहीं दिया गया, SMS छोड़ दिया गया।",
        smsSkippedIncompleteData: "SMS के लिए अपूर्ण डेटा, SMS छोड़ दिया गया।",
        unknownLocation: "अज्ञात स्थान",
    },
    english: {
        userName: "User Name",
        diseaseDeal: "Disease Diagnosis", // Updated name slightly
        soilInfo: "Soil Info",
        cultivationTips: "Cultivation Tips",
        kissanYojna: "Farmer Schemes", // Updated name slightly
        forHelp: "For Help",
        contacts: "Contacts",
        weather: "Weather",
        location: "Location",
        temperature: "Temperature",
        humidity: "Humidity",
        wind: "Wind",
        fetchingWeather: "Fetching weather...",
        fetchingLocation: "Fetching location...",
        fetchError: "Error fetching information",
        noPermission: "Location permission denied",
        adviceDefault: "Check your crop status.",
        adviceHot: "Very hot! Ensure crops have enough water.",
        adviceCold: "Risk of cold! Protect crops from frost.",
        adviceRain: "It's raining. Check drainage.",
        adviceGoodSowing: "Weather is favorable for sowing.",
        adviceModerate: "Weather is moderate. Continue regular care.",
        adviceWindy: "Windy conditions! Support delicate crops.",
        pullToRefresh: "Pull down to refresh",
        gettingLocationName: "Getting location name...",
        errorOpeningLinkTitle: "Error Opening Link",
        errorOpeningLinkMessage: "Could not open this link. Please ensure you have a web browser installed.",
        invalidApiKey: "Invalid API Key or Subscription Issue",
        networkErrorWeather: "Network Error: Cannot reach weather service",
        apiKeyConfigError: "API Key Configuration Error",
        smsError: "SMS sending error",
        smsSkippedNoNumber: "No phone number provided, skipping SMS.",
        smsSkippedIncompleteData: "Incomplete data for SMS, skipping.",
        unknownLocation: "Unknown Location",
    },
    marathi: {
        userName: "वापरकर्ता नाव",
        diseaseDeal: "रोग निदान",
        soilInfo: "मातीची माहिती",
        cultivationTips: "लागवड टिप्स",
        kissanYojna: "शेतकरी योजना", // Updated name slightly
        forHelp: "मदतीसाठी",
        contacts: "संपर्क",
        weather: "हवामान",
        location: "स्थान",
        temperature: "तापमान",
        humidity: "आर्द्रता",
        wind: "वारा",
        fetchingWeather: "हवामान आणत आहे...",
        fetchingLocation: "स्थान आणत आहे...",
        fetchError: "माहिती मिळवण्यात त्रुटी",
        noPermission: "स्थान परवानगी नाकारली",
        adviceDefault: "तुमच्या पिकाची स्थिती तपासा.",
        adviceHot: "खूप गरम! पिकांना पुरेसे पाणी द्या.",
        adviceCold: "थंडीचा धोका! पिकांचे संरक्षण करा.",
        adviceRain: "पाऊस पडत आहे. पाण्याची निचरा तपासा.",
        adviceGoodSowing: "हवामान पेरणीसाठी अनुकूल आहे.",
        adviceModerate: "हवामान मध्यम आहे. नियमित काळजी घ्या.",
        adviceWindy: "जोरदार वारे! नाजूक पिकांना आधार द्या.",
        pullToRefresh: "रिफ्रेश करण्यासाठी खाली ओढा",
        gettingLocationName: "स्थानाचे नाव मिळत आहे...",
        errorOpeningLinkTitle: "लिंक उघडण्यात त्रुटी",
        errorOpeningLinkMessage: "ही लिंक उघडता आली नाही. कृपया खात्री करा की आपल्याकडे वेब ब्राउझर स्थापित आहे.",
        invalidApiKey: "अवैध API की किंवा सदस्यता समस्या",
        networkErrorWeather: "नेटवर्क त्रुटी: हवामान सेवेपर्यंत पोहोचता येत नाही",
        apiKeyConfigError: "API की कॉन्फिगरेशन त्रुटी",
        smsError: "SMS पाठवण्यात त्रुटी",
        smsSkippedNoNumber: "फोन नंबर दिलेला नाही, SMS वगळला.",
        smsSkippedIncompleteData: "SMS साठी अपूर्ण डेटा, SMS वगळला.",
        unknownLocation: "अज्ञात स्थान",
    },
};

// --- Helper Function for Weather Advice ---
const getWeatherAdvice = (weatherData, t) => {
    if (!weatherData) return t.adviceDefault;
    const temp = weatherData.main?.temp;
    const description = weatherData.weather?.[0]?.main?.toLowerCase();
    const windSpeed = weatherData.wind?.speed;

    // Prioritize rain
    if (description?.includes("rain") || description?.includes("drizzle") || description?.includes("thunderstorm")) return t.adviceRain;
    // Then temperature extremes
    if (temp > 35) return t.adviceHot;
    if (temp < 10) return t.adviceCold;
    // Then wind
    if (windSpeed > 10) return t.adviceWindy; // Approx 36 km/h or 22 mph
    // Favorable conditions
    if (temp >= 18 && temp <= 30 && (description === "clear" || description?.includes("cloud"))) return t.adviceGoodSowing;
    // Default moderate
    return t.adviceModerate;
};

// --- Helper function to safely open links ---
const openLink = async (url, t) => {
    try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error(`Don't know how to open this URL: ${url}`);
            Alert.alert(t.errorOpeningLinkTitle, t.errorOpeningLinkMessage);
        }
    } catch (error) {
        console.error("Error opening URL:", error);
        Alert.alert(t.errorOpeningLinkTitle, t.errorOpeningLinkMessage);
    }
};


export default function HomePage({ route, navigation }) {
    // Set default language if not provided
    const { selectedLanguage = 'english', mobile } = route.params || {};
    const t = translations[selectedLanguage] || translations.english; // Fallback to English if language not found

    const [location, setLocation] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [locationErrorMsg, setLocationErrorMsg] = useState(null);
    const [weatherErrorMsg, setWeatherErrorMsg] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);
    const [isLoadingName, setIsLoadingName] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // --- Reverse Geocode Function ---
    const getReverseGeocodedName = useCallback(async (lat, lon) => {
        if (!lat || !lon) return null;
        setIsLoadingName(true);
        try {
            // Request permission again inside geocode just in case it changed
            let { status } = await Location.requestForegroundPermissionsAsync();
             if (status !== "granted") {
                  console.warn("Reverse geocoding needs location permission.");
                  setIsLoadingName(false);
                  setLocationName(t.noPermission); // Indicate permission issue here too
                  return null;
             }

            let result = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
            if (result && result.length > 0) {
                const { city, district, region, subregion, name } = result[0];
                // Prioritize more specific names
                const foundName = city || district || subregion || name || region || null;
                console.log("Reverse Geocode Result:", foundName);
                setLocationName(foundName);
                setIsLoadingName(false);
                return foundName;
            } else {
                 console.log("Reverse Geocode: No results found.");
                 setLocationName(null); // Set to null if no name found
            }
        } catch (error) {
            console.error("Reverse geocoding error:", error);
             setLocationName(null); // Set to null on error
        }
        setIsLoadingName(false);
        return null;
    }, [t.noPermission]);


    // --- Fetch Location ---
    const fetchLocation = useCallback(async () => {
       setIsLoadingLocation(true);
       setLocationErrorMsg(null);
       setLocation(null);
       setLocationName(null); // Reset location name on new fetch
       console.log("Requesting location permission...");
       let { status } = await Location.requestForegroundPermissionsAsync();
       if (status !== "granted") {
           console.error("Location permission denied");
           setLocationErrorMsg(t.noPermission);
           setIsLoadingLocation(false);
           return null;
       }
       try {
           console.log("Getting current position...");
           // Use a slightly lower accuracy for faster results, balanced is usually good enough
           let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
           console.log("Location obtained:", loc.coords);
           setLocation(loc);
           // Don't await geocoding here, let it run in parallel with weather fetch
           getReverseGeocodedName(loc.coords.latitude, loc.coords.longitude);
           setIsLoadingLocation(false);
           return loc;
       } catch (error) {
           console.error("Error getting location:", error);
           // Provide more specific error feedback if possible
           if (error.code === 'E_LOCATION_SETTINGS_UNSATISFIED') {
                setLocationErrorMsg(t.noPermission + " (Check GPS/Location Services)");
           } else {
                setLocationErrorMsg(t.fetchError + " (Location)");
           }
           setIsLoadingLocation(false);
           return null;
       }
    }, [t.noPermission, t.fetchError, getReverseGeocodedName]);

    // --- Send SMS ---
    const sendSMS = useCallback(async (lat, lon, temp, locName) => {
        const targetPhoneNumber = mobile;
        if (!targetPhoneNumber) {
            console.warn(t.smsSkippedNoNumber);
            return;
        }
        if (temp === undefined || temp === null || !lat || !lon) {
            console.warn(t.smsSkippedIncompleteData, { temp, lat, lon });
            return;
        }
        // Use a default location name if still loading or failed
         const nameToSend = locName || t.unknownLocation;

        console.log(`Calling SMS endpoint for ${nameToSend} - Temp: ${temp}°C - Target: ${targetPhoneNumber}`);
        try {
            const response = await axios.post(SMS_API_ENDPOINT, {
                phoneNumber: targetPhoneNumber,
                temperature: temp, // Send temperature as number
                location: nameToSend,
                lat: lat, // Optionally send coordinates
                lon: lon,
            }, { timeout: 10000 }); // Add a timeout
            console.log("SMS endpoint call successful. Server response:", response.data?.message || response.status);
        } catch (error) {
            let errorMessage = t.smsError;
            if (error.response) {
                // Server responded with a status code outside 2xx
                console.error("SMS sending error (Server Response):", error.response.status, error.response.data);
                errorMessage += ` (Server: ${error.response.status})`;
            } else if (error.request) {
                // Request was made but no response received (e.g., timeout, network issue)
                console.error("SMS sending error (No Server Response):", error.request);
                errorMessage += " (Network Error)";
            } else {
                // Error setting up the request
                console.error("SMS sending error (Request Setup):", error.message);
                errorMessage += " (Setup Error)";
            }
            console.warn(errorMessage); // Log as warning, maybe not critical failure
            // Optionally show an alert or toast message to the user here if needed
            // Alert.alert("SMS Info", errorMessage);
        }
    }, [mobile, t.smsError, t.smsSkippedNoNumber, t.smsSkippedIncompleteData, t.unknownLocation]);

    // --- Fetch Weather ---
    const fetchWeather = useCallback(async (lat, lon) => {
        if (!lat || !lon) return;
        setIsLoadingWeather(true);
        setWeatherErrorMsg(null);
        setWeatherData(null); // Clear old weather data
        console.log(`Fetching weather for Lat: ${lat}, Lon: ${lon}`);

        // API Key Validation
        if (!OPENWEATHERMAP_API_KEY || OPENWEATHERMAP_API_KEY === "YOUR_OPENWEATHERMAP_API_KEY" || OPENWEATHERMAP_API_KEY.length < 20) {
             console.error("OpenWeatherMap API Key is missing, placeholder, or invalid!");
             setWeatherErrorMsg(t.apiKeyConfigError);
             setIsLoadingWeather(false);
             return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric&lang=${selectedLanguage}`;
            const response = await axios.get(url, { timeout: 15000 }); // Add timeout
            console.log("Weather API Response Status:", response.status);
            // console.log("Weather API Response Data:", response.data); // Log full data only if needed for debug
            setWeatherData(response.data);

             // Attempt to send SMS *after* weather data is successfully fetched
             if (response.data?.main?.temp !== undefined && response.data?.main?.temp !== null) {
                // Attempt to get the name from weather data first, fallback to geocoded name
                const nameFromWeather = response.data.name;
                 // Wait a brief moment to allow potential geocoding to finish if it's still running
                 await new Promise(resolve => setTimeout(resolve, 100)); // Adjust delay if needed
                 const finalLocationName = nameFromWeather || locationName; // Use weather name > geocoded name
                sendSMS(lat, lon, response.data.main.temp, finalLocationName);
             } else {
                 console.warn(t.smsSkippedIncompleteData + " (Weather Temp Missing)");
             }

        } catch (error) {
             let errorMsg = t.fetchError + " (Weather)";
             if (error.response) {
                 console.error("Error fetching weather (Data):", error.response.data);
                 console.error("Error fetching weather (Status):", error.response.status);
                 if (error.response.status === 401) {
                     errorMsg = t.invalidApiKey;
                 } else if (error.response.status === 404) {
                     errorMsg = t.fetchError + ` (Location Not Found: ${lat},${lon})`;
                 } else if (error.response.status === 429) {
                      errorMsg = t.fetchError + " (API Limit Reached)";
                 } else {
                      errorMsg = `${t.fetchError} (Server: ${error.response.status})`;
                 }
             } else if (error.request) {
                 console.error("Error fetching weather (Request):", error.request);
                 errorMsg = t.networkErrorWeather;
             } else {
                 console.error("Error fetching weather (Message):", error.message);
                  errorMsg = t.fetchError + " (Setup Error)";
             }
             setWeatherErrorMsg(errorMsg);
             console.error("Weather fetch failed:", errorMsg);
        } finally {
            setIsLoadingWeather(false);
        }
    }, [t, selectedLanguage, locationName, sendSMS]); // Added 't' to dependencies


    // --- Load Data Function ---
    const loadData = useCallback(async (isRefresh = false) => {
        console.log(`Loading data... Refresh: ${isRefresh}`);
        // Reset errors only if it's a refresh action
        if (isRefresh) {
            setWeatherErrorMsg(null);
            setLocationErrorMsg(null);
        }

        const loc = await fetchLocation();
        if (loc?.coords) {
            // Fetch weather immediately using obtained coordinates
            await fetchWeather(loc.coords.latitude, loc.coords.longitude);
        } else {
             // If location failed, don't try to fetch weather
             if (!locationErrorMsg) { // Set a generic error if fetchLocation didn't set one
                setLocationErrorMsg(t.fetchError + " (Location)");
             }
             setIsLoadingWeather(false); // Ensure weather loading stops
             setIsLoadingName(false); // Ensure name loading stops
             console.log("Location fetch failed, skipping weather fetch.");
        }
    }, [fetchLocation, fetchWeather, locationErrorMsg, t.fetchError]);


    // --- Initial Load Effect ---
    useEffect(() => {
        console.log("HomePage Mounted. Mobile:", mobile, "Lang:", selectedLanguage);
        loadData(false); // Initial load is not a refresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadData]); // Run only once on mount based on loadData identity

     // --- Pull-to-Refresh Handler ---
    const onRefresh = useCallback(async () => {
        console.log("Refreshing data...");
        setIsRefreshing(true);
        await loadData(true); // Pass true to indicate it's a refresh
        setIsRefreshing(false);
        console.log("Refresh complete.");
    }, [loadData]);

    // --- Render Helper: Weather Card ---
    const renderWeatherCard = () => {
        let content;
        // Determine the best location string to display
        let displayLocation = t.fetchingLocation;
        if (locationErrorMsg) {
            displayLocation = "---"; // Don't show coordinates if location errored
        } else if (weatherData?.name) {
            displayLocation = weatherData.name; // Prefer name from weather API
        } else if (!isLoadingName && locationName) {
            displayLocation = locationName; // Use geocoded name if available
        } else if (isLoadingName) {
             displayLocation = t.gettingLocationName;
        } else if (location?.coords) {
            // Fallback to coordinates if names aren't available yet/failed
            displayLocation = `${location.coords.latitude.toFixed(2)}, ${location.coords.longitude.toFixed(2)}`;
        } else if (isLoadingLocation) {
             displayLocation = t.fetchingLocation;
        } else {
             displayLocation = "---"; // Default if no location info at all
        }


        if (isLoadingLocation && !isRefreshing && !location) {
             // Show main loader only during initial location fetch
             content = (
                 <View style={styles.weatherLoadingContainer}>
                     <ActivityIndicator size="large" color="#FFFFFF" />
                     <Text style={[styles.weatherText, { color: '#FFFFFF', marginTop: 10 }]}>{t.fetchingLocation}</Text>
                 </View>
             );
        } else if (locationErrorMsg && !isRefreshing && !location) {
             // Show location error prominently if location failed completely
             content = (
                 <View style={styles.weatherContent}>
                     <Feather name="alert-triangle" size={30} color="#FFEBEE" style={{ marginBottom: 10 }}/>
                     <Text style={[styles.errorText, { color: '#FFFFFF' }]}>{locationErrorMsg}</Text>
                 </View>
             );
        } else {
             // We have location (or attempting refresh) or a location error but maybe old data exists
             content = (
                 <View style={styles.weatherContent}>
                     {/* Location Row - Always show this row if past initial load */}
                      <View style={[styles.weatherRow, styles.locationRow]}>
                         <Feather name="map-pin" size={16} color="#FFFFFF" style={{ opacity: locationErrorMsg ? 0.5 : 1 }}/>
                         <Text style={[styles.locationTextValue, { color: '#FFFFFF', opacity: locationErrorMsg ? 0.7 : 1 }]}>{displayLocation}</Text>
                     </View>

                     {/* Weather/Error/Loading Section */}
                     {isRefreshing && !weatherData && !weatherErrorMsg && (
                         <ActivityIndicator size="small" color="#FFFFFF" style={{marginTop: 20}}/>
                     )}
                     {isLoadingWeather && !isRefreshing && !weatherData && (
                         <View style={styles.weatherLoadingContainer}>
                             <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 10 }} />
                             <Text style={[styles.weatherText, { color: '#FFFFFF' }]}>{t.fetchingWeather}</Text>
                         </View>
                     )}
                     {weatherErrorMsg && (
                          <View style={styles.weatherErrorContent}>
                               <Feather name="cloud-off" size={24} color="#FFEBEE" style={{ marginBottom: 8 }}/>
                              <Text style={[styles.errorText, { color: '#FFFFFF', marginTop: 0 }]}>{weatherErrorMsg}</Text>
                          </View>
                     )}
                     {weatherData && (
                          <>
                             <View style={[styles.weatherRow, styles.tempIconRow]}>
                                 {weatherData.weather?.[0]?.icon ? (
                                      <Image
                                         source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
                                         style={styles.weatherIcon}
                                         onError={(e) => console.log("Error loading weather icon:", e.nativeEvent.error)}
                                      />
                                 ) : (
                                    <View style={styles.weatherIconPlaceholder} /> // Placeholder if no icon
                                 )}
                                 <Text style={styles.temperatureText}>{Math.round(weatherData.main?.temp ?? 0)}°C</Text>
                                 <Text style={styles.weatherDescription}>{weatherData.weather?.[0]?.description || ""}</Text>
                             </View>
                             <View style={styles.weatherDetailsRow}>
                                 <View style={styles.detailItem}>
                                     <Feather name="droplet" size={14} color="#FFFFFF" style={styles.detailIcon}/>
                                     <Text style={styles.weatherDetailText}>{t.humidity}: {weatherData.main?.humidity}%</Text>
                                 </View>
                                 <View style={styles.detailSeparator} />
                                 <View style={styles.detailItem}>
                                     <Feather name="wind" size={14} color="#FFFFFF" style={styles.detailIcon}/>
                                     <Text style={styles.weatherDetailText}>{t.wind}: {weatherData.wind?.speed} m/s</Text>
                                 </View>
                             </View>
                             {getWeatherAdvice(weatherData, t) && (
                                 <View style={styles.adviceContainer}>
                                     <Feather name="info" size={15} color="#E8F5E9" style={{ opacity: 0.9, marginRight: 8 }} />
                                     <Text style={styles.adviceText}>{getWeatherAdvice(weatherData, t)}</Text>
                                 </View>
                             )}
                          </>
                     )}
                      {/* Show location error less prominently if weather data *is* displayed */}
                     {locationErrorMsg && weatherData && (
                          <Text style={[styles.errorText, { color: '#FFEBEE', opacity: 0.8, fontSize: 12, marginTop: 10 }]}>
                              ({t.location}: {locationErrorMsg})
                          </Text>
                     )}
                 </View>
             );
        }

        return (
            <LinearGradient
                // More subtle gradient
                colors={['#4CAF50', '#5EBD62', '#68C56C']}
                style={styles.weatherCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {content}
            </LinearGradient>
        );
    };

    // --- Render Helper: Action Card ---
    const actionIcons = {
        [t.diseaseDeal]: "shield", // Keep shield for diagnosis
        [t.cultivationTips]: "book-open",
        [t.soilInfo]: "thermometer", // Could use 'layers' or 'map' too
        [t.kissanYojna]: "award", // Changed to 'award' for schemes/yojna
        [t.forHelp]: "phone-call", // Changed to 'phone-call'
    };

    const renderActionCard = (title, content, onPress, style = {}) => {
        const hasContent = content !== null;
        const iconName = actionIcons[title] || "grid"; // Default icon

        return (
            <TouchableOpacity
                style={[
                    styles.actionCard,
                    !hasContent && styles.buttonLikeCard, // Apply if no content (like a button)
                    style
                ]}
                onPress={onPress}
                activeOpacity={0.7} // Standard opacity feedback
            >
                <View style={[
                    styles.actionCardHeader,
                    !hasContent && styles.buttonLikeCardHeader // Center content if button-like
                ]}>
                    <Feather
                        name={iconName}
                        size={hasContent ? 20 : 28} // Slightly larger icon for button-like cards
                        color="#388E3C" // Consistent icon color
                        style={!hasContent && { marginBottom: 5 }} // Add space below icon if centered
                    />
                    <Text
                       style={[
                           styles.actionCardTitle,
                           !hasContent && styles.centeredActionCardTitle // Center text if button-like
                        ]}
                        numberOfLines={2} // Allow title to wrap slightly
                        ellipsizeMode="tail"
                    >
                        {title}
                    </Text>
                </View>
                {/* Render content only if it exists */}
                {hasContent && <View style={styles.actionCardContentContainer}>{content}</View>}
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"} backgroundColor="#E8F5E9" />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        colors={["#4CAF50", "#8BC34A"]} // Progress indicator colors
                        tintColor={"#4CAF50"} // iOS spinner color
                        title={t.pullToRefresh} // Text shown during pull
                        titleColor={"#666"}
                    />
                }
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer ? navigation.openDrawer() : console.log("Menu Pressed")} style={styles.headerIconTouchable}>
                        <Feather name="menu" size={28} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("User Profile Pressed")} style={styles.headerIconTouchable}>
                         <View style={styles.headerUserContainer}>
                             <View style={styles.userIconContainer}>
                                <Feather name="user" size={20} color="#4CAF50" />
                            </View>
                            {/* User name could come from state/context later */}
                            <Text style={styles.userNameText}>{t.userName}</Text>
                         </View>
                    </TouchableOpacity>
                </View>

                {/* Weather Card */}
                {renderWeatherCard()}

                {/* Action Grid */}
                <View style={styles.actionGrid}>
                    {renderActionCard(
                        t.diseaseDeal,
                        null, // No content, acts like a button
                        () => navigation.navigate("DiseaseDeal", { selectedLanguage })
                    )}
                    {renderActionCard(
                        t.cultivationTips,
                        null, // No content, acts like a button
                        () => navigation.navigate("CultivationTips", { selectedLanguage })
                    )}
                    {renderActionCard(
                        t.soilInfo,
                        null, // No content, acts like a button
                        () => navigation.navigate("SoilInfo", { selectedLanguage })
                    )}
                    {renderActionCard(
                        t.kissanYojna,
                        // --- UPDATED CONTENT FOR KISSAN YOJNA ---
                        <View style={styles.listContainer}>
                             <TouchableOpacity onPress={() => openLink('https://pmkisan.gov.in/', t)} style={styles.linkTouchable}>
                                 <Text style={styles.linkListItem}>1. PM-KISAN</Text>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={() => openLink('https://www.myscheme.gov.in/schemes/pmgdisha', t)} style={styles.linkTouchable}>
                                 <Text style={styles.linkListItem}>2. PMGDISHA</Text>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={() => openLink('https://pmfby.gov.in/', t)} style={styles.linkTouchable}>
                                 <Text style={styles.linkListItem}>3. PMFBY</Text>
                             </TouchableOpacity>
                         </View>,
                         null // Make the card itself non-clickable if it contains links
                         // () => console.log("Kissan Yojna Card Pressed - Disabled") // Or keep this to log card press
                    )}
                    {renderActionCard(
                        t.forHelp,
                        <Text style={styles.contactsText} selectable={true}>Dial: 112</Text>, // Make number selectable
                        () => {
                            // Use Linking for the phone call
                            openLink("tel:112", t).catch(err => {
                                console.error("Failed to open dialer:", err);
                                Alert.alert("Error", "Could not open the phone dialer.");
                            });
                        }
                    )}
                    {/* Spacer Card - Remains invisible, ensures last item alignment in a 2-column grid */}
                    <View style={styles.actionCardSpacer} />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

// --- Styles ---
const { width } = Dimensions.get("window");
const cardMargin = 12;
const cardWidth = (width - cardMargin * 3) / 2; // Calculate width for 2 cards per row with margin

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F1F8E9", // Light green background
    },
    container: {
        paddingHorizontal: cardMargin,
        paddingBottom: 40, // Space at the bottom
    },
    // --- Header ---
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: Platform.OS === 'android' ? 10 : 15,
        paddingTop: Platform.OS === 'android' ? 15 : 15, // Adjust top padding for status bar
        marginBottom: 10,
    },
    headerIconTouchable: {
         padding: 8, // Increase touchable area
    },
    headerUserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    userIconContainer: {
        width: 30, // Slightly smaller icon container
        height: 30,
        borderRadius: 15,
        backgroundColor: "#E8F5E9", // Match safe area bg slightly lighter
        justifyContent: "center",
        alignItems: "center",
        // Removed border
        marginRight: 8,
    },
    userNameText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    // --- Weather Card Styles ---
    weatherCard: {
        borderRadius: 18,
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginBottom: cardMargin * 2, // More space below weather card
        elevation: 6, // Slightly reduced elevation
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        minHeight: 210, // Ensure minimum height
        justifyContent: 'center', // Center content vertically if loading/error
        overflow: 'hidden', // Clip gradient edges
    },
    weatherLoadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30, // Padding when loading
    },
    weatherErrorContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    weatherContent: {
        alignItems: "center",
    },
    weatherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 8,
    },
    locationRow: {
        marginBottom: 12,
        flexWrap: 'wrap', // Allow location text to wrap
        paddingHorizontal: 10,
    },
    locationTextValue: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
        marginLeft: 6,
        textAlign: 'center', // Center align location name
    },
    tempIconRow: {
        marginBottom: 15,
        alignItems: 'flex-end', // Align items to bottom for better visual connection
    },
    weatherIcon: {
        width: 55,
        height: 55,
        marginRight: 0, // Remove margin if aligning baseline
    },
     weatherIconPlaceholder: { // Style for placeholder when icon fails
        width: 55,
        height: 55,
        marginRight: 0,
        // backgroundColor: 'rgba(255,255,255,0.2)', // Optional: visual placeholder
     },
    temperatureText: {
        fontSize: 48, // Slightly larger temp
        fontWeight: "bold",
        color: "#FFFFFF",
        marginLeft: 5,
        lineHeight: 50, // Adjust line height to align better with icon baseline
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    weatherDescription: {
        fontSize: 15,
        color: '#FFFFFF',
        opacity: 0.85,
        textTransform: 'capitalize',
        marginLeft: 12,
        flexShrink: 1, // Allow description to shrink if needed
        alignSelf: 'flex-end', // Align with bottom of temp text
        paddingBottom: 5, // Adjust vertical alignment
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '95%', // Slightly less width
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.25)',
    },
    detailItem:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Distribute space evenly
        justifyContent: 'center', // Center within its flex space
        paddingHorizontal: 5, // Add some horizontal padding
    },
     detailSeparator: {
        height: '60%',
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
     },
     detailIcon: {
        marginRight: 5,
     },
    weatherDetailText: {
        fontSize: 13,
        color: '#FFFFFF',
        opacity: 0.9,
        flexShrink: 1, // Allow text to shrink/wrap if needed
    },
    adviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.15)', // Slightly less opaque background
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
        width: '95%', // Max width for advice
    },
    adviceText: {
        fontSize: 13,
        color: '#FFFFFF',
        // marginLeft: 8, // Already handled by icon margin
        flex: 1, // Take remaining space
        textAlign: 'left', // Align advice text left
    },
    errorText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: "center",
        marginTop: 5,
        paddingHorizontal: 15,
    },
    // --- Action Grid Styles ---
    actionGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between", // Space items evenly
    },
    actionCard: {
        backgroundColor: "#FFFFFF",
        width: cardWidth,
        minHeight: 125, // Minimum height for consistency
        borderRadius: 14,
        padding: 12,
        marginBottom: cardMargin,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'flex-start', // Align content to top by default
        alignItems: 'flex-start', // Align content to left by default
        elevation: 3,
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Softer shadow
        shadowRadius: 3,
        overflow: 'hidden', // Ensure content respects border radius
    },
    // Styles for cards acting like buttons (no content)
    buttonLikeCard: {
         justifyContent: 'center', // Center content vertically
         alignItems: 'center', // Center content horizontally
         padding: 10, // Adjust padding if needed
         minHeight: 125, // Ensure same height
     },
     actionCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 8, // Space between header and content (if any)
     },
     // Styles for centering header in button-like cards
     buttonLikeCardHeader: {
        flexDirection: 'column', // Stack icon and text vertically
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0, // No margin below header in this case
     },
    actionCardTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#388E3C", // Dark green title
        marginLeft: 8, // Space between icon and title (for row layout)
        flexShrink: 1, // Allow text to shrink if needed
        textAlign: 'left', // Default left align
    },
    // Styles for centering title in button-like cards
    centeredActionCardTitle: {
        marginLeft: 0, // No left margin when centered
        marginTop: 5, // Space between icon and title (for column layout)
        textAlign: 'center', // Center align text
    },
    actionCardContentContainer: {
        flex: 1, // Allow content to take remaining space
        width: '100%', // Ensure content uses full width
        paddingTop: 5, // Add a little space above content
    },
    // Invisible spacer card for grid alignment
    actionCardSpacer: {
        width: cardWidth, // Same width as action cards
        height: 0, // No height
        margin: 0,
        padding: 0,
        borderWidth: 0,
        backgroundColor: 'transparent', // Invisible
        marginBottom: cardMargin, // Match margin for alignment
    },
    // --- Specific Content Styles ---
    listContainer: {
        // Removed margin top, handled by actionCardContentContainer padding
        paddingLeft: 0, // No extra indent needed now
        width: '100%',
    },
    linkTouchable: {
       paddingVertical: 4, // Add touchable area vertically
    },
    linkListItem: {
        fontSize: 14, // Slightly larger for links
        color: "#1565C0", // Standard link blue color
        marginBottom: 6, // More space between links
        fontWeight: '500',
        // textDecorationLine: 'underline', // Optional: underline links
    },
    contactsText: {
        fontSize: 13,
        color: "#444", // Darker text for readability
        // Removed margin top, handled by actionCardContentContainer padding
        fontWeight: '400',
        textAlign: 'center', // Center contacts text if needed
        width: '100%',
    },
    weatherText: { // General text style within weather card (like loading messages)
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
        color: '#FFFFFF',
    },
});