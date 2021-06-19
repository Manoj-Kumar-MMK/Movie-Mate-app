import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"

const AuthMode = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.box, styles.backA]}
				onPress={() => {
					navigation.navigate("Login")
				}}
			>
				<Text style={styles.header}>Login</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.box, styles.backB]}
				onPress={() => {
					navigation.navigate("Signup")
				}}
			>
				<Text style={styles.header}>Signup</Text>
			</TouchableOpacity>
		</View>
	)
}

export default AuthMode

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#ffffff",
	},
	box: {
		flex: 0.5,
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		borderRadius: 20,
	},
	header: {
		fontSize: 50,
		color: "#ffffff",
		fontWeight: "bold",
	},
	backA: {
		backgroundColor: "blue",
	},
	backB: {
		backgroundColor: "#0af535",
	},
})
