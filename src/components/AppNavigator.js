import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";

import HomeScreen from "../screens/HomeScreen";
import ComingSoonScreen from "../screens/ComingSoonScreen";
import NewSessionScreen from "../screens/NewSessionScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SessionDetailsScreen from "../screens/SessionDetailsScreen";
import { TouchableWithoutFeedback } from "react-native-web";

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
						elevation: 0,
						borderTopWidth: 0,
						paddingLeft: 12,
						paddingRight: 12,
						position: "absolute",
						left: 0,
						bottom: 0,
						// backgroundColor: "transparent",
						// padding: -10,
						// borderTopWidth: 0,
					},
					tabBarShowLabel: false,
					tabBarBackground: () => (
						<Image
							source={require("../../assets/images/nav-background.png")}
							style={{ width: "100%", height: "100%" }}
						/>
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
						tabBarIcon: ({ focused }) => {
							return (
								<TabIconContainer>
									{focused ? (
										<TabIcon
											source={require("../../assets/images/active-entries.png")}
										/>
									) : (
										<TabIcon
											source={require("../../assets/images/inactive-entries.png")}
										/>
									)}
									<TabTitle style={{ color: focused ? "white" : "#d9d9d9" }}>
										Entries
									</TabTitle>
								</TabIconContainer>
							);
						},
					}}
				/>
				<Tab.Screen
					name="Meditation"
					component={ComingSoonScreen}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TabIconContainer>
									{focused ? (
										<TabIcon
											source={require("../../assets/images/active-meditation.png")}
										/>
									) : (
										<TabIcon
											source={require("../../assets/images/inactive-meditation.png")}
										/>
									)}
									<TabTitle style={{ color: focused ? "white" : "#d9d9d9" }}>
										Meditation
									</TabTitle>
								</TabIconContainer>
							);
						},
					}}
				/>
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
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TabIconContainer>
									{focused ? (
										<TabIcon
											source={require("../../assets/images/active-insights.png")}
										/>
									) : (
										<TabIcon
											source={require("../../assets/images/inactive-insights.png")}
										/>
									)}
									<TabTitle style={{ color: focused ? "white" : "#d9d9d9" }}>
										Insights
									</TabTitle>
								</TabIconContainer>
							);
						},
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={ComingSoonScreen}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TabIconContainer>
									{focused ? (
										<TabIcon
											source={require("../../assets/images/active-settings.png")}
										/>
									) : (
										<TabIcon
											source={require("../../assets/images/inactive-settings.png")}
										/>
									)}
									<TabTitle style={{ color: focused ? "white" : "#d9d9d9" }}>
										Settings
									</TabTitle>
								</TabIconContainer>
							);
						},
					}}
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

const TabIconContainer = styled(View)`
	/* border: 1px solid yellow; */
	align-items: center;
`;

const TabIcon = styled(Image)`
	width: 24px;
	height: 24px;
	/* border: 1px solid red; */
`;

const TabTitle = styled(Text)`
	font-family: OpenSans_600SemiBold;
	font-size: 12px;
	margin-top: 5px;
`;

export default AppNavigator;
