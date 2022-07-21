import React from "react";
import { useState } from "react";
import {
	SafeAreaView,
	Text,
	FlatList,
	Platform,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { Entypo } from "@expo/vector-icons";

import DeleteModal from "../components/DeleteModal";

const SessionDetailsScreen = () => {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			{modalVisible ? (
				<DeleteModal
					setModalVisibleSession={setModalVisible}
					modalVisibleSession={modalVisible}
				/>
			) : null}
			<Heading>Session</Heading>
			<Date>July 1, 2022</Date>
			<OptionsButton onPress={() => setModalVisible(true)}>
				<Entypo name="dots-three-horizontal" size={24} color="#F9C45E" />
			</OptionsButton>
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
	/* border: 1px solid blue; */
`;

const Date = styled(Text)`
	font-size: 20px;
	font-family: OpenSans_400Regular;
	color: #505050;
	text-align: center;
	margin-top: 13px;
`;

const OptionsButton = styled(TouchableOpacity)`
	/* border: 1px solid blue; */
	margin-top: 10px;
	width: 90%;
	align-items: flex-end;
	align-self: center;
`;

export default SessionDetailsScreen;
