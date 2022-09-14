import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// where user will record voice
const VoiceRecording = ({
	setShowVoiceRecording,
	setModalVisible,
	setShowAffirmations,
	currentVoiceEntry,
	setCurrentVoiceEntry,
}) => {
	const [recording, setRecording] = useState();
	const [message, setMessage] = useState("");
	const [isPlayingRecording, setIsPlayingRecording] = useState(false);
	const [isPlayingPrompt, setIsPlayingPrompt] = useState(false);
	const [voicePromptObj, setVoicePromptObj] = useState(null);
	const [voicePromptStatus, setVoicePromptStatus] = useState(null);
	const [index, setIndex] = useState(0);

	let data = [
		{
			question: "What is on your mind?",
			uri: require("../../assets/audios/what-is-on-your-mind.mp3"),
			voiceEntry: currentVoiceEntry[0],
		},
		{
			question: "Can you change your thinking?",
			uri: require("../../assets/audios/can-you-change-your-thinking.mp3"),
			voiceEntry: currentVoiceEntry[1],
		},
		{
			question: "What could you do differently?",
			uri: require("../../assets/audios/what-could-you-do-differently.mp3"),
			voiceEntry: currentVoiceEntry[2],
		},
		{
			question: "What are you grateful for?",
			uri: require("../../assets/audios/what-are-you-grateful-for.mp3"),
			voiceEntry: currentVoiceEntry[3],
		},
	];

	const handleAudioPlayPause = async () => {
		// playing audio for the first time
		if (voicePromptStatus === null) {
			const playbackObject = new Audio.Sound();
			const status = await playbackObject.loadAsync(data[index].uri, {
				shouldPlay: true,
			});
			setVoicePromptObj(playbackObject);
			playbackObject.setOnPlaybackStatusUpdate(updatePromptPlaying);
			return setVoicePromptStatus(status);
		}

		// pausing audio
		if (
			voicePromptStatus.isLoaded &&
			isPlayingPrompt &&
			voicePromptStatus.positionMillis < voicePromptStatus.durationMillis
		) {
			const status = await voicePromptObj.pauseAsync();
			return setVoicePromptStatus(status);
		}

		// // resuming audio
		if (
			voicePromptStatus.isLoaded &&
			!isPlayingPrompt &&
			voicePromptStatus.positionMillis < voicePromptStatus.durationMillis
		) {
			const status = await voicePromptObj.playAsync();
			return setVoicePromptStatus(status);
		}

		// replaying audio (not working properly at the moment)
		if (
			voicePromptStatus.isLoaded &&
			!isPlayingPrompt &&
			voicePromptStatus.positionMillis >= voicePromptStatus.durationMillis
		) {
			const status = await voicePromptObj.replayAsync();
			return setVoicePromptStatus(status);
		}
	};

	const updatePromptPlaying = (playbackStatus) => {
		setIsPlayingPrompt(playbackStatus.isPlaying);
	};

	const updateRecordingPlaying = (playbackStatus) => {
		setIsPlayingRecording(playbackStatus.isPlaying);
	};

	const startRecording = async () => {
		if (isPlayingPrompt) {
			voicePromptObj.pauseAsync();
		}
		try {
			const permission = await Audio.requestPermissionsAsync();

			if (permission.status === "granted") {
				await Audio.setAudioModeAsync({
					allowsRecordingIOS: true,
					playsInSilentModeIOS: true,
				});

				const { recording } = await Audio.Recording.createAsync(
					Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
				);

				setRecording(recording);
			} else {
				setMessage("Please grant permission to app to access microphone");
			}
		} catch (err) {
			console.error("Failed to start recording", err);
		}
	};

	const stopRecording = async () => {
		setRecording(undefined);
		await recording.stopAndUnloadAsync();

		const { sound, status } = await recording.createNewLoadedSoundAsync();
		setCurrentVoiceEntry([
			...currentVoiceEntry,
			{
				sound: sound,
				duration: status.durationMillis,
				file: recording.getURI(),
			},
		]);
	};

	const handleRecording = async () => {
		if (!recording && currentVoiceEntry[index]) {
			const status = await currentVoiceEntry[index].sound.getStatusAsync();
			currentVoiceEntry[index].sound.setOnPlaybackStatusUpdate(
				updateRecordingPlaying
			);
			if (
				status.positionMillis < status.durationMillis &&
				!isPlayingRecording
			) {
				const status = await currentVoiceEntry[index].sound.playAsync();
				setIsPlayingRecording(true);
			} else if (
				status.positionMillis === status.durationMillis &&
				isPlayingRecording
			) {
				const status = await currentVoiceEntry[index].sound.replayAsync();
			} else if (
				status.positionMillis !== status.durationMillis &&
				isPlayingRecording
			) {
				const status = await currentVoiceEntry[index].sound.pauseAsync();
				setIsPlayingRecording(false);
			}
		} else if (!recording && !data[index].voiceEntry) {
			startRecording();
		} else if (recording) {
			stopRecording();
		}
	};

	const handleEscape = () => {
		if (isPlayingPrompt) {
			voicePromptObj.stopAsync();
		}
		setModalVisible(true);
	};

	const handleRecordAgain = (index) => {
		setCurrentVoiceEntry([
			...currentVoiceEntry.slice(0, index),
			...currentVoiceEntry.slice(index + 1),
		]);
		setIsPlayingRecording(false);
	};

	const handleContinue = () => {
		if (isPlayingPrompt) {
			voicePromptObj.pauseAsync();
		}
		setVoicePromptStatus(null);
		if (index < 3) {
			setIndex(index + 1);
		} else {
			setShowAffirmations(true);
			setShowVoiceRecording(false);
		}
	};

	const handleSkip = () => {
		if (isPlayingPrompt) {
			voicePromptObj.pauseAsync();
		}
		setVoicePromptStatus(null);
		setCurrentVoiceEntry([...currentVoiceEntry, {}]);
		if (index < 3) {
			setIndex(index + 1);
		} else {
			setShowAffirmations(true);
			setShowVoiceRecording(false);
		}
	};

	return (
		<>
			{!recording && !data[index].voiceEntry ? (
				<EscapeButton onPress={handleEscape}>
					<AntDesign name="close" size={20} color="#797979" />
				</EscapeButton>
			) : null}
			<Heading recording={recording} recordings={data[index].voiceEntry}>
				{data[index].question}
			</Heading>
			{!recording && !data[index].voiceEntry ? (
				<LinearGradient
					colors={["#9F91CE", "#7CA3CA"]}
					style={{ borderRadius: 50, alignSelf: "center", marginTop: 70 }}
				>
					<PromptAudioButton onPress={handleAudioPlayPause}>
						{!isPlayingPrompt ? (
							<Image
								source={require("../../assets/images/white-play-button.png")}
								style={{ width: 10, height: 12, marginLeft: 2 }}
							/>
						) : (
							<Image
								source={require("../../assets/images/white-pause-button.png")}
								style={{ width: 12, height: 12 }}
							/>
						)}
					</PromptAudioButton>
				</LinearGradient>
			) : null}
			<Text>{message}</Text>
			<RecordingContainer
				recording={recording}
				recordings={data[index].voiceEntry}
			>
				<LinearGradient
					colors={["#e0e0e0", "transparent"]}
					start={{ x: 0, y: 0.05 }}
					style={{
						width: 100,
						height: 100,
						borderRadius: 50,
						justifyContent: "center",
						position: "absolute",
						bottom: -73,
					}}
				>
					<RecordButton status={recording} onPress={handleRecording}>
						{!recording && data[index].voiceEntry && !isPlayingRecording ? (
							<Image
								source={require("../../assets/images/gradient-play-button.png")}
								style={{ width: 50, height: 55, marginTop: 5, marginLeft: 12 }}
							/>
						) : !recording && data[index].voiceEntry && isPlayingRecording ? (
							<Image
								source={require("../../assets/images/gradient-pause-button.png")}
								style={{ width: 50, height: 50 }}
							/>
						) : !recording && !data[index].voiceEntry ? (
							<Image
								source={require("../../assets/images/gradient-record-button.png")}
								style={{ width: 55, height: 60, marginTop: 7 }}
							/>
						) : recording ? (
							<Image
								source={require("../../assets/images/gradient-stop-recording-button.png")}
								style={{ width: 50, height: 55, marginTop: 7 }}
							/>
						) : null}
					</RecordButton>
				</LinearGradient>
				{!recording && data[index].voiceEntry ? (
					<RecordAgainButton
						onPress={() => {
							handleRecordAgain(index);
						}}
					>
						<RecordAgainText>Record Again?</RecordAgainText>
					</RecordAgainButton>
				) : !recording ? (
					<SkipButton onPress={handleSkip}>
						<SkipText>Skip</SkipText>
					</SkipButton>
				) : null}
			</RecordingContainer>
			{data[index].voiceEntry ? (
				<ContinueButton
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
					onPress={handleContinue}
				>
					<ContinueText>Continue</ContinueText>
				</ContinueButton>
			) : null}
		</>
	);
};

