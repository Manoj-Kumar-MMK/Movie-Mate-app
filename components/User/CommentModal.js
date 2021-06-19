import React from "react"
import {
	StyleSheet,
	TextInput,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { Modal, Portal } from "react-native-paper"
const CommentModal = ({ comment, setComment, addComment, modifyComment }) => {
	return (
		<Portal>
			<Modal style={styles.modalContainer} visible={comment.modal}>
				<View style={styles.box}>
					<Text style={styles.text}>Comment</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Enter comment"
						value={comment.value}
						onChangeText={(value) => setComment({ ...comment, value: value })}
					/>
					{comment.mode === "add" ? (
						<TouchableOpacity
							style={[styles.button, styles.buttonG]}
							onPress={() => {
								setComment({ ...comment, modal: false })
								addComment()
							}}
						>
							<Text style={styles.buttonText}>Add</Text>
						</TouchableOpacity>
					) : (
						<>
							<TouchableOpacity
								style={[styles.button, styles.buttonG]}
								onPress={() => {
									setComment({ ...comment, modal: false })
									modifyComment()
								}}
							>
								<Text style={styles.buttonText}>Modify</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.buttonG]}
								onPress={() => setComment({ ...comment, modal: false })}
							>
								<Text style={styles.buttonText}>Close</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
			</Modal>
		</Portal>
	)
}

export default CommentModal

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
