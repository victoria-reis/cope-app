import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialIcons } from "@expo/vector-icons";

// component that displays info about every old session
const SessionCard = () => {
	const [deleteButton, setDeleteButton] = useState(false);

	const handleToggle = () => {
		if (!deleteButton) {
			setDeleteButton(true);
		} else {
			setDeleteButton(false);
		}
	};

	const data = [
		{
			id: 123,
			textEntry:
				"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente dicta nemo a, nisi tenetur asperiores. Dolorum sequi nesciunt, deserunt eveniet similique quidem culpa. Eius blanditiis possimus architecto eaque provident earum nobis. Tempora nihil et ab ad, aperiam reiciendis expedita impedit, doloribus velit quis voluptas, saepe aliquam fugiat pariatur iusto magni?",
			voiceEntry: {},
			date: "June 22, 2022",
			anxietyRating: "😩",
			category: "family",
		},
		{
			id: 321,
			textEntry:
				"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente dicta nemo a, nisi tenetur asperiores. Dolorum sequi nesciunt, deserunt eveniet similique quidem culpa. Eius blanditiis possimus architecto eaque provident earum nobis. Tempora nihil et ab ad, aperiam reiciendis expedita impedit, doloribus velit quis voluptas, saepe aliquam fugiat pariatur iusto magni?",
			voiceEntry: {},
			date: "June 21, 2022",
			anxietyRating: "🙂",
			category: "health",
		},
	];

	return (
		<Card>
			<Date>{data[0].date}</Date>
			{deleteButton ? (
				<DeleteButton>
					<Text style={{ color: "red", fontSize: 18 }}>Delete</Text>
				</DeleteButton>
			) : null}
			<SelectionContainer>
				<BouncyCheckbox
					size={25}
					fillColor="black"
					unfillColor="#FFFFFF"
					onPress={handleToggle}
				/>
				<EntryInfoContainer>
					<View style={{ alignItems: "center" }}>
						<Text style={{ fontSize: 15, fontWeight: "bold" }}>Feeling</Text>
						<Text style={{ fontSize: 30 }}>{data[0].anxietyRating}</Text>
					</View>
					<View style={{ alignItems: "center" }}>
						<Text style={{ fontSize: 15, fontWeight: "bold" }}>
							Anxious about:
						</Text>
						<Text style={{ fontSize: 20 }}>{data[0].category}</Text>
					</View>
					<TouchableOpacity>
						<Text></Text>
						<MaterialIcons name="arrow-forward-ios" size={24} color="black" />
					</TouchableOpacity>
				</EntryInfoContainer>
			</SelectionContainer>
		</Card>
	);
};

// styles
const Card = styled(View)`
	margin: 15px 0;
`;

const Date = styled(Text)`
	font-size: 18px;
	font-weight: bold;
	margin: 8px 0;
`;

const SelectionContainer = styled(View)`
	flex-direction: row;
`;

const EntryInfoContainer = styled(View)`
	background-color: lightgrey;
	flex-direction: row;
	justify-content: space-around;
	/* align-items: center; */
	border-radius: 20px;
	border: 1.5px solid black;
	padding: 15px;
	width: 85%;
`;

const DeleteButton = styled(TouchableOpacity)`
	position: absolute;
	top: 7px;
	right: 0;
`;

export default SessionCard;
