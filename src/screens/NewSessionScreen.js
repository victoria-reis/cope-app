// modules
import React from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	Text,
	Platform,
	StatusBar,
	View,
} from "react-native";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

// components
import AnxietyRating from "../components/AnxietyRating";
import AnxietyCategories from "../components/AnxietyCategories";
import VoiceRecording from "../components/VoiceRecording";
import CloseModal from "../components/CloseModal";

// new session screen
const NewSessionScreen = ({ navigation }) => {
	const [showRating, setShowRating] = useState(true);
	const [feeling, setFeeling] = useState("");
	const [showCategories, setShowCategories] = useState(false);
	const [category, setCategory] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const handleClose = () => {
		setModalVisible(true);
	};

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			<CloseButton onPress={handleClose}>                             
				<Text>
					<AntDesign name="close" size={30} color="black" />
				</Text>
			</CloseButton>
                                                      {/*the cross sign to close the session */}

			<CloseModal                                                
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				navigation={navigation}
				setShowRating={setShowRating}
			/>
			                             {/* here trying to pass down the state values as props to CloseModal component  */}

			{showRating ? (
				//where user will rate their anxiety
				<AnxietyRating
					feeling={feeling}
					setFeeling={setFeeling}
					setShowRating={setShowRating}
					setShowCategories={setShowCategories}
				/>
				                 //here we tried to pass down feeling, setFeeling as props to the AnxietyRating component as props

								 // Inside the AnxietyRating component we will set showRating to false to so the showCategories run

			) : showCategories ? (
				// where user will choose what they are anxious about
				<AnxietyCategories
					category={category}
					setCategory={setCategory}
					setShowCategories={setShowCategories}
				/>
				                // After ruunning the AnxietyCategories we will set shoCategories to false also inside the AnxietyCategories component
			) : !showRating && !showCategories ? (
				// where user will record voice
				<VoiceRecording />
			) : null}
		</ScreenContainer>
	);
};

// styles
const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	margin: 20px;
`;

const CloseButton = styled(TouchableOpacity)`
	align-self: flex-end;
`;

export default NewSessionScreen;
