// modules
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SessionsMenuScreen from "./src/screens/PrevSessionsScreen";
import NewSessionScreen from "./src/screens/NewSessionScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Welcome">
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen name="Sessions" component={SessionsMenuScreen} />
				<Stack.Screen name="New Session" component={NewSessionScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const App = () => {
	return (
		<>
			<AppNavigator />
			<StatusBar style="auto" />
		</>
	);
};

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });

export default App;
