import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import SplashScreen from "./SplashScreen";
import LanguageSelectionPage from "./LanguageSelectionPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import KissanIDPage from "./KissanIDPage";
import HomePage from "./HomePage";
import DiseaseDeal from "./DiseaseDeal";
import CropRegistration from "./CropRegistration";
import DiseaseTreatment from "./DiseaseTreatment";
import SoilInfo from "./SoilInfo";
import CultivationTips from "./CultivationTips";
import CultivationTipsPage from "./CultivationTipsPage"; 
import Tomato from "./Tomato";
import BlackGram from "./BlackGram";
import Rice from "./Rice";
import BlackGramAnthracnose from "./BlackGramAnthracnose";
import BlackGramHealthy from "./BlackGramHealthy";
import BlackGramLeafCrinckle from "./BlackGramLeafCrinckle";
import BlackGramPowderyMildew from "./BlackGramPowderyMildew";
import Unknown from "./Unknown";
import RiceBacterialBlight from "./RiceBacterialBlight";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LanguageSelectionPage"
          component={LanguageSelectionPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KissanIDPage"
          component={KissanIDPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiseaseDeal"
          component={DiseaseDeal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CropRegistration"
          component={CropRegistration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiseaseTreatment"
          component={DiseaseTreatment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CultivationTipsPage"
          component={CultivationTipsPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="SoilInfo"
          component={SoilInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CultivationTips"
          component={CultivationTips}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tomato"
          component={Tomato}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlackGram"
          component={BlackGram}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rice"
          component={Rice}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="BlackGramAnthracnose"
          component={BlackGramAnthracnose}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlackGramHealthy"
          component={BlackGramHealthy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlackGramLeafCrinckle"
          component={BlackGramLeafCrinckle}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlackGramPowderyMildew"
          component={BlackGramPowderyMildew}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Unknown"
          component={Unknown}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RiceRiceBacterialBlight"
          component={RiceBacterialBlight}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
