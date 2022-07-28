// modules
import React, { useCallback, useEffect } from "react";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import { useState, createContext, useReducer } from "react";
import styled from "styled-components";

// components
import PreSessionAnxietyRating from "../components/PreSessionAnxietyRating";
import PostSessionAnxietyRating from "../components/PostSessionAnxietyRating";
import AnxietyCategories from "../components/AnxietyCategories";
import VoiceRecording from "../components/VoiceRecording";
import Affirmations from "../components/Affirmations";
import PostSessionMeditation from "../components/PostSessionMeditation";
import EscapeSessionModal from "../components/EscapeSessionModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

function reducer(state, action) {
	switch (action.type) {
		case "set_anxiety_categories": {
			return {
				...state,
				anxietyCategories: action.payload,
			};
		}
		default:
			return state;
	}
}

const initialState = {
	anxietyCategories: [],
};

// new session screen
const NewSessionScreen = ({ navigation }) => {
	const [showRating1, setShowRating1] = useState(true);
	// const [showRating2, setShowRating2] = useState(false);
	const [showStressors, setShowStressors] = useState(false);
	const [showVoiceRecording, setShowVoiceRecording] = useState(false);
	const [showAffirmations, setShowAffirmations] = useState(false);
	const [showMeditation, setShowMeditation] = useState(false);
	const [feeling1, setFeeling1] = useState("");
	const [feeling2, setFeeling2] = useState("");
	const [stressors, setStressors] = useState([]);
	const [currentVoiceEntry, setCurrentVoiceEntry] = useState([]);
	const [escapeModalVisible, setEscapeModalVisible] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);

	// const handleClose = () => {
	// 	setModalVisible(true);
	// };

	useEffect(() => {
		if (!showAffirmations) {
			return;
		}

		async function writeData() {
			try {
				let value = await AsyncStorage.getItem("@results");
				if (value === null) {
					value = {};
				} else {
					value = JSON.parse(value);
				}
				const data = "data" in value ? value["data"] : [];
				data.push({
					feeling: feeling1,
					categories: state.anxietyCategories,
					date: new Date().toISOString(),
					voiceEntries: currentVoiceEntry,
				});
				value.data = data;
				await AsyncStorage.setItem("@results", JSON.stringify(value));
			} catch (e) {
				// TODO: Handle error
				console.log(e);
			}
		}
		writeData();
	}, [showAffirmations, state]);

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			<EscapeSessionModal
				modalVisible={escapeModalVisible}
				setModalVisible={setEscapeModalVisible}
				navigation={navigation}
			/>
			{/* here trying to pass down the state values as props to CloseModal component  */}

			{showRating1 ? (
				//where user will rate their anxiety
				<PreSessionAnxietyRating
					feeling1={feeling1}
					setFeeling1={setFeeling1}
					setShowRating1={setShowRating1}
					setShowStressors={setShowStressors}
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
					navigation={navigation}
					dispatch={dispatch}
				/>
			) : // After ruunning the AnxietyCategories we will set shoCategories to false also inside the AnxietyCategories component
			showVoiceRecording ? (
				// where user will record voice
				<VoiceRecording
					setShowVoiceRecording={setShowVoiceRecording}
					setModalVisible={setEscapeModalVisible}
					setShowAffirmations={setShowAffirmations}
					currentVoiceEntry={currentVoiceEntry}
					setCurrentVoiceEntry={setCurrentVoiceEntry}
				/>
			) : showAffirmations ? (
				<Affirmations
					setShowAffirmations={setShowAffirmations}
					setShowMeditation={setShowMeditation}
					setModalVisible={setEscapeModalVisible}
					anxietyCategories={state.anxietyCategories}
				/>
			) : showMeditation ? (
				<PostSessionMeditation
					setShowMeditation={setShowMeditation}
					setModalVisible={setEscapeModalVisible}
				/>
			) : (
				<PostSessionAnxietyRating
					feeling2={feeling2}
					setFeeling2={setFeeling2}
					setShowRating1={setShowRating1}
					setModalVisible={setEscapeModalVisible}
					navigation={navigation}
				/>
			)}
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
