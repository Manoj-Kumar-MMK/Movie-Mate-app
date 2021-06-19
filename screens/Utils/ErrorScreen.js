import React, { useState } from "react"
import { StyleSheet, Text } from "react-native"
import { Button, Modal, Portal } from "react-native-paper"

const ErrorScreen = ({ error }) => {
	const [show, setShow] = useState(true)
	return (
		<Portal>
			<Modal visible={show} style={styles.container} dismissable={true}>
				<Text style={styles.error}>Error</Text>
				<Text style={styles.text}>{error}</Text>
				<Text style={styles.text}>Please restart the app</Text>
				<Button
					icon="close"
					onPress={() => setShow(false)}
					size={30}
					mode="contained"
					contentStyle={styles.button}
					labelStyle={styles.buttonLabel}
				>
					Close
				</Button>
			</Modal>
		</Portal>
	)
}

export default ErrorScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: "bold",
		color: "black",
		marginBottom: 80,
	},
	error: {
		textAlign: "center",
		fontSize: 50,
		fontWeight: "bold",
		color: "black",
		marginBottom: 80,
	},
	button: {
		backgroundColor: "red",
	},
	buttonLabel: {
		fontSize: 30,
	},
})
