import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components";
import { Audio } from "expo-av";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
//import * as Sharing from 'expo-sharing';

// where user will record voice
const VoiceRecording = () => {
	const [recording, setRecording] = useState();
	const [recordings, setRecordings] = useState([]);
	const [message, setMessage] = useState("");

	async function startRecording() {
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
	}

	async function stopRecording() {
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
	}

	function getDurationFormatted(millis) {
		const minutes = millis / 1000 / 60;
		const minutesDisplay = Math.floor(minutes);
		const seconds = Math.round((minutes - minutesDisplay) * 60);
		const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
		return `${minutesDisplay}:${secondsDisplay}`;
	}

	function getRecordingLines() {
		return recordings.map((recordingLine, index) => {
			return (
				<View key={index} style={styles.row}>
					<Text style={styles.fill}>
						Recording {index + 1} - {recordingLine.duration}
					</Text>
					<PlayButton onPress={() => recordingLine.sound.replayAsync()}>
						<Text>Play</Text>
						<Text>
							<AntDesign name="sound" size={40} color="black" />
						</Text>
					</PlayButton>
				</View>
			);
		});
	}
	return (
		<>
			<View>
				<Heading>Tell me more. What is on your mind?</Heading>
			</View>
			<Text>{message}</Text>
			{getRecordingLines()}
			<RecordingContainer>
				<RecordButton
					status={recording}
					onPress={recording ? stopRecording : startRecording}
				>
					<Text>
						{!recording ? (
							<Entypo name="controller-record" size={60} color="#DF6A6A" />
						) : (
							<FontAwesome name="square" size={40} color="black" />
						)}
					</Text>
				</RecordButton>
				<Text>{recording ? "Stop Recording" : "Start Recording"}</Text>
			</RecordingContainer>
			{recordings.length !== 0 ? (
				<ContinueButton
					onPress={() => {
						console.log("pressed");
					}}
				>
					<Text>Continue</Text>
				</ContinueButton>
			) : null}
		</>
	);
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

const PlayButton = styled(TouchableOpacity)`
	align-items: center;
	flex-direction: column-reverse;
`;

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	fill: {
		flex: 1,
		fontSize: 18,
	},
	button: {
		margin: 16,
	},
});

export default VoiceRecording;
