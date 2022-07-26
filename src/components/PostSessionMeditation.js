// modules
import React from "react";
import { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const PostSessionMeditation = ({ setShowMeditation, setModalVisible }) => {
	const [playbackObject, setPlaybackObject] = useState(null);
	const [playbackStatus, setPlaybackStatus] = useState(null);
	const [playbackPosition, setPlaybackPosition] = useState(null);
	const [playbackDuration, setPlaybackDuration] = useState(null);

	// when user pressess play the following triggers
	const handleAudioPlayPause = async () => {
		// playing audio for the first time
		if (playbackStatus === null) {
			const playbackObject = new Audio.Sound();
			const status = await playbackObject.loadAsync(
				require("../../assets/audios/meditation.mp3"),
				{
					shouldPlay: true,
				}
			);
			setPlaybackObject(playbackObject);
			playbackObject.setProgressUpdateIntervalAsync(100);
			playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
			return setPlaybackStatus(status);
		}

		// pausing audio
		if (
			playbackStatus.isLoaded &&
			playbackStatus.isPlaying &&
			playbackPosition < 168900
		) {
			const status = await playbackObject.pauseAsync();
			return setPlaybackStatus(status);
		}

		// resuming audio
		if (
			playbackStatus.isLoaded &&
			!playbackStatus.isPlaying &&
			playbackPosition < 168900
		) {
			const status = await playbackObject.playAsync();
			return setPlaybackStatus(status);
		}

		// replaying audio
		if (
			playbackStatus.isLoaded &&
			playbackStatus.isPlaying &&
			playbackPosition >= 168900
		) {
			const status = await playbackObject.replayAsync();
			return setPlaybackStatus(status);
		}
	};

	// callback function every 100 millis to update seekbar
	const onPlaybackStatusUpdate = (playbackStatus) => {
		if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
			setPlaybackPosition(playbackStatus.positionMillis);
			setPlaybackDuration(playbackStatus.durationMillis);
		}
		// console.log(playbackStatus);
	};

	// updates seekbar
	const calculateSeekBar = () => {
		if (playbackPosition !== null && playbackDuration !== null) {
			return playbackPosition / playbackDuration;
		} else {
			return 0;
		}
	};

	// rewinds audio by 10s
	const handleBackward = async () => {
		if (playbackStatus) {
			playbackObject.setPositionAsync(playbackPosition - 10000);
		}
	};

	// fast forwards audio by 10s
	const handleForward = async () => {
		if (playbackStatus) {
			playbackObject.setPositionAsync(playbackPosition + 10000);
		}
	};

	const handleEscape = () => {
		if (playbackObject) {
			playbackObject.stopAsync();
		}
		// setShowVoiceRecording(false);
		setModalVisible(true);
	};

	const handleContinue = () => {
		if (playbackObject) {
			playbackObject.stopAsync();
		}
		// setShowVoiceRecording(false);
		setShowMeditation(false);
	};

	return (
		<>
			<EscapeButton onPress={handleEscape}>
				<AntDesign name="close" size={20} color="#797979" />
			</EscapeButton>
			<View>
				<Heading>I will guide you through a meditation session.</Heading>
			</View>
			<ImageContainer>
				<Image
					source={require("../../assets/images/cope-woman.png")}
					style={{ width: 200, height: 200 }}
				/>
			</ImageContainer>
			<ProgressContainer>
				<Slider
					style={{ width: 250, height: 50 }}
					value={calculateSeekBar()}
					minimumValue={0}
					maximumValue={1}
					minimumTrackTintColor="#9C94CE"
					maximumTrackTintColor="#C2C2C2"
					thumbTintColor="transparent"
				/>
			</ProgressContainer>
			<AudioControlContainer>
				<ForwardBackwardButton onPress={handleBackward}>
					<Image source={require("../../assets/images/10s-backwards.png")} />
				</ForwardBackwardButton>
				<LinearGradient
					colors={["#9F91CE", "#7CA3CA"]}
					style={{ borderRadius: 50 }}
				>
					<PlayPauseButton onPress={handleAudioPlayPause}>
						{playbackStatus === null ||
						!playbackStatus.isPlaying ||
						playbackPosition > 168900 ? (
							<AntDesign name="caretright" size={32} color="#FFFEFE" />
						) : (playbackStatus !== null && playbackStatus.isPlaying) ||
						  playbackPosition < 168900 ? (
							<FontAwesome5 name="pause" size={32} color="#FFFEFE" />
						) : null}
					</PlayPauseButton>
				</LinearGradient>
				<ForwardBackwardButton onPress={handleForward}>
					<Image source={require("../../assets/images/10s-forward.png")} />
				</ForwardBackwardButton>
			</AudioControlContainer>
			<ContinueButton
				onPress={handleContinue}
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
				<ContinueText>Continue</ContinueText>
			</ContinueButton>
		</>
	);
};

// styles
const Heading = styled(Text)`
	font-size: 28px;
	font-family: PlayfairDisplay_600SemiBold;
	color: #505050;
	text-align: center;
	width: 318px;
	margin-top: 20px;
	align-self: center;
`;

const ImageContainer = styled(View)`
	align-items: center;
	margin-top: 80px;
`;

const AudioControlContainer = styled(View)`
	flex-direction: row;
	width: 50%;
	align-self: center;
	align-items: center;
	justify-content: space-around;
`;

const ForwardBackwardButton = styled(TouchableOpacity)``;

const PlayPauseButton = styled(TouchableOpacity)`
	width: 60px;
	height: 60px;
	align-items: center;
	justify-content: center;
`;

const ProgressContainer = styled(View)`
	align-items: center;
	margin-top: 60px;
	width: 250px;
	align-self: center;
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

export default PostSessionMeditation;
