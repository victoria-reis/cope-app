import React from "react";
import { SafeAreaView, View, Text } from "react-native";

// new session screen, where user will be asked if they want to record voice or type
const NewSessionScreen = () => {
	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>New Session</Text>
		</SafeAreaView>
	);
};

export default NewSessionScreen;
