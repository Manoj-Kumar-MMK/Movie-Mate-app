import React from "react"
import {
	StyleSheet,
	TextInput,
	Text,
	View,
	Button,
	TouchableOpacity,
} from "react-native"
import { Modal, Portal } from "react-native-paper"
const RatingModal = ({ rating, setRating, addRating, modifyRating }) => {
	return (
		<Portal>
			<Modal style={styles.modalContainer} visible={rating.modal}>
				<View style={styles.box}>
					<Text style={styles.text}>Rating</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Enter number"
						keyboardType="number-pad"
						numericvalue
						value={rating.value}
						onChangeText={(value) => {
							if (value > 5 || value < 0) alert("Invalid rating")
							else setRating({ ...rating, value: value })
						}}
					/>
					{rating.mode === "add" ? (
						<TouchableOpacity
							style={[styles.button, styles.buttonG]}
							onPress={() => {
								setRating({ ...rating, modal: false })
								addRating()
							}}
						>
							<Text style={styles.buttonText}>Add</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={[styles.button, styles.buttonG]}
							onPress={() => {
								setRating({ ...rating, modal: false })
								modifyRating()
							}}
						>
							<Text style={styles.buttonText}>Modify</Text>
						</TouchableOpacity>
					)}
					<TouchableOpacity
						style={[styles.button, styles.buttonR]}
						onPress={() => setRating({ ...rating, modal: false })}
					>
						<Text style={styles.buttonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</Portal>
	)
}

export default RatingModal

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		padding: 20,
		backgroundColor: "#a8a8a8",
	},
	text: {
		fontSize: 25,
		fontWeight: "bold",
	},
	buttonText: {
		fontSize: 25,
		color: "white",
	},
	box: {
		height: 300,
		alignItems: "center",
		justifyContent: "space-evenly",
		borderRadius: 20,
		backgroundColor: "white",
	},
	button: {
		minWidth: 150,
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		margin: 10,
	},
	buttonR: {
		backgroundColor: "red",
	},
	buttonG: {
		backgroundColor: "green",
	},
	textInput: {
		minWidth: 150,
		height: 60,
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 2,
		padding: 8,
		color: "black",
	},
})
