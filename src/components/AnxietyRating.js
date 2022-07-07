import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

// where user will rate their anxiety
const AnxietyRating = ({
	feeling,
	setFeeling,
	setShowRating,
	setShowCategories,
}) => {
	const [isContinue, setIsContinue] = useState(false);

	const handleFeelingSelection = (currentFeeling) => {
		// if (feelingsArray.includes(feeling)) {
		// 	console.log("match");
		// 	const index = feelingsArray.indexOf(feeling);
		// 	feelingsArray.splice(index, 1);
		// } else {
		// 	console.log("no match");
		// 	feelingsArray.push(feeling);
		// }
		// console.log(feelingsArray);
		// if (feelingsArray.length > 0) {
		// 	setIsContinue(true);
		// } else {
		// 	setIsContinue(false);
		// }
		if (!feeling || feeling !== currentFeeling) {
			setFeeling(currentFeeling);
			setIsContinue(true);
			console.log(isContinue);
		} else if (feeling === currentFeeling) {
			setFeeling("");
			setIsContinue(false);
			console.log(isContinue);
		}
		// setShowRating(false);
		// setShowCategories(true);
	};

	const handleContinue = () => {
		setShowRating(false);
		setShowCategories(true);
	};

	const feelingsData = [
		{ feeling: "Doing Good", img: require("../../assets/good-emoji.png") },
		{ feeling: "Okay, I Guess", img: require("../../assets/okay-emoji.png") },
		{
			feeling: "Little Tense",
			img: require("../../assets/littletense-emoji.png"),
		},
		{
			feeling: "Kinda Stressing",
			img: require("../../assets/stressing-emoji.png"),
		},
		{
			feeling: "Overwhelmed",
			img: require("../../assets/overwhelmed-emoji.png"),
		},
		{
			feeling: "Freaking Out",
			img: require("../../assets/freakingout-emoji.png"),
		},
	];

	return (
		<>
			<View>
				<Heading>How anxious are you feeling now?</Heading>
			</View>
			<RatingContainer>
				{feelingsData.map((item, index) => {
					return (
						<LinearGradient
							key={index}
							colors={["#9F91CE", "#7CA3CA"]}
							style={{
								width: 120,
								height: 120,
								borderRadius: 10,
							}}
						>
							<MoodButton
								onPress={() => {
									handleFeelingSelection(item.feeling);
								}}
								style={{
									borderWidth: 2,
									borderColor:
										feeling === item.feeling ? "#f9c45e" : "transparent",
								}}
							>
								<MoodTitle>{item.feeling}</MoodTitle>
								<MoodIcon source={item.img} />
							</MoodButton>
						</LinearGradient>
					);
				})}
			</RatingContainer>
			<ContinueButtonContainer>
				<ContinueButton
					continue={isContinue}
					disabled={isContinue ? false : true}
					style={
						isContinue
							? {
									shadowColor: "#000",
									shadowOffset: {
										width: 0,
										height: 2,
									},
									shadowOpacity: 0.25,
									shadowRadius: 4,

									elevation: 5,
							  }
							: null
					}
					onPress={handleContinue}
				>
					<ContinueText>Continue</ContinueText>
				</ContinueButton>
			</ContinueButtonContainer>
		</>
	);
};

// styles
const Heading = styled(Text)`
	font-size: 28px;
	font-family: PlayfairDisplay_700Bold;
	color: #505050;
	text-align: center;
`;

const RatingContainer = styled(View)`
	flex: 0.75;
	align-self: center;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-content: space-around;
	width: 90%;
	margin-top: 50px;
`;

const MoodButton = styled(TouchableOpacity)`
	align-items: center;
	flex-direction: column-reverse;
	justify-content: center;
	width: 120px;
	height: 120px;
	border-radius: 10px;
`;

const MoodTitle = styled(Text)`
	font-size: 14px;
	font-family: OpenSans_600SemiBold;
	color: white;
`;

const MoodIcon = styled(Image)`
	margin: 12px;
`;

const ContinueButton = styled(TouchableOpacity)`
	border: 1px solid #f9c45e;
	padding: 8px 15px;
	border-radius: 5px;
	background-color: ${(props) => (props.continue ? "#f9c45e" : "transparent")};
`;

const ContinueText = styled(Text)`
	color: #505050;
	font-family: OpenSans_700Bold;
	font-size: 16px;
`;

const ContinueButtonContainer = styled(View)`
	flex: 0.18;
	align-items: center;
	justify-content: flex-end;
`;

export default AnxietyRating;
