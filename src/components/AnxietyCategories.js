// modules
import React from "react";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

// where user will choose what they are anxious about
const AnxietyCategories = ({
	setStressors,
	setShowStressors,
	stressors,
	setShowVoiceRecording,
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
		{ stressor: "Work", img: require("../../assets/work.png") },
		{ stressor: "Finances", img: require("../../assets/finance.png") },
		{ stressor: "Health", img: require("../../assets/health.png") },
		{
			stressor: "Relationships",
			img: require("../../assets/relationship.png"),
		},
		{ stressor: "Love", img: require("../../assets/love.png") },
		{ stressor: "Self-Esteem", img: require("../../assets/selfesteem.png") },
	];

	return (
		<>
			<SkipButton
				onPress={() => {
					setShowStressors(false);
				}}
			>
				<SkipText>Skip</SkipText>
			</SkipButton>
			<View>
				<Heading>What are you anxious about currently?</Heading>
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
			<ContinueButtonContainer>
				<ContinueButton
					continue={canContinue}
					disabled={canContinue ? false : true}
					style={
						canContinue
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
					onPress={() => {
						setShowStressors(false);
						setShowVoiceRecording(true);
					}}
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
	margin-top: 40px;
`;

const StressorsContainer = styled(View)`
	flex: 0.75;
	align-self: center;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-content: space-around;
	width: 90%;
	margin-top: 50px;
`;

const StressorButton = styled(TouchableOpacity)`
	align-items: center;
	flex-direction: column-reverse;
	justify-content: center;
	width: 120px;
	height: 120px;
	border-radius: 10px;
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

export default AnxietyCategories;
