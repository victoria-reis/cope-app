import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
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
const VoiceRecording = ({ navigation, setShowVoiceRecording }) => {
	const [recording, setRecording] = useState();
	const [recordings, setRecordings] = useState([]);
	const [message, setMessage] = useState("");
	const [isPlaying, setIsPlaying] = useState(false);

	const startRecording = async () => {
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

	const getRecordingLines = () => {
		return recordings.map((recordingLine, index) => {
			return (
				<SpeakerContainer key={index}>
					<AntDesign name="sound" size={80} color="black" />
					<Text>{recordingLine.duration}</Text>
				</SpeakerContainer>
			);
		});
	};

	const handleRecording = async () => {
		if (!recording && recordings.length !== 0) {
			// recordings[0].sound.replayAsync();
			// const status = await recordings[0].sound.playAsync();
			// setIsPlaying(true);
			const status = await recordings[0].sound.getStatusAsync();
			// console.log("playing", status);
			if (status.positionMillis < status.durationMillis && !isPlaying) {
				const status = await recordings[0].sound.playAsync();
				setIsPlaying(true);
				console.log("playing", status);
			} else if (status.positionMillis === status.durationMillis && isPlaying) {
				const status = await recordings[0].sound.replayAsync();
				// setIsPlaying(true);
				console.log("replaying", status);
			} else if (status.positionMillis !== status.durationMillis && isPlaying) {
				const status = await recordings[0].sound.pauseAsync();
				setIsPlaying(false);
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

	return (
		<>
			{!recording && recordings.length === 0 ? (
				<SkipButton>
					<SkipText>Skip</SkipText>
				</SkipButton>
			) : null}
			<View>
				<Heading recording={recording} recordings={recordings}>
					What is on your mind?
				</Heading>
				<LinearGradient
					colors={["#9F91CE", "#7CA3CA"]}
					style={{ borderRadius: 50, alignSelf: "center", marginTop: 60 }}
				>
					<PromptAudioButton>
						<AntDesign name="caretright" size={15} color="#FFFEFE" />
					</PromptAudioButton>
				</LinearGradient>
			</View>
			<Text>{message}</Text>
			<RecordingContainer>
				<LinearGradient
					colors={["#EEEAEC", "transparent"]}
					style={{
						width: 100,
						height: 100,
						borderRadius: 50,
						justifyContent: "center",
						marginBottom: 10,
					}}
				>
					<RecordButton status={recording} onPress={handleRecording}>
						<GradientText>
							{!recording && recordings.length !== 0 && !isPlaying ? (
								<AntDesign name="caretright" size={50} color="black" />
							) : !recording && recordings.length !== 0 && isPlaying ? (
								<FontAwesome5 name="pause" size={50} color="black" />
							) : !recording && recordings.length === 0 ? (
								<Entypo name="controller-record" size={70} color="black" />
							) : recording ? (
								<FontAwesome name="square" size={50} color="black" />
							) : null}
						</GradientText>
					</RecordButton>
				</LinearGradient>
				<Text>
					{!recording && recordings.length !== 0 ? (
						<RecordAgainButton
							onPress={() => {
								setRecordings([]);
								setIsPlaying(false);
							}}
						>
							<RecordAgainText>Record Again?</RecordAgainText>
						</RecordAgainButton>
					) : null}
				</Text>
			</RecordingContainer>
			{recordings.length !== 0 ? (
				<ContinueButton
					style={{
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 4,

						elevation: 5,
					}}
					onPress={() => {
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
	font-family: PlayfairDisplay_700Bold;
	color: #505050;
	text-align: center;
	margin-top: ${(props) =>
		!props.recording && props.recordings.length === 0 ? "38px" : "60px"};
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
	flex: 0.78;
	align-items: center;
	justify-content: flex-end;
`;

const ContinueButton = styled(TouchableOpacity)`
	padding: 8px 15px;
	border-radius: 5px;
	background-color: #f9c45e;
	align-self: center;
	position: absolute;
	bottom: 30px;
`;

const ContinueText = styled(Text)`
	color: #505050;
	font-family: OpenSans_700Bold;
	font-size: 16px;
`;

const DeleteButton = styled(TouchableOpacity)`
	align-items: center;
	margin-top: 20px;
	background-color: #d9d9d9;
	padding: 10px 30px;
	border: 2px solid black;
	border-radius: 15px;
	align-self: center;
`;

const SpeakerContainer = styled(View)`
	align-items: center;
	width: 100%;
	top: 250px;
	position: absolute;
`;

const RecordAgainButton = styled(TouchableOpacity)``;

const RecordAgainText = styled(Text)`
	font-family: OpenSans_700Bold;
	color: #505050;
	font-size: 16px;
`;

const SkipButton = styled(TouchableOpacity)`
	background-color: #f9f8f8;
	padding: 3px;
	width: 60px;
	align-items: center;
	align-self: flex-end;
	border-radius: 60px;
`;

const SkipText = styled(Text)`
	color: #bdbdbd;
	font-family: OpenSans_700Bold;
	font-size: 12px;
`;

const PromptAudioButton = styled(TouchableOpacity)`
	height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center;
`;

export default VoiceRecording;
