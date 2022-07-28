import React from "react";
import { useState } from "react";
import {
	SafeAreaView,
	Text,
	View,
	Platform,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import styled from "styled-components";
import { Entypo } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import uuid from "react-native-uuid";

import DeleteModal from "../components/DeleteModal";

const SessionDetailsScreen = ({ route }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [audioStatus, setAudioStatus] = useState(null);
	const [audioObj, setAudioObj] = useState(null);
	const [isPlaying, setIsPlaying] = useState(null);
	const [playbackPosition, setPlaybackPosition] = useState(null);
	const [playbackDuration, setPlaybackDuration] = useState(null);

	// console.warn(route.params);
	// const creationDate = new Date(route.params.date);
	const getDurationFormatted = (millis) => {
		const minutes = millis / 1000 / 60;
		const minutesDisplay = Math.floor(minutes);
		const seconds = Math.round((minutes - minutesDisplay) * 60);
		const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
		return `${minutesDisplay}:${secondsDisplay}`;
	};

	const handleAudioPlayPause = async (sound, index) => {
		// console.log("pressing", voicePromptStatus);
		// playing audio for the first time
		// const playbackObject = new Audio.Sound();
		// const status = await playbackObject.loadAsync(
		// 	require("../../assets/audios/what-could-you-do-differently.mp3"),
		// 	{
		// 		shouldPlay: true,
		// 	}
		// );

		// console.log(audioStatus.uri);
		// console.log(sound.file);

		if (audioStatus === null) {
			// if (audioStatus && audioStatus.uri !== sound.file) {
			// 	audioObj.stopAsync();
			// }
			const playbackObject = new Audio.Sound();
			const status = await playbackObject.loadAsync(
				{ uri: sound.file },
				{
					shouldPlay: true,
				}
			);
			setAudioObj(playbackObject);
			playbackObject.setProgressUpdateIntervalAsync(100);
			playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
			console.log("playing");
			return setAudioStatus(status);
		}

		if (
			audioStatus.isLoaded &&
			isPlaying &&
			audioStatus.positionMillis < audioStatus.durationMillis
		) {
			// pausing audio
			const status = await audioObj.pauseAsync();
			console.log("pausing");
			return setAudioStatus(status);
		}

		// resuming audio
		if (
			audioStatus.isLoaded &&
			!isPlaying &&
			audioStatus.positionMillis < audioStatus.durationMillis
		) {
			const status = await audioObj.playAsync();
			console.log("resuming");
			return setAudioStatus(status);
		}

		// // replaying audio (not working properly at the moment)
		if (
			audioStatus.isLoaded &&
			!isPlaying &&
			audioStatus.positionMillis >= audioStatus.durationMillis
		) {
			const status = await audioObj.replayAsync();
			console.log("replaying");
			return setAudioStatus(status);
		}
	};

	const onPlaybackStatusUpdate = (playbackStatus) => {
		if (audioStatus !== null) {
			setIsPlaying(audioStatus.isPlaying);
			setPlaybackPosition(audioStatus.positionMillis);
			setPlaybackDuration(audioStatus.durationMillis);
		}
	};

	// const calculateSeekBar = () => {
	// 	if (playbackPosition !== null && playbackDuration !== null) {
	// 		return playbackPosition / playbackDuration;
	// 	} else {
	// 		return 0;
	// 	}
	// };

	return (
		<ScreenContainer
			style={Platform.OS ? { marginTop: StatusBar.currentHeight } : null}
		>
			{modalVisible ? (
				<DeleteModal
					setModalVisibleSession={setModalVisible}
					modalVisibleSession={modalVisible}
				/>
			) : null}
			<Heading1>Session</Heading1>
			<Date>{route.params.date}</Date>
			<OptionsButton onPress={() => setModalVisible(true)}>
				<Entypo name="dots-three-horizontal" size={24} color="#F9C45E" />
			</OptionsButton>
			<ScrollView
				style={{
					width: 325,
					alignSelf: "center",
				}}
			>
				<Card
					key={uuid.v4()}
					style={{
						shadowColor: "#BEBBBC",
						shadowOffset: {
							width: 12,
							height: 12,
						},
						shadowOpacity: 1,
						shadowRadius: 24,
						elevation: 10,
					}}
				>
					<AnxietyRatingContainer>
						{route.params.feeling === "Doing Good" ? (
							<Icon
								source={require("../../assets/images/mini-doing-good-emoji.png")}
							/>
						) : route.params.feeling === "Okay, I Guess" ? (
							<Icon
								source={require("../../assets/images/mini-okay-emoji.png")}
							/>
						) : route.params.feeling === "Kinda Stressing" ? (
							<Icon
								source={require("../../assets/images/mini-stressing-emoji.png")}
							/>
						) : route.params.feeling === "Overwhelmed" ? (
							<Icon
								source={require("../../assets/images/mini-overwhelmed-emoji.png")}
							/>
						) : route.params.feeling === "Freaking Out" ? (
							<Icon
								source={require("../../assets/images/mini-freaking-out-emoji.png")}
							/>
						) : route.params.feeling === "Little Tense" ? (
							<Icon
								source={require("../../assets/images/mini-little-tense-emoji.png")}
							/>
						) : null}
						<AnxietyRatingText>{route.params.feeling}</AnxietyRatingText>
					</AnxietyRatingContainer>
					<StressorsContainer>
						{route.params.categories.map((stressor, index) => {
							return (
								<StressorsTag
									key={uuid.v4()}
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
									{stressor}
								</StressorsTag>
							);
						})}
					</StressorsContainer>
				</Card>
				<Heading2>View Summary</Heading2>
				{route.params.voiceEntries.map((audio, index) => {
					if (audio.file) {
						// if (index === 0) {
						// 	return <Question><Question>What are you gratful for?</Question></Question>;
						// } else if (index === 1) {
						// 	return <Question>Can you change your thinking?</Question>;
						// } else if (index === 2) {
						// 	return <Question>What could you do differently?</Question>;
						// } else if (index === 3) {
						// 	return <Question>What are you gratful for?</Question>;
						// }
						return (
							<>
								<Question key={uuid.v4()}>
									{index === 0
										? "What's on your mind?"
										: index === 1
										? "Can you change your thinking?"
										: index === 2
										? "What could you do differently?"
										: index === 3
										? "What are you grateful for?"
										: null}
								</Question>
								<AudioContainer key={uuid.v4()}>
									<LinearGradient
										colors={["#e0e0e0", "transparent"]}
										start={{ x: 0, y: 0.05 }}
										style={{
											width: 30,
											height: 30,
											borderRadius: 50,
											justifyContent: "center",
											alignItems: "center",
											alignSelf: "center",
										}}
									>
										<PromptAudioButton
											onPress={() => {
												handleAudioPlayPause(audio, index);
											}}
										>
											{/* {!isPlayingPrompt ? (
												// <AntDesign name="caretright" size={16} color="#FFFEFE" />
												<Image
													source={require("../../assets/images/white-play-button.png")}
													style={{ width: 10, height: 12, marginLeft: 2 }}
												/>
											) : (
												// <FontAwesome5 name="pause" size={16} color="#FFFEFE" />
												<Image
													source={require("../../assets/images/white-pause-button.png")}
													style={{ width: 12, height: 12 }}
												/>
											)} */}
											{/* <Image
												source={require("../../assets/images/gradient-pause-button.png")}
												style={{ width: 12, height: 12 }}
											/> */}
											<Image
												source={require("../../assets/images/gradient-play-button.png")}
												style={{ width: 12, height: 12, marginLeft: 2 }}
											/>
										</PromptAudioButton>
									</LinearGradient>
									<Slider
										style={{ width: 175, height: 50 }}
										value={0}
										minimumValue={0}
										maximumValue={1}
										minimumTrackTintColor="#9C94CE"
										maximumTrackTintColor="#C2C2C2"
										thumbTintColor="#9C94CE"
									/>
									<DurationText>
										-{getDurationFormatted(audio.duration)}
									</DurationText>
								</AudioContainer>
							</>
						);
					}
				})}
			</ScrollView>
		</ScreenContainer>
	);
};

// styles
const ScreenContainer = styled(SafeAreaView)`
	flex: 1;
	margin: 20px;
`;

const Heading1 = styled(Text)`
	font-size: 28px;
	font-family: PlayfairDisplay_700Bold;
	color: #505050;
	text-align: center;
	margin-top: 60px;
	/* border: 1px solid blue; */
`;

const Heading2 = styled(Text)`
	color: #505050;
	font-family: OpenSans_600SemiBold;
	font-size: 18px;
	margin-top: 30px;
	margin-left: 5px;
`;

const Date = styled(Text)`
	font-size: 20px;
	font-family: OpenSans_400Regular;
	color: #505050;
	text-align: center;
	margin-top: 13px;
	/* border: 1px solid blue; */
`;

const Question = styled(Text)`
	font-size: 16px;
	font-family: OpenSans_400Regular;
	color: #505050;
	/* text-align: center; */
	/* margin-top: 13px; */
	margin: 20px 0 20px 5px;
	/* margin-left: 5px; */
	/* border: 1px solid blue; */
`;

const OptionsButton = styled(TouchableOpacity)`
	/* border: 1px solid blue; */
	margin-top: 9px;
	width: 90%;
	align-items: flex-end;
	align-self: center;
`;

const Card = styled(View)`
	width: 315px;
	flex-direction: row;
	flex-wrap: wrap;
	align-self: center;
	margin: 5px 0 20px;
	/* width: 292px; */
	padding: 10px;
	border-radius: 10px;
	background-color: #f2f2f2;
`;

const AudioContainer = styled(View)`
	width: 315px;
	height: 50px;
	flex-direction: row;
	border-radius: 10px;
	padding: 0 10px;
	/* flex-wrap: wrap; */
	align-self: center;
	/* margin: 5px 0 20px; */
	/* width: 292px; */
	/* padding: 10px;
	border-radius: 10px;
	background-color: #f2f2f2; */
	border: 1px solid #f9c45e;
`;

const DurationText = styled(Text)`
	font-size: 16px;
	font-family: OpenSans_400Regular;
	color: #505050;
	align-self: center;
`;

const AnxietyRatingContainer = styled(View)`
	flex-direction: row;
	margin-left: 5px;
	/* border: 1px solid red; */
`;

const AnxietyRatingText = styled(Text)`
	font-size: 14px;
	font-family: OpenSans_600SemiBold;
	margin-left: 10px;
	align-self: center;
	color: #505050;
`;

const StressorsContainer = styled(View)`
	/* border: 1px solid purple; */
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 5px;
	width: 95%;
`;

const StressorsTag = styled(Text)`
	background-color: #9f91ce;
	min-width: 58px;
	text-align: center;
	font-size: 12px;
	font-family: OpenSans_400Regular;
	color: white;
	padding: 3px 12px;
	margin: 5px;
	border-radius: 12px;
	/* overflow: hidden; */
`;

const Icon = styled(Image)`
	width: 25px;
	height: 25px;
`;

const PromptAudioButton = styled(TouchableOpacity)`
	/* height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center; */
`;

export default SessionDetailsScreen;
