import React from "react";
import { useEffect, useState } from "react";
import {
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
	TouchableOpacity,
	Image,
} from "react-native";
import styled from "styled-components";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { getDurationFormatted } from "../components/VoiceRecording";

const OnboardingScreen = (props) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [playbackObject, setPlaybackObject] = useState(null);
	const [playbackStatus, setPlaybackStatus] = useState(null);
	const [playbackPosition, setPlaybackPosition] = useState(null);
	const [playbackDuration, setPlaybackDuration] = useState(null);

	// when user pressess play the following triggers
	const handleAudioPlayPause = async () => {
		console.log("pressing", playbackStatus);
		// playing audio for the first time
		if (playbackStatus === null) {
			const playbackObject = new Audio.Sound();
			const status = await playbackObject.loadAsync(
				require("../../assets/audios/onboarding-audio.mp3"),
				{
					shouldPlay: true,
				}
			);
			setPlaybackObject(playbackObject);
			playbackObject.setProgressUpdateIntervalAsync(100);
			playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
			console.log("playing");
			return setPlaybackStatus(status);
		}

		// pausing audio
		if (
			playbackStatus.isLoaded &&
			playbackStatus.isPlaying &&
			playbackPosition < 99500
		) {
			const status = await playbackObject.pauseAsync();
			console.log("pausing");
			return setPlaybackStatus(status);
		}

		// resuming audio
		if (
			playbackStatus.isLoaded &&
			!playbackStatus.isPlaying &&
			playbackPosition < 99500
		) {
			const status = await playbackObject.playAsync();
			console.log("resuming");
			return setPlaybackStatus(status);
		}

		// replaying audio (not working properly at the moment)
		if (
			playbackStatus.isLoaded &&
			playbackStatus.isPlaying &&
			playbackPosition >= 99500
		) {
			const status = await playbackObject.replayAsync();
			console.log("replaying");
			return setPlaybackStatus(status);
		}
		// if (
		// 	playbackStatus.isLoaded &&
		// 	playbackStatus.positionMillis >= 3240 &&
		// 	!playbackStatus.isPlaying
		// ) {
		// 	console.log("replaying");
		// 	// const status = await playbackObject.playFromPositionAsync(0);
		// 	const status = await playbackObject.replayAsync();
		// 	return setPlaybackStatus(status);
		// }
	};

	const onPlaybackStatusUpdate = (playbackStatus) => {
		if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
			// console.log(playbackStatus);
			setPlaybackPosition(playbackStatus.positionMillis);
			setPlaybackDuration(playbackStatus.durationMillis);
		}
	};

	const calculateSeekBar = () => {
		if (playbackPosition !== null && playbackDuration !== null) {
			return playbackPosition / playbackDuration;
		} else {
			return 0;
		}
	};

	const handleBackward = async () => {
		if (playbackStatus) {
			playbackObject.setPositionAsync(playbackPosition - 10000);
		}
	};

	const handleForward = async () => {
		if (playbackStatus) {
			playbackObject.setPositionAsync(playbackPosition + 10000);
		}
	};

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			<SkipButton
				onPress={() => {
					props.navigation.navigate("Entries");
					if (playbackObject) {
						playbackObject.stopAsync();
					}
				}}
			>
				<SkipText>Skip</SkipText>
			</SkipButton>

			<TextContainer>
				<IntroText>Hi, I'm Cope</IntroText>
				<IntroText>Let me introduce myself.</IntroText>
			</TextContainer>

			<ImageContainer>
				<Image source={require("../../assets/images/cope.png")} />
			</ImageContainer>
			<ProgressContainer>
				<Slider
					style={{ width: 350, height: 50 }}
					value={calculateSeekBar()}
					minimumValue={0}
					maximumValue={1}
					minimumTrackTintColor="#9C94CE"
					maximumTrackTintColor="#C2C2C2"
					thumbTintColor="#8E9BCD"
				/>
				<ProgressTextContainer>
					<ProgressText>{getDurationFormatted(playbackPosition)}</ProgressText>
					<ProgressText>
						-{getDurationFormatted(playbackDuration - playbackPosition)}
					</ProgressText>
				</ProgressTextContainer>
			</ProgressContainer>
			<AudioControlContainer>
				<ForwardBackwardButton onPress={handleBackward}>
					<AntDesign name="banckward" size={15} color="#F9C45E" />
				</ForwardBackwardButton>
				<LinearGradient
					colors={["#9F91CE", "#7CA3CA"]}
					style={{ borderRadius: 50 }}
				>
					<PlayPauseButton onPress={handleAudioPlayPause}>
						{playbackStatus === null ||
						!playbackStatus.isPlaying ||
						playbackPosition > 99500 ? (
							<AntDesign name="caretright" size={24} color="#FFFEFE" />
						) : (playbackStatus !== null && playbackStatus.isPlaying) ||
						  playbackPosition < 99500 ? (
							<FontAwesome5 name="pause" size={24} color="#FFFEFE" />
						) : null}
					</PlayPauseButton>
				</LinearGradient>
				<ForwardBackwardButton onPress={handleForward}>
					<AntDesign name="forward" size={15} color="#F9C45E" />
				</ForwardBackwardButton>
			</AudioControlContainer>
			<SessionButton
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
					props.navigation.navigate("New Session");
					if (playbackObject) {
						playbackObject.stopAsync();
					}
				}}
			>
				<SessionButtonText>Start a Session</SessionButtonText>
			</SessionButton>
		</ScreenContainer>
	);
};

const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	margin: 20px;
`;

const TextContainer = styled(View)`
	margin-top: 40px;
`;

const IntroText = styled(Text)`
	font-family: PlayfairDisplay_700Bold;
	color: #505050;
	font-size: 28px;
	text-align: center;
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

const ImageContainer = styled(View)`
	align-items: center;
	margin: 70px 0;
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
`;

const ProgressTextContainer = styled(View)`
	flex-direction: row;
	justify-content: space-between;
	width: 320px;
	align-self: center;
`;

const ProgressText = styled(Text)`
	color: #505050;
	font-family: OpenSans_600SemiBold;
`;

const SessionButton = styled(TouchableOpacity)`
	background-color: #f9c45e;
	align-self: center;
	margin-top: 50px;
	padding: 10px 20px;
	border-radius: 10px;
`;

const SessionButtonText = styled(Text)`
	color: #505050;
	font-size: 18px;
`;

export default OnboardingScreen;
