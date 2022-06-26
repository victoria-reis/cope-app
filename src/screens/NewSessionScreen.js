// modules
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// components
import AnxietyRating from "../components/AnxietyRating";
import AnxietyCategories from "../components/AnxietyCategories";
import TypeOrRecord from "../components/TypeOrRecord";

// new session screen
const NewSessionScreen = () => {
	const [showRating, setShowRating] = useState(true);
	const [feeling, setFeeling] = useState("");
	const [showCategories, setShowCategories] = useState(false);
	const [category, setCategory] = useState("");

	return (
		<SafeAreaView style={{ flex: 1, alignItems: "center" }}>
			{showRating ? (
				//where user will rate their anxiety
				<AnxietyRating
					feeling={feeling}
					setFeeling={setFeeling}
					setShowRating={setShowRating}
					setShowCategories={setShowCategories}
				/>
			) : showCategories ? (
				// where user will choose what they are anxious about
				<AnxietyCategories
					category={category}
					setCategory={setCategory}
					setShowCategories={setShowCategories}
				/>
			) : !showRating && !showCategories ? (
				// where user will choose if they want to record voice or type
				<TypeOrRecord />
			) : null}
		</SafeAreaView>
	);
};

export default NewSessionScreen;
