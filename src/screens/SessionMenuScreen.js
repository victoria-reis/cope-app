// modules
import React from "react";
import { SafeAreaView, View, Text, FlatList } from "react-native";

// components
import SessionCard from "../components/SessionCard";

// previous sessions screen, where user will be able to see list of old sessions
const SessionsMenuScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text style={{ fontSize: 30, fontWeight: "bold" }}>
				Previous Sessions
			</Text>
			<FlatList
				data={[{ name: 1 }, { name: 2 }]}
				renderItem={() => <SessionCard />}
				keyExtractor={(item) => item.name}
				// contentContainerStyle={{ padding: 10 }}
			/>
		</SafeAreaView>
	);
};

export default SessionsMenuScreen;
