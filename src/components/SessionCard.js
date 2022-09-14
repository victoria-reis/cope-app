import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SimpleLineIcons } from "@expo/vector-icons";

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wedndesday",
	"Thursday",
	"Friday",
	"Saturday",
];

// component that displays info about every old session
const SessionCard = ({
	navigation,
	feeling,
	categories,
	date,
	voiceEntries,
	onDelete,
}) => {
	const [deleteButton, setDeleteButton] = useState(false);

	const handleToggle = () => {
		if (!deleteButton) {
			setDeleteButton(true);
		} else {
			setDeleteButton(false);
		}
	};

	const creationDate = new Date(date);
	const currentDate = new Date();

	return (
		<EntryContainer>
			<DateContainer>
				<DateStyled>{`${creationDate.getDate()} ${
					months[creationDate.getMonth()]
				}`}</DateStyled>
				{creationDate.getDate() === currentDate.getDate() ? (
					<CurrentDate>Today</CurrentDate>
				) : creationDate.getUTCDate() === currentDate.getUTCDate() - 1 &&
				  creationDate.getMonth() === currentDate.getMonth() &&
				  creationDate.getUTCFullYear() === currentDate.getUTCFullYear() ? (
					<CurrentDate>Yesterday</CurrentDate>
				) : null}
				<WeekDay>{days[creationDate.getDay()]}</WeekDay>
				{deleteButton ? (
					<DeleteButton onPress={onDelete}>
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
					{feeling === "Doing Good" ? (
						<Icon
							source={require("../../assets/images/mini-doing-good-emoji.png")}
						/>
					) : feeling === "Okay, I Guess" ? (
						<Icon source={require("../../assets/images/mini-okay-emoji.png")} />
					) : feeling === "Kinda Stressing" ? (
						<Icon
							source={require("../../assets/images/mini-stressing-emoji.png")}
						/>
					) : feeling === "Overwhelmed" ? (
						<Icon
							source={require("../../assets/images/mini-overwhelmed-emoji.png")}
						/>
					) : feeling === "Freaking Out" ? (
						<Icon
							source={require("../../assets/images/mini-freaking-out-emoji.png")}
						/>
					) : feeling === "Little Tense" ? (
						<Icon
							source={require("../../assets/images/mini-little-tense-emoji.png")}
						/>
					) : null}
					<AnxietyRatingText>{feeling}</AnxietyRatingText>
				</AnxietyRatingContainer>
				<StressorsContainer>
					{categories.map((stressor, index) => {
						return (
							<StressorsTag
								key={`tag-${index}`}
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
				<OpenEntryButton
					onPress={() => {
						const longMonths = [
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December",
						];
						navigation.navigate("Session Details", {
							date: `${
								longMonths[creationDate.getMonth()]
							} ${creationDate.getDate()}, ${creationDate.getFullYear()}`,
							feeling: feeling,
							categories: categories,
							voiceEntries: voiceEntries,
						});
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
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 25px;
`;

const CurrentDate = styled(Text)`
	font-size: 16px;
	font-family: OpenSans_600SemiBold;
	color: #505050;
	position: absolute;
	left: 50px;
	margin-top: -2px;
`;

const Card = styled(View)`
	width: 315px;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 10px;
	border-radius: 10px;
	margin-left: -10px;
	background-color: #f2f2f2;
	border: ${(props) => (props.isSelected ? "1px solid #D587B1" : "none")};
`;

const DateContainer = styled(View)`
	flex-direction: row;
	margin-bottom: 12px;
	width: 96%;
	margin-left: auto;
`;

const DateStyled = styled(Text)`
	font-size: 12px;
	font-family: OpenSans_400Regular;
	color: #505050;
	width: 32px;
	height: 55px;
	border: 1.5px solid #7ca3ca;
	border-radius: 10px;
	text-align: center;
	padding: 10px 2px 0;
	margin-left: 10px;
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
	color: #505050;
`;

const StressorsContainer = styled(View)`
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
`;

const DeleteButton = styled(TouchableOpacity)`
	height: 20px;
	justify-items: center;
	margin-bottom: 8px;
	margin-left: auto;
	margin-right: 5px;
	align-self: flex-end;
`;

const DeleteText = styled(Text)`
	font-family: OpenSans_700Bold;
	font-size: 13px;
	color: #505050;
`;

const OpenEntryButton = styled(TouchableOpacity)`
	align-self: center;
	right: 8px;
	position: absolute;
`;

const Icon = styled(Image)`
	width: 25px;
	height: 25px;
`;

export default SessionCard;
