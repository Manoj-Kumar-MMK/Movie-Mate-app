import React, { useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import * as ImagePicker from "expo-image-picker"

const ImageUpload = ({ label, setImage }) => {
	const [uri, setUri] = useState(null)
	const [show, setShow] = useState(false)

	const takePicture = async () => {
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
		if (permissionResult.granted === false) {
			alert("Please give permission to access camera")
			return
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		})

		if (!result.cancelled) {
			setUri(result.uri)
			setImage(`data:image/jpg;base64,${result.base64}`)
			setShow(false)
		}
	}

	const pickImage = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (permissionResult.granted === false) {
			alert("Please give permission to access gallery")
			return
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		})

		if (!result.cancelled) {
			setUri(result.uri)
			setImage(`data:image/jpg;base64,${result.base64}`)
			setShow(false)
		}
	}
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, styles.buttonUpload]}
				onPress={() => setShow(!show)}
			>
				<Text style={styles.text}>{label}</Text>
			</TouchableOpacity>
			{show && (
				<View style={styles.buttonGroup}>
					<TouchableOpacity
						style={[styles.button, styles.buttonSelect]}
						onPress={pickImage}
					>
						<Text style={styles.text}>Open Gallery</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.buttonSelect]}
						onPress={takePicture}
					>
						<Text style={styles.text}>Take Picture</Text>
					</TouchableOpacity>
				</View>
			)}
			{uri && (
				<View style={styles.imageContainer}>
					<Image source={{ uri }} style={styles.image} />
				</View>
			)}
		</View>
	)
}

export default ImageUpload

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	button: {
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		margin: 10,
	},
	buttonSelect: {
		backgroundColor: "violet",
	},
	buttonUpload: {
		backgroundColor: "blue",
	},
	text: {
		fontSize: 20,
		color: "#ffffff",
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 20,
		borderWidth: 5,
		borderColor: "orange",
	},
	imageContainer: {
		alignItems: "center",
		padding: 20,
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
})
