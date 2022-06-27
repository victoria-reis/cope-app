import React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

// where user will record voice
const VoiceRecording = () => {
	return (
		<>
			<View>
				<Heading>Tell me more. What is on your mind?</Heading>
			</View>
		</>
	);
};

// styles
const Heading = styled(Text)`
	font-size: 30px;
	font-weight: bold;
`;

export default VoiceRecording;