// styles
const Heading = styled(Text)`
	font-size: 28px;
	font-family: PlayfairDisplay_600SemiBold;
	color: #505050;
	text-align: center;
	width: 323px;
	margin-top: ${(props) =>
		!props.recording && !props.recordings ? "20px" : "50px"};
	align-self: center;
`;

const RecordButton = styled(TouchableOpacity)`
	background-color: transparent;
	width: 100px;
	height: 100px;
	align-self: center;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
	border: ${(props) => (props.status ? "4px solid #F9C45E" : "none")};
`;

const RecordingContainer = styled(View)`
	align-items: center;
	justify-content: flex-end;
	margin-top: ${(props) =>
		!props.recording && !props.recordings ? "250px" : "350px"};
`;

const ContinueButton = styled(TouchableOpacity)`
	border: 1px solid #f9c45e;
	width: 97px;
	height: 32px;
	align-items: center;
	align-self: center;
	justify-content: center;
	border-radius: 4px;
	background-color: #f9c45e;
	position: absolute;
	bottom: 60px;
`;

const ContinueText = styled(Text)`
	color: #505050;
	font-family: OpenSans_700Bold;
	font-size: 16px;
`;

const SpeakerContainer = styled(View)`
	align-items: center;
	width: 100%;
	top: 250px;
	position: absolute;
`;

const RecordAgainButton = styled(TouchableOpacity)`
	position: absolute;
	bottom: -115px;
`;

const RecordAgainText = styled(Text)`
	font-family: OpenSans_600SemiBold;
	color: #505050;
	font-size: 16px;
`;

const SkipButton = styled(TouchableOpacity)`
	position: absolute;
	bottom: -115px;
`;

const SkipText = styled(Text)`
	font-family: OpenSans_600SemiBold;
	color: #505050;
	font-size: 16px;
`;

const PromptAudioButton = styled(TouchableOpacity)`
	height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center;
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

export default VoiceRecording;
