import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"

const RatingCircle = ({ rating = 0 }) => {
	return (
		<View style={styles.container}>
			<AnimatedCircularProgress
				size={130}
				width={15}
				fill={(rating / 5) * 100}
				tintColor="#fc1e17"
				backgroundColor="#6effdb"
			>
				{(fill) => <Text style={styles.points}>Rating : {fill / 20}</Text>}
			</AnimatedCircularProgress>
		</View>
	)
}

export default RatingCircle

const styles = StyleSheet.create({
	container: {
		/* 		flex: 1, */
		justifyContent: "center",
		alignItems: "center",
	},
	points: {
		fontSize: 20,
		fontWeight: "bold",
	},
})
