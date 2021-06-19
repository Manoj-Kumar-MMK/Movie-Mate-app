import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import RatingCircle from "./RatingCircle"

const RatingTile = ({ ratedBy, rating }) => {
	const { name, image } = ratedBy
	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<Text style={styles.text}>{name}</Text>
				<Image source={{ uri: image }} style={styles.image} />
			</View>
			<RatingCircle rating={rating} />
		</View>
	)
}

export default RatingTile

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
		fontSize: 25,
		color: "white",
		fontWeight: "bold",
		maxWidth: 300,
		flexShrink: 1,
		paddingLeft: 15,
		marginBottom: 10,
	},
	box: {
		margin: 5,
	},
})
