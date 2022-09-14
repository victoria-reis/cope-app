// modules
import React from "react";
import { SafeAreaView, Text, Platform, StatusBar } from "react-native";
import styled from "styled-components";

// previous sessions screen, where user will be able to see list of old sessions
const ComingSoonScreen = () => {
	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			<Heading>Coming Soon</Heading>
		</ScreenContainer>
	);
};

// styles
const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	margin: 20px;
`;

const Heading = styled(Text)`
	font-size: 28px;
	font-family: PlayfairDisplay_700Bold;
	color: #505050;
	text-align: center;
	margin-top: 60px;
`;

export default ComingSoonScreen;
