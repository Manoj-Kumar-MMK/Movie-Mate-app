import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"

const DetailsCard = ({ image, name, mobile, email }) => {
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: image }} style={styles.image} />
			</View>
			<View style={styles.detailsContainer}>
				<View style={styles.detail}>
					<Text style={styles.key}>Name</Text>
					<Text style={styles.value}>{name}</Text>
				</View>

				<View style={styles.detail}>
					<Text style={styles.key}>Email</Text>
					<Text style={styles.value}>{email}</Text>
				</View>

				<View style={styles.detail}>
					<Text style={styles.key}>Mobile</Text>
					<Text style={styles.value}>{mobile}</Text>
				</View>
			</View>
		</View>
	)
}

export default DetailsCard

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "space-evenly",
		backgroundColor: "#ffffff",
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: "orange",
	},
	imageContainer: {
		alignItems: "center",
		padding: 20,
	},
	detailsContainer: {
		flex: 0.8,
		backgroundColor: "yellow",
		justifyContent: "space-evenly",
		alignItems: "center",
		borderRadius: 20,
		padding: 10,
	},
	key: {
		backgroundColor: "blue",
		color: "#ffffff",
		fontSize: 20,
		marginRight: 3,
		padding: 20,
		borderRadius: 20,
		alignItems: "center",
	},
	value: {
		backgroundColor: "green",
		color: "#ffffff",
		fontSize: 20,
		marginLeft: 3,
		padding: 20,
		borderRadius: 20,
		alignItems: "center",
	},
	detail: {
		flexDirection: "row",
	},
})
