// modules
import React from "react";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

// screens
import HomeScreen from "./src/screens/HomeScreen";
import SessionsMenuScreen from "./src/screens/SessionsMenuScreen";
import NewSessionScreen from "./src/screens/NewSessionScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

// app navigation
// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
// 	return (
// 		<NavigationContainer>
// 			<Stack.Navigator initialRouteName="Home">
// 				<Stack.Screen name="Home" component={HomeScreen} />
// 				<Stack.Screen name="Sessions" component={SessionsMenuScreen} />
// 				<Stack.Screen name="New Session" component={NewSessionScreen} />
// 			</Stack.Navigator>
// 		</NavigationContainer>
// 	);
// };

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={{ headerShown: false }}
			>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarButton: (props) => null,
					}}
				/>
				<Tab.Screen
					name="Entries"
					component={SessionsMenuScreen}
					options={{
						tabBarIcon: () => <AntDesign name="profile" size={25} />,
					}}
				/>
				<Tab.Screen
					name="New Session"
					component={NewSessionScreen}
					options={{
						tabBarStyle: { display: "none" },
						tabBarIcon: () => <AntDesign name="pluscircleo" size={25} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const App = () => {
	// state for loading page timer (app name and welcome message)
	const [logoTimer, setLogoTimer] = useState(true);
	// as soon as the app runs, loading screen appears for 6s with app name and message
	useEffect(() => {
		setTimeout(() => {
			setLogoTimer(false);
		}, 6000);
	}, []);

	return (
		<>
			{logoTimer ? <LoadingScreen /> : <AppNavigator />}
			<StatusBar style="auto" />
		</>
	);
};

export default App;
