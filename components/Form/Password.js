import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { StyleSheet, TextInput, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Button } from "react-native-paper"

const Password = ({ control, name, errors, placeholder, label }) => {
	const [show, setShow] = useState(false)
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, value } }) => (
				<View style={styles.container}>
					<Text style={styles.text}>{label}</Text>
					<View style={styles.box}>
						<TextInput
							style={styles.textInput}
							secureTextEntry={!show}
							placeholder={placeholder}
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
							value={value}
						/>
						{!show ? (
							<TouchableOpacity onPress={() => setShow(!show)}>
								<Button icon="eye" style={styles.icon} />
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={() => setShow(!show)}>
								<Button icon="eye-off" />
							</TouchableOpacity>
						)}
					</View>
					{!!errors[name] && (
						<Text style={styles.error}>* {errors[name]?.message}</Text>
					)}
				</View>
			)}
		/>
	)
}

export default Password

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	text: {
		fontSize: 25,
		color: "#000000",
		paddingBottom: 10,
	},
	textInput: {
		height: 40,
		padding: 8,
	},
	error: {
		paddingTop: 10,
		color: "red",
	},
	box: {
		flexDirection: "row",
		borderRadius: 20,
		borderColor: "#456732",
		borderWidth: 2,
		justifyContent: "space-between",
	},
})
