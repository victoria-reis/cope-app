// modules
import React from "react";
import { useState } from "react";
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

const OnboardingScreen = (props) => {
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
				require("../../assets/audios/onboarding-audio.mp3"),
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
			playbackPosition < 99500
		) {
			const status = await playbackObject.pauseAsync();
			return setPlaybackStatus(status);
		}

		// resuming audio
		if (
			playbackStatus.isLoaded &&
			!playbackStatus.isPlaying &&
			playbackPosition < 99500
		) {
			const status = await playbackObject.playAsync();
			return setPlaybackStatus(status);
		}

		// replaying audio
		if (
			playbackStatus.isLoaded &&
			playbackStatus.isPlaying &&
			playbackPosition >= 99500
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

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			<TextContainer>
				<IntroText>Hi, I'm Cope</IntroText>
				<IntroText>Let me introduce myself.</IntroText>
			</TextContainer>
			<ImageContainer>
				<Image source={require("../../assets/images/cope-woman.png")} />
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
						playbackPosition > 99500 ? (
							<AntDesign name="caretright" size={32} color="#FFFEFE" />
						) : (playbackStatus !== null && playbackStatus.isPlaying) ||
						  playbackPosition < 99500 ? (
							<FontAwesome5 name="pause" size={32} color="#FFFEFE" />
						) : null}
					</PlayPauseButton>
				</LinearGradient>
				<ForwardBackwardButton onPress={handleForward}>
					<Image source={require("../../assets/images/10s-forward.png")} />
				</ForwardBackwardButton>
			</AudioControlContainer>
			<SessionButton
				style={{
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 0.15,
					shadowRadius: 4,
					elevation: 4,
				}}
				onPress={() => {
					props.navigation.navigate("New Session");
					if (playbackObject) {
						playbackObject.stopAsync();
					}
				}}
			>
				<SessionButtonText>Start Session</SessionButtonText>
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

const ImageContainer = styled(View)`
	align-items: center;
	margin: 90px 0;
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
	margin-top: -40px;
	width: 250px;
	align-self: center;
`;

const SessionButton = styled(TouchableOpacity)`
	background-color: #f9c45e;
	align-self: center;
	position: absolute;
	bottom: 60px;
	width: 132px;
	height: 32px;
	border-radius: 4px;
	justify-content: center;
`;

const SessionButtonText = styled(Text)`
	color: #505050;
	font-size: 16px;
	font-family: OpenSans_700Bold;
	text-align: center;
`;

export default OnboardingScreen;
