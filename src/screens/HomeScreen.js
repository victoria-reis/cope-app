// modules
import React, { useCallback } from "react";
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
import AsyncStorage from '@react-native-async-storage/async-storage';

// home screen
const HomeScreen = ({ navigation }) => {
	// const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [results, setResults] = useState({ data: []});
	useEffect( () => {
		async function fetchData() {
			try {
				const value = await AsyncStorage.getItem('@results')
				if(value !== null) {
					setResults(JSON.parse(value));
				}
			} catch(e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

	const onDeleteCard = useCallback((index) => {
		return () => {
			results.data = results.data.filter( ( card, i ) => i !== index );
			setResults(results);
			AsyncStorage.setItem('@results', JSON.stringify(results));
		}
	}, [results]);

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			{deleteModalVisible ? (
				<DeleteModal
					modalVisible={deleteModalVisible}
					setModalVisible={setDeleteModalVisible}
				/>
			) : null}
			<BackgroundImage
				source={require("../../assets/images/yellow-circle.png")}
			/>
			<Logo source={require("../../assets/images/Cope._logo.png")} />
			<Motto>"Everything is going to be okay."</Motto>
			<FlatList
				data={results.data}
				renderItem={(item, index) => (
					<SessionCard
						key={item.index}
						navigation={navigation}
						modalVisible={deleteModalVisible}
						setModalVisible={setDeleteModalVisible}
						onDelete={onDeleteCard(item.index)}
						{...item.item}
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
