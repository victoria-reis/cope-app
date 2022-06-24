import React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const LoadingScreen = () => {
	const [welcomeTimer, setWelcomeTimer] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			console.log("timer from loading screen");
			setWelcomeTimer(true);
		}, 5000);
	}, []);

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			{!welcomeTimer ? (
				<Text style={{ fontSize: 50, fontWeight: "bold" }}>Therapu</Text>
			) : (
				<Text style={{ fontSize: 50, fontWeight: "bold" }}>
					Everything is going to be okay!
				</Text>
			)}
		</View>
	);
};

export default LoadingScreen;
