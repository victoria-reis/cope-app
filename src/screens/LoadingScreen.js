// modules
import React from "react";
import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import styled from "styled-components";

// components
import GradientText from "../components/GradientText";

// initial screen
const LoadingScreen = () => {
	// state for welcome message timer
	const [welcomeMsgTimer, setWelcomeMsgTimer] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setWelcomeMsgTimer(true);
		}, 4000);
	}, []);

	return (
		<LoadingPageContainer>
			{!welcomeMsgTimer ? (
				<LogoContainer>
					<Logo source={require("../../assets/images/Cope._logo.png")} />
				</LogoContainer>
			) : (
				<GradientText
					style={{
						fontFamily: "PlayfairDisplay_700Bold",
						fontSize: 36,
						textAlign: "center",
						width: 254,
					}}
				>
					"Everything is going to be okay."
				</GradientText>
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

const LogoContainer = styled(View)``;

const Logo = styled(Image)`
	width: 204px;
	height: 118px;
`;

export default LoadingScreen;
