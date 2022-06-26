import React from "react";
import { useState } from "react";
import { View, Text, Button } from "react-native";

// where user will choose if they want to record voice or type
const TypeOrRecord = () => {
	return (
		<>
			<View>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					We all have different ways to express ourselves.
				</Text>
			</View>
			<View>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					Which one do you rather?
				</Text>
				<Text>You always have the option to do either or...</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
					padding: 20,
				}}
			>
				<View
					style={{
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text style={{ fontSize: 22 }}>Writing it out</Text>
				</View>
				<View
					style={{
						backgroundColor: "lightgrey",
						borderRadius: 15,
						padding: 10,
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text style={{ fontSize: 22 }}>Speaking about it</Text>
				</View>
			</View>
		</>
	);
};

export default TypeOrRecord;
