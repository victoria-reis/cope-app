import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import HomeScreen from "../screens/HomeScreen";
import ComingSoonScreen from "../screens/ComingSoonScreen";
import NewSessionScreen from "../screens/NewSessionScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SessionDetailsScreen from "../screens/SessionDetailsScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
	const PlusTabButton = ({ children, onPress }) => {
		return (
			<TouchableOpacity
				onPress={onPress}
				style={{
					top: -40,
					justifyContent: "center",
					alignItems: "center",
					// position: "absolute",
				}}
			>
				<View
					style={{
						width: 50,
						height: 50,
						borderRadius: 25,
						backgroundColor: "#F9C45E",
					}}
				>
					{children}
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Onboarding"
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						height: 79,
						marginTop: -25,
						// backgroundColor: "transparent",
						// padding: -10,
						// borderTopWidth: 0,
					},
					tabBarShowLabel: false,
					tabBarBackground: () => (
						<LinearGradient
							colors={["#9F91CE", "#7CA3CA"]}
							start={{ x: 0, y: 0.2 }}
						>
							<View
								style={{
									backgroundColor: "transparent",
									width: "100%",
									height: "100%",
								}}
							></View>
						</LinearGradient>
						// <Image
						// 	source={require("../../assets/images/Subtract.png")}
						// 	style={{ width: "100%" }}
						// />
					),
				}}
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
					name="Entries"
					component={HomeScreen}
					options={{
						tabBarIcon: () => <AntDesign name="home" size={25} />,
					}}
				/>
				<Tab.Screen name="Meditation" component={ComingSoonScreen} />
				{/* <Tab.Screen
					name="Entries"
					component={SessionsMenuScreen}
					options={{
						tabBarIcon: () => <AntDesign name="profile" size={25} />,
					}}
				/> */}
				<Tab.Screen
					name="New Session"
					component={NewSessionScreen}
					options={{
						tabBarStyle: { display: "none" },
						tabBarIcon: ({ focused }) => {
							return <AntDesign name="plus" size={25} color="#505050" />;
						},
						tabBarButton: (props) => {
							return <PlusTabButton {...props} />;
						},
					}}
				/>
				<Tab.Screen
					name="Insights"
					component={ComingSoonScreen}
					// options={{
					// 	tabBarStyle: { display: "none" },
					// }}
				/>
				<Tab.Screen
					name="Settings"
					component={ComingSoonScreen}
					// options={{
					// 	tabBarStyle: { display: "none" },
					// }}
				/>
				<Tab.Screen
					name="Session Details"
					component={SessionDetailsScreen}
					options={{
						tabBarStyle: { display: "none" },
						tabBarButton: (props) => null,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
