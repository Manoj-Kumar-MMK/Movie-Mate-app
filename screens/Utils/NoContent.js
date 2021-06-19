import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Modal, Portal } from "react-native-paper"

const NoContent = ({ label }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>No Content Found</Text>
			<Text style={styles.text}>{label}</Text>
		</View>
	)
}

export default NoContent

const styles = StyleSheet.create({
	container: {
		margin: 40,
		height: 400,
		borderRadius: 30,
		borderColor: "black",
		borderWidth: 10,
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
})
