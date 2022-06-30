import React from "react";
import { SafeAreaView, Text, Platform, StatusBar } from "react-native";
import styled from "styled-components";

// home screen
const HomeScreen = ({ navigation }) => {
	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			<Greeting1>Hello,</Greeting1>
			<Greeting2>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nulla
				harum?
			</Greeting2>
		</ScreenContainer>
	);
};

// styles
const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	margin: 20px;
`;

const Greeting1 = styled(Text)`
	font-size: 40px;
	font-weight: bold;
	margin-top: 20px;
`;

const Greeting2 = styled(Text)`
	font-size: 25px;
	margin-top: 20px;
`;

export default HomeScreen;
