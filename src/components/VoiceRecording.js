import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import styled from "styled-components";
import { Audio } from "expo-av";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
//import * as Sharing from 'expo-sharing';

// where user will record voice
const VoiceRecording = ({ navigation }) => {
	const [recording, setRecording] = useState();
	const [recordings, setRecordings] = useState([]);
	const [message, setMessage] = useState("");

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

	const handleRecording = () => {
		if (!recording && recordings.length !== 0) {
			recordings[0].sound.replayAsync();
		} else if (!recording) {
			startRecording();
		} else {
			stopRecording();
		}
	};

	return (
		<>
			<View>
				<Heading>Tell me more. What is on your mind?</Heading>
			</View>
			<Text>{message}</Text>
			{getRecordingLines()}
			<RecordingContainer>
				<RecordButton status={recording} onPress={handleRecording}>
					<Text>
						{!recording && recordings.length !== 0 ? (
							<AntDesign name="caretright" size={40} color="black" />
						) : !recording ? (
							<Entypo name="controller-record" size={60} color="#DF6A6A" />
						) : (
							<FontAwesome name="square" size={40} color="black" />
						)}
					</Text>
				</RecordButton>
				<Text>
					{!recording && recordings.length !== 0
						? "Play audio"
						: !recording
						? "Start recording"
						: "Stop recording"}
				</Text>
			</RecordingContainer>
			{recordings.length !== 0 ? (
				<>
					<ContinueButton
						onPress={() => {
							navigation.navigate("Home");
						}}
					>
						<Text>Continue</Text>
					</ContinueButton>
					<DeleteButton
						onPress={() => {
							setRecordings([]);
						}}
					>
						<Text style={{ color: "red" }}>Delete</Text>
					</DeleteButton>
				</>
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
	font-size: 30px;
	font-weight: bold;
`;

const RecordButton = styled(TouchableOpacity)`
	background-color: #d9d9d9;
	width: 80px;
	height: 80px;
	align-self: center;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
	border: ${(props) => (props.status ? "3px solid #df6a6a" : "none")};
	margin: 20px 0;
`;

const RecordingContainer = styled(View)`
	flex: 0.8;
	align-items: center;
	justify-content: flex-end;
`;

const ContinueButton = styled(TouchableOpacity)`
	background-color: #d9d9d9;
	padding: 10px 30px;
	align-self: center;
	border: 2px solid black;
	border-radius: 15px;
	position: absolute;
	bottom: 30px;
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

export default VoiceRecording;
