// modules
import React from "react";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import {
	useFonts,
	PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";

// components
import AppNavigator from "./src/components/AppNavigator";

// screens
import LoadingScreen from "./src/screens/LoadingScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import HomeScreen from "./src/screens/HomeScreen";

const App = () => {
	// state for loading page timer (app name and welcome message)
	const [logoTimer, setLogoTimer] = useState(true);
	// const [showOnboarding, setShowOnboarding] = useState(false);
	// as soon as the app runs, loading screen appears for 6s with app name and message
	useEffect(() => {
		setTimeout(() => {
			setLogoTimer(false);
		}, 8000);
	}, []);

	const [fontsLoaded] = useFonts({
		PlayfairDisplay_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			{logoTimer ? <LoadingScreen /> : <AppNavigator />}
			<StatusBar style="auto" />
		</>
	);
};

export default App;
