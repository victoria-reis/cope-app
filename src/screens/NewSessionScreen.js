// modules
import React from "react";
import { SafeAreaView, View, Text, Platform, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import styled from "styled-components";

// components
import AnxietyRating from "../components/AnxietyRating";
import AnxietyCategories from "../components/AnxietyCategories";
import VoiceRecording from "../components/VoiceRecording";

// new session screen
const NewSessionScreen = ({ navigation }) => {
	const [showRating, setShowRating] = useState(true);
	const [feeling, setFeeling] = useState("");
	const [showCategories, setShowCategories] = useState(false);
	const [category, setCategory] = useState("");

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			{showRating ? (
				//where user will rate their anxiety
				<AnxietyRating
					feeling={feeling}
					setFeeling={setFeeling}
					setShowRating={setShowRating}
					setShowCategories={setShowCategories}
				/>
			) : showCategories ? (
				// where user will choose what they are anxious about
				<AnxietyCategories
					category={category}
					setCategory={setCategory}
					setShowCategories={setShowCategories}
				/>
			) : !showRating && !showCategories ? (
				// where user will choose if they want to record voice or type
				<VoiceRecording />
			) : null}
		</ScreenContainer>
	);
};

// styles
const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	padding: 20px;
`;

export default NewSessionScreen;
