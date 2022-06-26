import React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

// initial screen
const LoadingScreen = () => {
	// state for welcome message timer
	const [welcomeMsgTimer, setWelcomeMsgTimer] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setWelcomeMsgTimer(true);
		}, 3000);
	}, []);

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			{!welcomeMsgTimer ? (
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
