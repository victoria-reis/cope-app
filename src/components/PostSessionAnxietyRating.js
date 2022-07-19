import React from "react";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

// where user will rate their anxiety
const PostSessionAnxietyRating = ({
	feeling2,
	setFeeling2,
	navigation,
	setModalVisible,
	modalVisible,
}) => {
	const [canContinue, setCanContinue] = useState(false);

	const handleFeelingSelection = (currentFeeling) => {
		if (!feeling2 || feeling2 !== currentFeeling) {
			setFeeling2(currentFeeling);
			setCanContinue(true);
		} else if (feeling2 === currentFeeling) {
			setFeeling2("");
			setCanContinue(false);
		}
	};

	// const handleContinue = () => {
	// 	setShowRating(false);
	// 	setShowStressors(true);
	// };

	const feelingsData = [
		{
			feeling: "Doing Good",
			img: require("../../assets/images/good-emoji.png"),
		},
		{
			feeling: "Okay, I Guess",
			img: require("../../assets/images/okay-emoji.png"),
		},
		{
			feeling: "Little Tense",
			img: require("../../assets/images/littletense-emoji.png"),
		},
		{
			feeling: "Kinda Stressing",
			img: require("../../assets/images/stressing-emoji.png"),
		},
		{
			feeling: "Overwhelmed",
			img: require("../../assets/images/overwhelmed-emoji.png"),
		},
		{
			feeling: "Freaking Out",
			img: require("../../assets/images/freakingout-emoji.png"),
		},
	];

	return (
		<>
			<EscapeButton
				onPress={() => {
					setModalVisible(true);
				}}
			>
				<AntDesign name="close" size={20} color="#797979" />
			</EscapeButton>
			<View>
				<Heading>How are you feeling right now?</Heading>
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
								marginBottom: 30,
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
										feeling2 === item.feeling ? "#f9c45e" : "transparent",
								}}
							>
								<MoodTitle>{item.feeling}</MoodTitle>
								<MoodIcon source={item.img} />
							</MoodButton>
						</LinearGradient>
					);
				})}
			</RatingContainer>
			<ContinueButton
				continue={canContinue}
				disabled={canContinue ? false : true}
				style={
					canContinue
						? {
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 4,
								},
								shadowOpacity: 0.15,
								shadowRadius: 4,
								elevation: 5,
						  }
						: null
				}
				onPress={() => {
					navigation.navigate("Entries");
				}}
			>
				<ContinueText continue={canContinue}>Continue</ContinueText>
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
	width: 323px;
	margin-top: 20px;
	align-self: center;
`;

const RatingContainer = styled(View)`
	align-self: center;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-around;
	width: 323px;
	margin-top: 60px;
	padding: 0 26px;
`;

const MoodButton = styled(TouchableOpacity)`
	align-items: center;
	flex-direction: column-reverse;
	justify-content: center;
	width: 120px;
	height: 120px;
	border-radius: 10px;
	margin-bottom: 30px;
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
	width: 97px;
	height: 32px;
	align-items: center;
	align-self: center;
	justify-content: center;
	border-radius: 4px;
	background-color: ${(props) => (props.continue ? "#f9c45e" : "transparent")};
	position: absolute;
	bottom: 60px;
`;

const ContinueText = styled(Text)`
	color: ${(props) => (props.continue ? "#505050" : "#bdbdbd")};
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

export default PostSessionAnxietyRating;
