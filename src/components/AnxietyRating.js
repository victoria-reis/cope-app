import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import styled from "styled-components";

// where user will rate their anxiety
const AnxietyRating = ({
	feeling,
	setFeeling,
	setShowRating,
	setShowCategories,
}) => {
	const handlePress = (feeling) => {
		setFeeling(feeling);
		setShowRating(false);
		setShowCategories(true);
	};

	return (
		<>
			<View>
				<Heading>How anxious are you feeling now?</Heading>
			</View>
			<RatingContainer>
				<MoodButton
					onPress={() => {
						handlePress("good");
					}}
				>
					<MoodTitle>Good</MoodTitle>
					<MoodIcon>🙂</MoodIcon>
				</MoodButton>
				<MoodButton
					onPress={() => {
						handlePress("anxious");
					}}
				>
					<MoodTitle>Anxious</MoodTitle>
					<MoodIcon>😐</MoodIcon>
				</MoodButton>
				<MoodButton
					onPress={() => {
						handlePress("very anxious");
					}}
				>
					<MoodTitle>Very Anxious</MoodTitle>
					<MoodIcon>☹️</MoodIcon>
				</MoodButton>
			</RatingContainer>
			{/* {feeling ? <Button title="Continue" onPress={handlePress} /> : null} */}
		</>
	);
};

// styles
const Heading = styled(Text)`
	font-size: 30px;
	font-weight: bold;
`;

const RatingContainer = styled(View)`
	flex: 1;
	flex-direction: row;
	align-items: center;
`;

const MoodButton = styled(TouchableOpacity)`
	align-items: center;
	width: 33%;
`;

const MoodTitle = styled(Text)`
	font-size: 15px;
	font-weight: bold;
`;

const MoodIcon = styled(Text)`
	font-size: 80px;
`;

export default AnxietyRating;
