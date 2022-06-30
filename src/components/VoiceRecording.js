import React from "react";
import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import styled from "styled-components";
import { Audio } from 'expo-av';
//import * as Sharing from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';

// where user will record voice
const VoiceRecording = () => {
	const [recording, setRecording] = React.useState();
	const [recordings, setRecordings] = React.useState([]);
	const [message, setMessage] = React.useState("");
  
	async function startRecording() {
	  try {
		const permission = await Audio.requestPermissionsAsync();
  
		if (permission.status === "granted") {
		  await Audio.setAudioModeAsync({
			allowsRecordingIOS: true,
			playsInSilentModeIOS: true
		  });
		  
		  const { recording } = await Audio.Recording.createAsync(
			Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
		  );
  
		  setRecording(recording);
		} else {
		  setMessage("Please grant permission to app to access microphone");
		}
	  } catch (err) {
		console.error('Failed to start recording', err);
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
		file: recording.getURI()
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
			<Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
			<Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
		
		  </View>
		);
	  });
	}
	return (
		<>
			<View>
				<Heading>Tell me more. What is on your mind?</Heading>
				<Text>{message}</Text>
      			<Button
        			title={recording ? 'Stop Recording' : 'Start Recording'}
        			onPress={recording ? stopRecording : startRecording} />
      				{getRecordingLines()}
      			<StatusBar style="auto" />
			</View>
		</>
	);
};

// styles
const Heading = styled(Text)`
	font-size: 30px;
	font-weight: bold;
`;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	row: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	fill: {
	  flex: 1,
	  margin: 16
	},
	button: {
	  margin: 16
	}
  });

export default VoiceRecording;
