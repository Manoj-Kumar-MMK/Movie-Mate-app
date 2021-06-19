import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native"

import { logout as userLogout } from "../../redux/user/actions"
import { logout as studioLogout } from "../../redux/studio/actions"

const Logout = () => {
	const mode = useSelector((state) => state.mode.mode)
	const dispatch = useDispatch()

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() =>
					Alert.alert("Logout", "Are you sure u want to logout?", [
						{
							text: "Yes",
							onPress: () => {
								mode === "user"
									? dispatch(userLogout())
									: dispatch(studioLogout())
							},
						},
						{
							text: "No",
						},
					])
				}
			>
				<Text style={styles.text}>Logout</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Logout

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	button: {
		backgroundColor: "red",
		width: 200,
		height: 200,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 50,
		color: "white",
		fontWeight: "900",
	},
})
