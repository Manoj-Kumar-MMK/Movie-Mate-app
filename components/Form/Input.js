import React from "react"
import { Controller } from "react-hook-form"
import { StyleSheet, TextInput, Text, View } from "react-native"

const Input = ({ control, name, errors, placeholder, label, multiline }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, value } }) => (
				<View style={styles.container}>
					<Text style={styles.text}>{label}</Text>
					<TextInput
						multiline={multiline}
						placeholder={placeholder}
						style={styles.textInput}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
					/>

					{errors[name] && (
						<Text style={styles.error}>* {errors[name]?.message}</Text>
					)}
				</View>
			)}
		/>
	)
}

export default Input

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
		height: 45,
		borderRadius: 20,
		borderColor: "#456732",
		borderWidth: 2,
		padding: 8,
	},
	error: {
		paddingTop: 10,
		color: "red",
	},
})
