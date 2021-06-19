import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native"

const UserTile = ({ image, name }) => {
	return (
		<TouchableOpacity style={styles.container}>
			<Image source={{ uri: image }} style={styles.image} />
			<Text style={styles.text}>{name}</Text>
		</TouchableOpacity>
	)
}

export default UserTile

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: "#a8a8a8",
		padding: 20,
		borderRadius: 20,
		margin: 10,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 20,
		borderWidth: 5,
		borderColor: "orange",
	},
	text: {
		fontSize: 50,
		color: "white",
		fontWeight: "bold",
		maxWidth: 300,
		flexShrink: 1,
		paddingLeft: 15,
	},
})
