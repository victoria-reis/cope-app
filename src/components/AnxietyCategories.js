import React from "react";
import { View, Text, Button } from "react-native";

// where user will choose what they are anxious about
const AnxietyCategories = ({ category, setCategory, setShowCategories }) => {
	const handlePress = () => {
		console.log("category has been selected");
		setShowCategories(false);
	};
	return (
		<>
			<View>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					What are you anxious about currently?
				</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					justifyContent: "space-evenly",
					marginTop: 12,
				}}
			>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							console.log("finances");
							setCategory("finances");
						}}
					>
						Finances
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("education");
						}}
					>
						Education
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("myself");
						}}
					>
						Myself
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("home");
						}}
					>
						Home
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("sleep");
						}}
					>
						Sleep
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("hobbies");
						}}
					>
						Hobbies
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("health");
						}}
					>
						Health
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("family");
						}}
					>
						Family
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("relationship");
						}}
					>
						Relationship
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("friends");
						}}
					>
						Friends
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("exercising");
						}}
					>
						Exercising
					</Text>
				</View>
				<View
					style={{
						width: "40%",
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text
						style={{ fontSize: 22 }}
						onPress={() => {
							setCategory("work");
						}}
					>
						Work
					</Text>
				</View>
			</View>
			{category ? <Button title="Continue" onPress={handlePress} /> : null}
		</>
	);
};

export default AnxietyCategories;
