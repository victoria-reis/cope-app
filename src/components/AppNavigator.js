import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import {
	useFonts,
	PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";

import HomeScreen from "../screens/HomeScreen";
import SessionsMenuScreen from "../screens/SessionsMenuScreen";
import NewSessionScreen from "../screens/NewSessionScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Onboarding"
				screenOptions={{ headerShown: false }}
			>
				<Tab.Screen
					name="Onboarding"
					component={OnboardingScreen}
					options={{
						tabBarStyle: { display: "none" },
						tabBarButton: (props) => null,
					}}
				/>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarIcon: () => <AntDesign name="home" size={25} />,
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

export default AppNavigator;
