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
import PreSessionAnxietyRating from "../components/PreSessionAnxietyRating";
import PostSessionAnxietyRating from "../components/PostSessionAnxietyRating";
import AnxietyCategories from "../components/AnxietyCategories";
import VoiceRecording from "../components/VoiceRecording";
import EscapeSessionModal from "../components/EscapeSessionModal";

// new session screen
const NewSessionScreen = ({ navigation }) => {
	const [recording, setRecording] = useState();
	const [recordings, setRecordings] = useState([]);
	const [showRating1, setShowRating1] = useState(true);
	const [showRating2, setShowRating2] = useState(false);
	const [showStressors, setShowStressors] = useState(false);
	const [showVoiceRecording, setShowVoiceRecording] = useState(false);
	const [feeling1, setFeeling1] = useState("");
	const [feeling2, setFeeling2] = useState("");
	const [stressors, setStressors] = useState([]);
	const [escapeModalVisible, setEscapeModalVisible] = useState(false);

	// const handleClose = () => {
	// 	setModalVisible(true);
	// };

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			<EscapeSessionModal
				modalVisible={escapeModalVisible}
				setModalVisible={setEscapeModalVisible}
				navigation={navigation}
				setShowRating1={setShowRating1}
			/>
			{/* here trying to pass down the state values as props to CloseModal component  */}

			{showRating1 ? (
				//where user will rate their anxiety
				<PreSessionAnxietyRating
					feeling1={feeling1}
					setFeeling1={setFeeling1}
					setShowRating1={setShowRating1}
					setShowStressors={setShowStressors}
					modalVisible={escapeModalVisible}
					setModalVisible={setEscapeModalVisible}
					navigation={navigation}
				/>
			) : //here we tried to pass down feeling, setFeeling as props to the AnxietyRating component as props

			// Inside the AnxietyRating component we will set showRating to false to so the showCategories run

			showStressors ? (
				// where user will choose what they are anxious about
				<AnxietyCategories
					stressors={stressors}
					setStressors={setStressors}
					setShowStressors={setShowStressors}
					setShowVoiceRecording={setShowVoiceRecording}
					modalVisible={escapeModalVisible}
					setModalVisible={setEscapeModalVisible}
				/>
			) : // After ruunning the AnxietyCategories we will set shoCategories to false also inside the AnxietyCategories component
			!showRating1 && !showStressors && showVoiceRecording ? (
				// where user will record voice
				<VoiceRecording
					setShowVoiceRecording={setShowVoiceRecording}
					modalVisible={escapeModalVisible}
					setModalVisible={setEscapeModalVisible}
					// recording={recording}
					// setRecording={setRecording}
					// recordings={recordings}
					// setRecordings={setRecordings}
				/>
			) : !showRating1 && !showStressors && !showVoiceRecording ? (
				<PostSessionAnxietyRating
					feeling2={feeling2}
					setFeeling2={setFeeling2}
					modalVisible={escapeModalVisible}
					setModalVisible={setEscapeModalVisible}
					navigation={navigation}
				/>
			) : null}
		</ScreenContainer>
	);
};

// styles
const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	margin: 20px;
	/* background-color: white; */
`;

export default NewSessionScreen;
