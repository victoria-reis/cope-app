import React from "react";
import { View, Text, Button } from "react-native";
import { Card } from "react-native-paper";

// component that displays info about every old session
const SessionCard = () => {
	const data = [
		{
			id: 123,
			textEntry:
				"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente dicta nemo a, nisi tenetur asperiores. Dolorum sequi nesciunt, deserunt eveniet similique quidem culpa. Eius blanditiis possimus architecto eaque provident earum nobis. Tempora nihil et ab ad, aperiam reiciendis expedita impedit, doloribus velit quis voluptas, saepe aliquam fugiat pariatur iusto magni?",
			voiceEntry: {},
			date: "22/06/2022",
			anxietyRating: "😩",
			category: "family",
		},
		{
			id: 321,
			textEntry:
				"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente dicta nemo a, nisi tenetur asperiores. Dolorum sequi nesciunt, deserunt eveniet similique quidem culpa. Eius blanditiis possimus architecto eaque provident earum nobis. Tempora nihil et ab ad, aperiam reiciendis expedita impedit, doloribus velit quis voluptas, saepe aliquam fugiat pariatur iusto magni?",
			voiceEntry: {},
			date: "21/06/2022",
			anxietyRating: "🙂",
			category: "health",
		},
	];

	return (
		<View style={{ margin: 10 }}>
			<Text style={{ fontSize: 20, fontWeight: "bold" }}>{data[0].date}</Text>
			<View
				style={{
					backgroundColor: "lightgrey",
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
					borderRadius: 25,
					borderColor: "black",
					borderWidth: 2,
				}}
				elevation={5}
			>
				<View style={{ alignItems: "center" }}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>Feeling</Text>
					<Text style={{ fontSize: 30 }}>{data[0].anxietyRating}</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>
						Anxious about:
					</Text>
					<Text style={{ fontSize: 25 }}>{data[0].category}</Text>
				</View>
				<Button title=">" style={{ width: 30 }} />
			</View>
		</View>
	);
};

export default SessionCard;
