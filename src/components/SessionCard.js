import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SimpleLineIcons } from "@expo/vector-icons";

// component that displays info about every old session
const SessionCard = ({ navigation, modalVisible, setModalVisible }) => {
	const [deleteButton, setDeleteButton] = useState(false);

	const handleToggle = () => {
		if (!deleteButton) {
			setDeleteButton(true);
		} else {
			setDeleteButton(false);
		}
	};

	const handleDelete = () => {
		setModalVisible(true);
	};

	const data = [
		{
			id: 123,
			date: "22 Jun",
			weekday: "Friday",
			anxietyRating1: "Little Tense",
			anxietyRating2: "Ok, I Guess",
			stressors: [
				"Self-Esteem",
				"Work",
				"Love",
				"Health",
				"Relatioships",
				"Finance",
			],
			voiceEntry: {},
		},
	];

	console.log(modalVisible);

	return (
		<EntryContainer key={data[0].id}>
			<DateContainer>
				<Date>{data[0].date.toUpperCase()}</Date>
				<WeekDay>{data[0].weekday}</WeekDay>
				{deleteButton ? (
					<DeleteButton onPress={handleDelete}>
						<DeleteText>Delete</DeleteText>
					</DeleteButton>
				) : null}
			</DateContainer>
			<BouncyCheckbox
				size={18}
				fillColor="#F9C45E"
				unfillColor="#f2f2f2"
				style={{ marginBottom: "2%" }}
				onPress={handleToggle}
			/>
			<Card
				style={{
					shadowColor: "#BEBBBC",
					shadowOffset: {
						width: 12,
						height: 12,
					},
					shadowOpacity: 1,
					shadowRadius: 24,
					elevation: 5,
				}}
				isSelected={deleteButton}
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
										height: 4,
									},
									shadowOpacity: 0.15,
									shadowRadius: 4,

									elevation: 5,
								}}
							>
								{singleStressor}
							</StressorsTag>
						);
					})}
				</StressorsContainer>
				<OpenEntryButton
					onPress={() => {
						navigation.navigate("Session Details");
					}}
				>
					<SimpleLineIcons name="arrow-right" size={17} color="#F9C45E" />
				</OpenEntryButton>
			</Card>
		</EntryContainer>
	);
};

// styles
const EntryContainer = styled(View)`
	width: 98%;
	justify-content: center;
	/* align-self: center; */
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 25px;
	/* border: 1px solid gray; */
`;

const Card = styled(View)`
	width: 292px;
	flex-direction: row;
	flex-wrap: wrap;
	/* width: 292px; */
	padding: 10px;
	border-radius: 10px;
	margin-left: -10px;
	background-color: #f2f2f2;
	border: ${(props) => (props.isSelected ? "1px solid #D587B1" : "none")};
`;

const DateContainer = styled(View)`
	/* border: 1px solid yellow; */
	flex-direction: row;
	margin-bottom: 12px;
	width: 96%;
	margin-left: auto;
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
	margin-left: 18px;
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
	/* border: 1px solid red; */
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

const DeleteButton = styled(TouchableOpacity)`
	/* position: absolute;
	top: 7px;
	right: 0; */
	/* border: 1px solid gray; */
	height: 45px;
	height: 20px;
	justify-items: center;
	margin-bottom: 8px;
	margin-left: auto;
	/* justify-content: flex-end; */
	align-self: flex-end;
`;

const DeleteText = styled(Text)`
	font-family: OpenSans_700Bold;
	font-size: 13px;
	color: #505050;
`;

const OpenEntryButton = styled(TouchableOpacity)`
	/* border: 1px solid blue; */
	/* margin-top: 5px; */
	align-self: center;
	right: 8px;
	position: absolute;
	/* align-self: flex-end; */
`;

export default SessionCard;
