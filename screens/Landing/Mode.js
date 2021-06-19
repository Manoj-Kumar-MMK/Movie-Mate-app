import React from "react"
import { useDispatch } from "react-redux"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { setMode } from "../../redux/mode/actions"

const Mode = ({ navigation }) => {
	const dispatch = useDispatch()
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.box, styles.backA]}
				onPress={() => {
					navigation.navigate("Authentication Mode")
					dispatch(setMode("user"))
				}}
			>
				<Text style={styles.header}>User</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.box, styles.backB]}
				onPress={() => {
					navigation.navigate("Authentication Mode")
					dispatch(setMode("studio"))
				}}
			>
				<Text style={styles.header}>Studio</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Mode

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
