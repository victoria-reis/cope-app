// modules
import React from "react";
import { TouchableOpacity, Text, Modal, View } from "react-native";
import styled from "styled-components";

const CloseModal = ({
	modalVisible,
	setModalVisible,
	navigation,
	setShowRating,
}) => {
	const handleYes = () => {
		navigation.navigate("Entries");
		setShowRating(true);
		setModalVisible(false);
	};

	const handleNo = () => {
		setModalVisible(false);
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(false);
			}}
		>
			<ModalContainer>
				<ModalBox
					style={{
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 4,

						elevation: 5,
					}}
				>
					<ModalText>Are you sure you want to leave your session?</ModalText>
					<ButtonsContainer>
						<Button onPress={handleNo}>
							<ModalText>No</ModalText>
						</Button>
						<Button onPress={handleYes}>
							<ModalText>Yes</ModalText>
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
`;

const ModalBox = styled(View)`
	background-color: #bdbdbd;
	width: 65%;
	padding: 40px 30px 20px;
	border-radius: 10px;
`;

const ButtonsContainer = styled(View)`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	margin: 20px 0;
`;

const Button = styled(TouchableOpacity)`
	background-color: #d9d9d9;
	width: 45%;
	align-items: center;
	padding: 10px;
	border-radius: 5px;
	margin-top: 10px;
`;

const ModalText = styled(Text)`
	font-size: 18px;
	font-weight: bold;
	text-align: center;
`;

export default CloseModal;
