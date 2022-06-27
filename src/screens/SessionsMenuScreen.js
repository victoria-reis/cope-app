// modules
import React from "react";
import {
	SafeAreaView,
	Text,
	FlatList,
	Platform,
	StatusBar,
} from "react-native";
import styled from "styled-components";

// components
import SessionCard from "../components/SessionCard";

// previous sessions screen, where user will be able to see list of old sessions
const SessionsMenuScreen = () => {
	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			<Heading>Entries</Heading>
			<FlatList
				data={[{ name: 1 }, { name: 2 }]}
				renderItem={() => <SessionCard />}
				keyExtractor={(item) => item.name}
				// contentContainerStyle={{ padding: 10 }}
			/>
		</ScreenContainer>
	);
};

// styles
const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	padding: 20px;
`;

const Heading = styled(Text)`
	font-size: 30px;
	font-weight: bold;
`;

export default SessionsMenuScreen;
