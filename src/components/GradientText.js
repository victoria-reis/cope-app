import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const GradientText = (props) => {
	return (
		<MaskedView maskElement={<Text {...props} />}>
			<LinearGradient
				colors={["#9F91CE", "#7CA3CA"]}
				start={{ x: 1, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<Text {...props} style={[props.style, { opacity: 0 }]} />
			</LinearGradient>
		</MaskedView>
	);
};

export default GradientText;
