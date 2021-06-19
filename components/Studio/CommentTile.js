import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"

const CommentTile = ({ commentedBy, text }) => {
	const { name, image } = commentedBy
	return (
		<View style={styles.container}>
			<Image source={{ uri: image }} style={styles.image} />
			<View style={styles.box}>
				<Text style={styles.text}>{name}</Text>
				<Text style={styles.text}>{text}</Text>
			</View>
		</View>
	)
}

export default CommentTile

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
		fontSize: 30,
		color: "white",
		fontWeight: "bold",
		maxWidth: 300,
		flexShrink: 1,
		paddingLeft: 15,
	},
	box: {
		margin: 5,
	},
})
