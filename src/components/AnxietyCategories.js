// modules
import React from "react";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

// where user will choose what they are anxious about
const AnxietyCategories = ({
	setStressors,
	setShowStressors,
	stressors,
	setShowVoiceRecording,
	navigation,
}) => {
	const [canContinue, setCanContinue] = useState(false);
	useEffect(() => {
		isSelected();
		if (stressors.length > 0) {
			setCanContinue(true);
		} else {
			setCanContinue(false);
		}
	}, [stressors]);

	const handleStressorSelection = (currentStressors) => {
		if (stressors.includes(currentStressors)) {
			const index = stressors.indexOf(currentStressors);
			setStressors([
				...stressors.slice(0, index),
				...stressors.slice(index + 1),
			]);
			// console.log(stressors);
		} else {
			setStressors((prevArray) => [...stressors, currentStressors]);
			// console.log(stressors);
		}
	};

	const isSelected = (currentStressor) => {
		if (stressors.includes(currentStressor)) {
			return "#f9c45e";
		} else {
			return "transparent";
		}
	};

	const stressorsData = [
		{ stressor: "Work", img: require("../../assets/images/work.png") },
		{ stressor: "Finances", img: require("../../assets/images/finance.png") },
		{ stressor: "Health", img: require("../../assets/images/health.png") },
		{
			stressor: "Relationships",
			img: require("../../assets/images/relationship.png"),
		},
		{ stressor: "Love", img: require("../../assets/images/love.png") },
		{
			stressor: "Self-Esteem",
			img: require("../../assets/images/selfesteem.png"),
		},
	];

	return (
		<>
			<EscapeButton
				onPress={() => {
					navigation.navigate("Entries");
				}}
			>
				<AntDesign name="close" size={20} color="#797979" />
			</EscapeButton>
			<View>
				<Heading>What are your current stressors?</Heading>
			</View>
			<StressorsContainer>
				{stressorsData.map((item, index) => {
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
							<StressorButton
								onPress={() => {
									handleStressorSelection(item.stressor);
								}}
								style={{
									borderWidth: 2,
									borderColor: isSelected(item.stressor),
								}}
							>
								<StressorTitle>{item.stressor}</StressorTitle>
								<StressorIcon source={item.img} />
							</StressorButton>
						</LinearGradient>
					);
				})}
			</StressorsContainer>
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
					setShowStressors(false);
					setShowVoiceRecording(true);
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

const StressorsContainer = styled(View)`
	align-self: center;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-around;
	width: 323px;
	margin-top: 60px;
	padding: 0 26px;
`;

const StressorButton = styled(TouchableOpacity)`
	align-items: center;
	flex-direction: column-reverse;
	justify-content: center;
	width: 120px;
	height: 120px;
	border-radius: 10px;
	margin-bottom: 30px;
`;

const StressorTitle = styled(Text)`
	font-size: 14px;
	font-family: OpenSans_600SemiBold;
	color: white;
`;

const StressorIcon = styled(Image)`
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

export default AnxietyCategories;
