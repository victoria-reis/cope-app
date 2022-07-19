import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Audio } from "expo-av";
import {
	Entypo,
	FontAwesome,
	AntDesign,
	FontAwesome5,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "./GradientText";

// where user will record voice
const VoiceRecording = ({
	navigation,
	setShowVoiceRecording,
	setModalVisible,
	modalVisible,
	// recording,
	// setRecording,
	// recordings,
	// setRecordings,
}) => {
	const [recording, setRecording] = useState();
	const [recordings, setRecordings] = useState([]);
	const [message, setMessage] = useState("");
	const [isPlayingRecording, setIsPlayingRecording] = useState(false);
	const [isPlayingPrompt, setIsPlayingPrompt] = useState(false);
	const [voicePromptObj, setVoicePromptObj] = useState(null);
	const [voicePromptStatus, setVoicePromptStatus] = useState(null);

	const handleAudioPlayPause = async () => {
		console.log("pressing", voicePromptStatus);
		// playing audio for the first time
		if (voicePromptStatus === null) {
			const playbackObject = new Audio.Sound();
			const status = await playbackObject.loadAsync(
				require("../../assets/audios/what-is-on-your-mind.mp3"),
				{
					shouldPlay: true,
				}
			);
			setVoicePromptObj(playbackObject);
			playbackObject.setOnPlaybackStatusUpdate(updatePromptPlaying);
			console.log("playing", status);
			return setVoicePromptStatus(status);
		}

		// pausing audio
		if (
			voicePromptStatus.isLoaded &&
			isPlayingPrompt &&
			voicePromptStatus.positionMillis < 30500
		) {
			const status = await voicePromptObj.pauseAsync();
			console.log("pausing");
			return setVoicePromptStatus(status);
		}

		// // resuming audio
		if (
			voicePromptStatus.isLoaded &&
			!isPlayingPrompt &&
			voicePromptStatus.positionMillis < 30500
		) {
			const status = await voicePromptObj.playAsync();
			console.log("resuming");
			return setVoicePromptStatus(status);
		}

		// replaying audio (not working properly at the moment)
		if (
			voicePromptStatus.isLoaded &&
			!isPlayingPrompt &&
			voicePromptStatus.positionMillis >= 30500
		) {
			const status = await voicePromptObj.replayAsync();
			console.log("replaying");
			return setVoicePromptStatus(status);
		}
	};

	const updatePromptPlaying = (playbackStatus) => {
		setIsPlayingPrompt(playbackStatus.isPlaying);
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

		let updatedRecordings = [...recordings];
		const { sound, status } = await recording.createNewLoadedSoundAsync();
		updatedRecordings.push({
			sound: sound,
			duration: getDurationFormatted(status.durationMillis),
			file: recording.getURI(),
		});

		setRecordings(updatedRecordings);
	};

	// const getRecordingLines = () => {
	// 	return recordings.map((recordingLine, index) => {
	// 		return (
	// 			<SpeakerContainer key={index}>
	// 				<AntDesign name="sound" size={80} color="black" />
	// 				<Text>{recordingLine.duration}</Text>
	// 			</SpeakerContainer>
	// 		);
	// 	});
	// };

	const handleRecording = async () => {
		if (!recording && recordings.length !== 0) {
			const status = await recordings[0].sound.getStatusAsync();
			if (
				status.positionMillis < status.durationMillis &&
				!isPlayingRecording
			) {
				const status = await recordings[0].sound.playAsync();
				setIsPlayingRecording(true);
				console.log("playing", status);
			} else if (
				status.positionMillis === status.durationMillis &&
				isPlayingRecording
			) {
				const status = await recordings[0].sound.replayAsync();
				console.log("replaying", status);
			} else if (
				status.positionMillis !== status.durationMillis &&
				isPlayingRecording
			) {
				const status = await recordings[0].sound.pauseAsync();
				setIsPlayingRecording(false);
				console.log("pausing", status);
			}
		} else if (!recording && recordings.length === 0) {
			startRecording();
			console.log("start recording");
		} else if (recording) {
			stopRecording();
			console.log("stop recording");
		}
	};

	const handleEscape = () => {
		if (isPlayingPrompt) {
			voicePromptObj.stopAsync();
		}
		// setShowVoiceRecording(false);
		setModalVisible(true);
	};

	return (
		<>
			{!recording && recordings.length === 0 ? (
				<EscapeButton onPress={handleEscape}>
					<AntDesign name="close" size={20} color="#797979" />
				</EscapeButton>
			) : null}
			<View>
				<Heading recording={recording} recordings={recordings}>
					What is on your mind?
				</Heading>
				{!recording && recordings.length === 0 ? (
					<LinearGradient
						colors={["#9F91CE", "#7CA3CA"]}
						style={{ borderRadius: 50, alignSelf: "center", marginTop: 70 }}
					>
						<PromptAudioButton onPress={handleAudioPlayPause}>
							{!isPlayingPrompt ? (
								<AntDesign name="caretright" size={16} color="#FFFEFE" />
							) : (
								<FontAwesome5 name="pause" size={16} color="#FFFEFE" />
							)}
						</PromptAudioButton>
					</LinearGradient>
				) : null}
			</View>
			<Text>{message}</Text>
			<RecordingContainer recording={recording} recordings={recordings}>
				<LinearGradient
					colors={["#e0e0e0", "transparent"]}
					start={{ x: 0, y: 0.05 }}
					style={{
						width: 100,
						height: 100,
						borderRadius: 50,
						justifyContent: "center",
					}}
				>
					<RecordButton status={recording} onPress={handleRecording}>
						<GradientText>
							{!recording && recordings.length !== 0 && !isPlayingRecording ? (
								<AntDesign name="caretright" size={50} color="black" />
							) : !recording &&
							  recordings.length !== 0 &&
							  isPlayingRecording ? (
								<FontAwesome5 name="pause" size={50} color="black" />
							) : !recording && recordings.length === 0 ? (
								<Entypo name="controller-record" size={70} color="black" />
							) : recording ? (
								<FontAwesome name="square" size={50} color="black" />
							) : null}
						</GradientText>
					</RecordButton>
				</LinearGradient>
				{!recording && recordings.length !== 0 ? (
					<RecordAgainButton
						onPress={() => {
							setRecordings([]);
							setIsPlayingRecording(false);
						}}
					>
						<RecordAgainText>Record Again?</RecordAgainText>
					</RecordAgainButton>
				) : (
					<SkipButton>
						<SkipText>Skip</SkipText>
					</SkipButton>
				)}
			</RecordingContainer>
			{recordings.length !== 0 ? (
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
					onPress={() => {
						if (isPlayingPrompt) {
							voicePromptObj.pauseAsync();
						}
						setShowVoiceRecording(false);
					}}
				>
					<ContinueText>Continue</ContinueText>
				</ContinueButton>
			) : null}
		</>
	);
};

export const getDurationFormatted = (millis) => {
	const minutes = millis / 1000 / 60;
	const minutesDisplay = Math.floor(minutes);
	const seconds = Math.round((minutes - minutesDisplay) * 60);
	const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
	return `${minutesDisplay}:${secondsDisplay}`;
};

// styles
const Heading = styled(Text)`
	font-size: 28px;
	font-family: PlayfairDisplay_600SemiBold;
	color: #505050;
	text-align: center;
	width: 323px;
	margin-top: ${(props) =>
		!props.recording && props.recordings.length === 0 ? "20px" : "50px"};
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
	border: ${(props) => (props.status ? "3px solid #F9C45E" : "none")};
`;

const RecordingContainer = styled(View)`
	align-items: center;
	justify-content: flex-end;
	margin-top: ${(props) =>
		!props.recording && props.recordings.length === 0 ? "250px" : "350px"};
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
	margin-top: 20px;
`;

const RecordAgainText = styled(Text)`
	font-family: OpenSans_600SemiBold;
	color: #505050;
	font-size: 16px;
`;

const SkipButton = styled(TouchableOpacity)`
	margin-top: 20px;
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
