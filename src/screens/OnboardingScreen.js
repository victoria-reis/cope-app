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
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const OnboardingScreen = (props) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [playbackObject, setPlaybackObject] = useState(null);
	const [playbackStatus, setPlaybackStatus] = useState(null);

	// const handleSkip = () => {
	//     navigation.navigate()
	// };

	// useEffect(() => {
	// 	if (playbackObject === null) {
	// 		setPlaybackObject(new Audio.Sound());
	// 	}
	// }, []);

	// const handleAudio = async () => {
	// 	console.log("pressed");

	// 	if (playbackObject !== null && playbackStatus === null) {
	// 		const status = await playbackObject.loadAsync(
	// 			require("../../assets/voice.mp3"),
	// 			{ shouldPlay: true }
	// 		);
	// 		setIsPlaying(true);
	// 		return setPlaybackStatus(status);
	// 	}

	// 	// It will pause our audio
	// 	if (playbackStatus.isPlaying) {
	// 		const status = await playbackObject.pauseAsync();
	// 		setIsPlaying(false);
	// 		return setPlaybackStatus(status);
	// 	}

	// 	// It will resume our audio
	// 	if (!playbackStatus.isPlaying) {
	// 		const status = await playbackObject.playAsync();
	// 		setIsPlaying(true);
	// 		return setPlaybackStatus(status);
	// 	}
	// };

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			<SkipButton
				onPress={() => {
					props.navigation.navigate("Home");
				}}
			>
				<SkipText>Skip</SkipText>
			</SkipButton>
			<TextContainer>
				<IntroText>Hi, I'm Cope</IntroText>
				<IntroText>Let me introduce myself.</IntroText>
			</TextContainer>
			<ImageContainer>
				<Image source={require("../../assets/cope.png")} />
			</ImageContainer>
			<ProgressContainer>
				<Slider
					style={{ width: 350, height: 50 }}
					value={10}
					minimumValue={0}
					maximumValue={100}
					minimumTrackTintColor="#9C94CE"
					maximumTrackTintColor="#C2C2C2"
					thumbTintColor="#8E9BCD"
				/>
				<ProgressTextContainer>
					<ProgressText>0:00</ProgressText>
					<ProgressText>1:00</ProgressText>
				</ProgressTextContainer>
			</ProgressContainer>
			<AudioControlContainer>
				<ForwardBackwardButton>
					<AntDesign name="banckward" size={15} color="#F9C45E" />
				</ForwardBackwardButton>
				<LinearGradient
					colors={["#9F91CE", "#7CA3CA"]}
					style={{ borderRadius: 50 }}
				>
					<PlayPauseButton onPress={() => {}}>
						{!isPlaying ? (
							<AntDesign name="caretright" size={24} color="white" />
						) : (
							<AntDesign name="pause" size={24} color="black" />
						)}
					</PlayPauseButton>
				</LinearGradient>
				<ForwardBackwardButton>
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
	/* border: 1px solid red; */
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
`;

const ImageContainer = styled(View)`
	/* border: 1px solid red; */
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
	/* border: 1px solid red; */
`;

const ProgressTextContainer = styled(View)`
	flex-direction: row;
	justify-content: space-between;
	width: 320px;
	align-self: center;
`;

const ProgressText = styled(Text)`
	color: #505050;
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
