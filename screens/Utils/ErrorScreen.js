import React from "react"
import { StyleSheet, Text } from "react-native"
import { Modal, Portal } from "react-native-paper"

const ErrorScreen = ({ error }) => {
	return (
		<Portal>
			<Modal visible="true" style={styles.container}>
				<Text style={styles.error}>Error</Text>
				<Text style={styles.text}>{error}</Text>
				<Text style={styles.text}>Please restart the app</Text>
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
})
