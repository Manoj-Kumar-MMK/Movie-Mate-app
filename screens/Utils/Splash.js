import React from "react"
import { StyleSheet, Text, ActivityIndicator } from "react-native"
import { Modal, Portal } from "react-native-paper"

const Splash = () => {
	return (
		<Portal>
			<Modal visible="true" style={styles.container}>
				<Text style={styles.text}>Loading ...</Text>
				<ActivityIndicator
					animating={true}
					color="blue"
					size={100}
					style={{ margin: 15 }}
				/>
			</Modal>
		</Portal>
	)
}

export default Splash

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 40,
		fontWeight: "bold",
		color: "black",
		marginBottom: 80,
	},
})
