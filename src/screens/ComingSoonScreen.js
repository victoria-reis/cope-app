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

import SessionCard from "../components/SessionCard";

// previous sessions screen, where user will be able to see list of old sessions
const ComingSoonScreen = () => {
	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			{/* <Heading>Entries</Heading>
			<FlatList
				data={[
					{ name: 1 },
					{ name: 2 },
					{ name: 3 },
					{ name: 4 },
					{ name: 5 },
					{ name: 6 },
				]}
				renderItem={() => <SessionCard />}
				keyExtractor={(item) => item.name}
				contentContainerStyle={{ padding: 0, margin: 0 }}
			/> */}
			<Text>Coming soon!</Text>
		</ScreenContainer>
	);
};

// styles
const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	margin: 20px;
`;

const Heading = styled(Text)`
	margin-top: 20px;
	font-size: 30px;
	font-weight: bold;
`;

export default ComingSoonScreen;
