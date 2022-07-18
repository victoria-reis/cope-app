// modules
import React from "react";
import { useState, useEffect } from "react";
import {
	SafeAreaView,
	Text,
	Platform,
	StatusBar,
	View,
	Image,
	ImageBackground,
	FlatList,
} from "react-native";
import styled from "styled-components";

// components
import SessionCard from "../components/SessionCard";
import DeleteModal from "../components/DeleteModal";

// home screen
const HomeScreen = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			{modalVisible ? (
				<DeleteModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			) : null}
			<BackgroundImage
				source={require("../../assets/images/yellow-circle.png")}
			/>
			<Logo source={require("../../assets/images/Cope._logo.png")} />
			<Motto>"Everything is going to be okay."</Motto>
			<FlatList
				data={[
					{ name: 1 },
					{ name: 2 },
					{ name: 3 },
					{ name: 4 },
					{ name: 5 },
					{ name: 6 },
				]}
				renderItem={() => (
					<SessionCard
						navigation={navigation}
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
					/>
				)}
				keyExtractor={(item) => item.name}
				contentContainerStyle={{ padding: 0, margin: 0 }}
			/>
		</ScreenContainer>
	);
};

// styles
const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	margin: 20px;
	/* background-color: red; */
`;

const Logo = styled(Image)`
	height: 45px;
	width: 79px;
	align-self: center;
	margin-top: 80px;
`;

const BackgroundImage = styled(ImageBackground)`
	height: 314px;
	width: 322px;
	position: absolute;
	top: -61px;
	left: 130px;
`;

const Motto = styled(Text)`
	font-size: 20px;
	text-align: center;
	width: 206px;
	align-self: center;
	color: #505050;
	font-family: OpenSans_400Regular;
	margin: 23px 0 44px;
	line-height: 27.24px;
`;

export default HomeScreen;
