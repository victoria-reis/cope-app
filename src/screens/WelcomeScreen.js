import React from "react";
import { SafeAreaView, View, Text, Button } from "react-native";

const WelcomeScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1, alignItems: "center" }}>
			<Text>Good Morning!</Text>
			<Text>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nulla
				harum, quisquam ad voluptates optio ducimus aut cupiditate ea et?
			</Text>
			<Button
				title="Attend a session"
				onPress={() => {
					navigation.navigate("New Session");
				}}
			/>

			<Button
				title="View sessions"
				onPress={() => {
					navigation.navigate("Sessions");
				}}
			/>
		</SafeAreaView>
	);
};

export default WelcomeScreen;
