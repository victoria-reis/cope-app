// modules
import React from "react";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView } from "react-native";
import {
	useFonts as usePlayfair,
	PlayfairDisplay_700Bold,
	PlayfairDisplay_600SemiBold,
} from "@expo-google-fonts/playfair-display";
import {
	useFonts as useOpenSans,
	OpenSans_600SemiBold,
	OpenSans_700Bold,
	OpenSans_400Regular,
} from "@expo-google-fonts/open-sans";

// components
import AppNavigator from "./src/components/AppNavigator";

// screens
import LoadingScreen from "./src/screens/LoadingScreen";

const App = () => {
	// state for loading page timer (app name and welcome message)
	const [logoTimer, setLogoTimer] = useState(true);

	// as soon as the app runs, loading screen appears for 6s with app name and message
	useEffect(() => {
		setTimeout(() => {
			setLogoTimer(false);
		}, 8000);
	}, []);

	const [PlayfairLoaded] = usePlayfair({
		PlayfairDisplay_700Bold,
		PlayfairDisplay_600SemiBold,
	});
	const [OpenSansLoaded] = useOpenSans({
		OpenSans_400Regular,
		OpenSans_600SemiBold,
		OpenSans_700Bold,
	});

	if (!PlayfairLoaded || !OpenSansLoaded) {
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
