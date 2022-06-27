// modules
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import {
	MaterialIcons,
	FontAwesome,
	MaterialCommunityIcons,
	Ionicons,
} from "@expo/vector-icons";

// where user will choose what they are anxious about
const AnxietyCategories = ({ category, setCategory, setShowCategories }) => {
	const handlePress = (theme) => {
		setCategory(theme);
		setShowCategories(false);
	};

	return (
		<>
			<View>
				<Heading>What are you anxious about currently?</Heading>
			</View>
			<CategoriesContainer>
				<CategoryButton
					onPress={() => {
						handlePress("work");
					}}
				>
					<CategoryTitle>Work</CategoryTitle>
					<CategoryIcon>
						<MaterialIcons name="work" size={70} color="black" />
					</CategoryIcon>
				</CategoryButton>

				<CategoryButton
					onPress={() => {
						handlePress("health");
					}}
				>
					<CategoryTitle>Health</CategoryTitle>
					<CategoryIcon>
						<FontAwesome name="heartbeat" size={70} color="black" />
					</CategoryIcon>
				</CategoryButton>

				<CategoryButton
					onPress={() => {
						handlePress("sleep");
					}}
				>
					<CategoryTitle>Sleep</CategoryTitle>
					<CategoryIcon>
						<MaterialCommunityIcons
							name="power-sleep"
							size={70}
							color="black"
						/>
					</CategoryIcon>
				</CategoryButton>

				<CategoryButton
					onPress={() => {
						handlePress("family");
					}}
				>
					<CategoryTitle>Family</CategoryTitle>
					<CategoryIcon>
						<MaterialIcons name="family-restroom" size={70} color="black" />
					</CategoryIcon>
				</CategoryButton>

				<CategoryButton
					onPress={() => {
						handlePress("self love");
					}}
				>
					<CategoryTitle>Self Love</CategoryTitle>
					<CategoryIcon>
						<MaterialCommunityIcons
							name="mother-heart"
							size={70}
							color="black"
						/>
					</CategoryIcon>
				</CategoryButton>

				<CategoryButton
					onPress={() => {
						handlePress("love");
					}}
				>
					<CategoryTitle>Love</CategoryTitle>
					<CategoryIcon>
						<FontAwesome name="heart" size={70} color="black" />
					</CategoryIcon>
				</CategoryButton>

				<CategoryButton
					onPress={() => {
						handlePress("finances");
					}}
				>
					<CategoryTitle>Finances</CategoryTitle>
					<CategoryIcon>
						<MaterialIcons name="attach-money" size={70} color="black" />
					</CategoryIcon>
				</CategoryButton>

				<CategoryButton
					onPress={() => {
						handlePress("friends");
					}}
				>
					<CategoryTitle>Friends</CategoryTitle>
					<CategoryIcon>
						<Ionicons name="people-circle" size={70} color="black" />
					</CategoryIcon>
				</CategoryButton>
			</CategoriesContainer>
			{category ? <Button title="Continue" onPress={handlePress} /> : null}
		</>
	);
};

// styles
const Heading = styled(Text)`
	font-size: 30px;
	font-weight: bold;
`;

const CategoriesContainer = styled(View)`
	flex: 1;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-content: center;
`;

const CategoryButton = styled(TouchableOpacity)`
	width: 35%;
	background-color: lightgrey;
	border-radius: 10px;
	padding: 10px;
	align-items: center;
	flex-direction: column-reverse;
	margin-bottom: 10px;
`;

const CategoryTitle = styled(Text)`
	font-size: 18px;
`;

const CategoryIcon = styled(Text)``;

export default AnxietyCategories;
