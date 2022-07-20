// modules
import React from "react";
import { TouchableOpacity, Text, Modal, View } from "react-native";
import styled from "styled-components";

const EscapeSessionModal = ({ modalVisible, setModalVisible, navigation }) => {
	const handleYes = () => {
		if (modalVisible) {
			navigation.navigate("Entries");
			setModalVisible(false);
		}
	};

	const handleNo = () => {
		if (modalVisible) {
			setModalVisible(false);
		}
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(false);
			}}
			statusBarTranslucent={true}
		>
			<ModalContainer>
				<ModalBox>
					<ModalHeading>Leaving early?</ModalHeading>
					<ModalText>Your session up until this point will be saved.</ModalText>
					<ButtonsContainer>
						<Button onPress={handleNo}>
							<ButtonText>No</ButtonText>
						</Button>
						<Button onPress={handleYes} style={{ backgroundColor: "#f9c45e" }}>
							<ButtonText>Yes</ButtonText>
						</Button>
					</ButtonsContainer>
				</ModalBox>
			</ModalContainer>
		</Modal>
	);
};

const ModalContainer = styled(View)`
	flex: 1;
	justify-content: center;
	align-items: center;
	margin: 0;
	background-color: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled(View)`
	background-color: #f2f2f2;
	width: 250px;
	height: 200px;
	border-radius: 10px;
	padding: 15px;
`;

const ButtonsContainer = styled(View)`
	width: 98%;
	align-self: center;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 12px;
`;

const Button = styled(TouchableOpacity)`
	width: 100px;
	height: 44px;
	border-radius: 4px;
	border: 1px solid #f9c45e;
	justify-content: center;
`;

const ButtonText = styled(Text)`
	color: #505050;
	font-family: OpenSans_600SemiBold;
	font-size: 16px;
	text-align: center;
`;

const ModalHeading = styled(Text)`
	color: #505050;
	font-family: OpenSans_600SemiBold;
	font-size: 16px;
	width: 171px;
	height: 24px;
	margin-left: 8px;
	margin-top: 15px;
`;

const ModalText = styled(Text)`
	color: #505050;
	font-family: OpenSans_400Regular;
	font-size: 12px;
	width: 177px;
	height: 48px;
	margin: 4px 0 0 8px;
`;

export default EscapeSessionModal;
