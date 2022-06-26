import React from "react";
import { View, Text, Button } from "react-native";

// where user will rate their anxiety
const AnxietyRating = ({
	feeling,
	setFeeling,
	setShowRating,
	setShowCategories,
}) => {
	const handlePress = () => {
		console.log("feeling has been selected");
		setShowRating(false);
		setShowCategories(true);
	};

	return (
		<>
			<View>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					How anxious are you feeling now?
				</Text>
			</View>
			<View
				style={{
					width: "100%",
					padding: 20,
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}
			>
				<View style={{ alignItems: "center", width: "33%" }}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}>Good</Text>
					<Text
						style={{ fontSize: 60 }}
						onPress={() => {
							console.log("good");
							setFeeling("good");
						}}
					>
						🙂
					</Text>
				</View>
				<View style={{ alignItems: "center", width: "33%" }}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}>Anxious</Text>
					<Text
						style={{ fontSize: 60 }}
						onPress={() => {
							console.log("anxious");
							setFeeling("anxious");
						}}
					>
						😐
					</Text>
				</View>
				<View style={{ alignItems: "center", width: "33%" }}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}>Very Anxious</Text>
					<Text
						style={{ fontSize: 60 }}
						onPress={() => {
							console.log("very anxious");
							setFeeling("very anxious");
						}}
					>
						😩
					</Text>
				</View>
			</View>
			{feeling ? <Button title="Continue" onPress={handlePress} /> : null}
		</>
	);
};

export default AnxietyRating;
