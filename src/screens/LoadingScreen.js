// modules
import React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
// import {
// 	useFonts,
// 	PlayfairDisplay_700Bold,
// } from "@expo-google-fonts/playfair-display";

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
		<LoadingPageContainer>
			{!welcomeMsgTimer ? (
				<AppName>Cope</AppName>
			) : (
				<WelcomeMessage>"Everything is going to be okay."</WelcomeMessage>
			)}
		</LoadingPageContainer>
	);
};

// styles
const LoadingPageContainer = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const AppName = styled(Text)`
	font-size: 50px;
	font-weight: bold;
`;

const WelcomeMessage = styled(Text)`
	font-size: 40px;
	font-weight: bold;
	max-width: 75%;
	text-align: center;
`;

export default LoadingScreen;
