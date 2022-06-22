import React from "react";
import { View, Text, Button } from "react-native";

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
		<View style={{ backgroundColor: "red" }}>
			<Text>{data[0].date}</Text>
			<View>
				<Text>{data[0].anxietyRating}</Text>
				<Text>{data[0].category}</Text>
			</View>
			<Button title=">" />
		</View>
	);
};

export default SessionCard;
