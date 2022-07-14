import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
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
			date: "22 Jun",
			weekday: "Friday",
			anxietyRating1: "Little Tense",
			anxietyRating2: "Ok, I Guess",
			stressors: [
				"Work",
				"Love",
				"Health",
				"Finance",
				"Relatioships",
				"Self-Esteem",
			],
			voiceEntry: {},
		},
	];

	return (
		<EntryContainer>
			{/* <Date>{data[0].date}</Date>
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
			</SelectionContainer> */}
			<DateContainer>
				<Date>{data[0].date.toUpperCase()}</Date>
				<WeekDay>{data[0].weekday}</WeekDay>
			</DateContainer>
			<Card
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
			>
				<AnxietyRatingContainer>
					<Image
						source={require("../../assets/images/purple-good-emoji.png")}
					/>
					<AnxietyRatingText>{data[0].anxietyRating1}</AnxietyRatingText>
				</AnxietyRatingContainer>
				<StressorsContainer>
					{data[0].stressors.map((singleStressor) => {
						return (
							<StressorsTag
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
							>
								{singleStressor}
							</StressorsTag>
						);
					})}
				</StressorsContainer>
			</Card>
		</EntryContainer>
	);
};

// styles
const EntryContainer = styled(View)`
	width: 90%;
	align-self: center;
`;

const Card = styled(View)`
	/* margin: 15px 0; */
	/* border: 1px solid gray; */
	padding: 10px;
	border-radius: 10px;
	margin: 10px 0;
	background-color: #f2f2f2;
`;

const DateContainer = styled(View)`
	/* border: 1px solid yellow; */
	flex-direction: row;
`;

const Date = styled(Text)`
	font-size: 12px;
	font-family: OpenSans_400Regular;
	color: #505050;
	width: 35px;
	height: 55px;
	border: 1.5px solid #7ca3ca;
	border-radius: 10px;
	text-align: center;
	padding-top: 10px;
`;

const WeekDay = styled(Text)`
	font-size: 13px;
	font-family: OpenSans_400Regular;
	color: #505050;
	align-self: flex-end;
	margin: 0 0 10px 8px;
`;

const AnxietyRatingContainer = styled(View)`
	flex-direction: row;
	margin-left: 5px;
`;

const AnxietyRatingText = styled(Text)`
	font-size: 14px;
	font-family: OpenSans_600SemiBold;
	margin-left: 10px;
	align-self: center;
`;

const StressorsContainer = styled(View)`
	/* border: 1px solid purple; */
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 5px;
`;

const StressorsTag = styled(Text)`
	background-color: #9f91ce;
	font-size: 12px;
	font-family: OpenSans_400Regular;
	color: white;
	padding: 2px 15px;
	margin: 5px;
	border-radius: 10px;
`;
// const SelectionContainer = styled(View)`
// 	flex-direction: row;
// `;

// const EntryInfoContainer = styled(View)`
// 	background-color: lightgrey;
// 	flex-direction: row;
// 	justify-content: space-around;
// 	/* align-items: center; */
// 	border-radius: 20px;
// 	border: 1.5px solid black;
// 	padding: 15px;
// 	width: 85%;
// `;

// const DeleteButton = styled(TouchableOpacity)`
// 	position: absolute;
// 	top: 7px;
// 	right: 0;
// `;

export default SessionCard;
