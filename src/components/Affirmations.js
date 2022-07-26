// modules
import React from "react";
import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import affirmationsLIst from "./../../assets/data/affirmations.json";

const Affirmations = ({
	setModalVisible,
	setShowAffirmations,
	setShowMeditation,
	anxietyCategories = [],
}) => {
	const [isPlayingPrompt, setIsPlayingPrompt] = useState(false);
	const [voicePromptObj, setVoicePromptObj] = useState(null);
	const [voicePromptStatus, setVoicePromptStatus] = useState(null);
	const affirmations = useMemo(() => {
		const results = new Map();
		const limit = 3;

		while (results.size < limit) {
			const affirmationIndex = Math.floor(
				Math.random() * anxietyCategories.length
			);
			const affirmation = anxietyCategories[affirmationIndex];

			if (typeof affirmation !== "string") {
				return [];
			}
			const affirmationKey = affirmation.toLowerCase();
			if (!affirmationKey in affirmationsLIst) {
				return [];
			}
			const values = affirmationsLIst[affirmationKey];

			const valueIndex = Math.floor(Math.random() * values.length);

			// Avoid to have the same affirmation twice.
			if (results.has(`${affirmation}_${valueIndex}`)) {
				continue;
			}
			results.set(`${affirmation}_${valueIndex}`, values[valueIndex]);
		}

		const rendered = [];
		for (let [key, value] of results) {
			rendered.push(
				<AffirmationContainer key={key}>
					<AffirmationText>{value}</AffirmationText>
				</AffirmationContainer>
			);
		}
		return rendered;
	}, [anxietyCategories]);

	const handleAudioPlayPause = async () => {
		// playing audio for the first time
		if (voicePromptStatus === null) {
			const playbackObject = new Audio.Sound();
			const status = await playbackObject.loadAsync(
				require("../../assets/audios/meditate-on-affirmations.mp3"),
				{
					shouldPlay: true,
				}
			);
			setVoicePromptObj(playbackObject);
			playbackObject.setOnPlaybackStatusUpdate(updatePromptPlaying);
			return setVoicePromptStatus(status);
		}

		// pausing audio
		if (
			voicePromptStatus.isLoaded &&
			isPlayingPrompt &&
			voicePromptStatus.positionMillis < 48420
		) {
			const status = await voicePromptObj.pauseAsync();
			return setVoicePromptStatus(status);
		}

		// // resuming audio
		if (
			voicePromptStatus.isLoaded &&
			!isPlayingPrompt &&
			voicePromptStatus.positionMillis < 48420
		) {
			const status = await voicePromptObj.playAsync();
			return setVoicePromptStatus(status);
		}

		// replaying audio (not working properly at the moment)
		if (
			voicePromptStatus.isLoaded &&
			!isPlayingPrompt &&
			voicePromptStatus.positionMillis >= 48420
		) {
			const status = await voicePromptObj.replayAsync();
			return setVoicePromptStatus(status);
		}
	};

	const updatePromptPlaying = (playbackStatus) => {
		setIsPlayingPrompt(playbackStatus.isPlaying);
	};

	const handleEscape = () => {
		if (isPlayingPrompt) {
			voicePromptObj.stopAsync();
		}
		setModalVisible(true);
	};

	return (
		<>
			<EscapeButton onPress={handleEscape}>
				<AntDesign name="close" size={20} color="#797979" />
			</EscapeButton>
			<View>
				<Heading>I want you to meditate on these affirmations.</Heading>
			</View>
			<LinearGradient
				colors={["#9F91CE", "#7CA3CA"]}
				style={{
					borderRadius: 50,
					alignSelf: "center",
					marginTop: 33,
					marginBottom: 53,
				}}
			>
				<PromptAudioButton onPress={handleAudioPlayPause}>
					{!isPlayingPrompt ? (
						<AntDesign name="caretright" size={16} color="#FFFEFE" />
					) : (
						<FontAwesome5 name="pause" size={16} color="#FFFEFE" />
					)}
				</PromptAudioButton>
			</LinearGradient>
			{affirmations}
			<MeditationButton
				onPress={() => {
					setShowMeditation(true);
					setShowAffirmations(false);
				}}
				style={{
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 0.15,
					shadowRadius: 4,

					elevation: 5,
				}}
			>
				<MeditationText>Meditation</MeditationText>
			</MeditationButton>
		</>
	);
};

// styles
const Heading = styled(Text)`
	font-size: 28px;
	font-family: PlayfairDisplay_600SemiBold;
	color: #505050;
	text-align: center;
	width: 290px;
	margin-top: 20px;
	align-self: center;
`;

const PromptAudioButton = styled(TouchableOpacity)`
	height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center;
`;

const AffirmationContainer = styled(View)`
	width: 327px;
	min-height: 84px;
	align-self: center;
	background-color: #e8e8e8;
	border-radius: 10px;
	justify-content: center;
	border: 1px solid #7ca3ca;
	margin-bottom: 30px;
	padding: 0 10px;
`;

const AffirmationText = styled(Text)`
	font-family: OpenSans_600SemiBold;
	font-size: 16px;
	color: #505050;
	text-align: center;
`;

const MeditationButton = styled(TouchableOpacity)`
	border: 1px solid #f9c45e;
	width: 114px;
	height: 32px;
	align-items: center;
	align-self: center;
	justify-content: center;
	border-radius: 4px;
	background-color: #f9c45e;
	position: absolute;
	bottom: 60px;
`;

const MeditationText = styled(Text)`
	color: #505050;
	font-family: OpenSans_700Bold;
	font-size: 16px;
`;

const EscapeButton = styled(TouchableOpacity)`
	background-color: #e8e8e8;
	margin-right: 15px;
	width: 30px;
	height: 30px;
	align-items: center;
	justify-content: center;
	align-self: flex-end;
	border-radius: 60px;
`;

export default Affirmations;
