import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	Button,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
} from "react-native"

import ImageUpload from "../../../components/Form/ImageUpload"
import { getStudioDetails } from "../../../redux/studio/actions"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"

const ModifyImage = () => {
	const token = useSelector((state) => state.studio.token.data)
	const details = useSelector((state) => state.studio.details)
	const dispatch = useDispatch()

	const [image, setImage] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const upload = async () => {
		if (image === null) return alert("Please upload an image")
		setLoading(true)
		try {
			let res = await Axios.patch(
				"/studio/image",
				{ image },
				{ headers: { authorization: "Bearer " + token } }
			)
			dispatch(getStudioDetails())
			alert(res.data.message)
		} catch (err) {
			if (err.response) setError(err.response.data.error)
			else if (err.request) setError(err.requeset._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return loading || details.loading ? (
		<Splash />
	) : error || details.data.error ? (
		<ErrorScreen error={error || details.data.error} />
	) : (
		<View style={styles.container}>
			<Text style={styles.header}>Old Image</Text>
			<Image
				source={{
					uri: details.data.image,
				}}
				style={styles.image}
			/>
			<ImageUpload label="Choose Studio Logo" setImage={setImage} />
			<TouchableOpacity
				style={[styles.button, styles.buttonS]}
				onPress={upload}
			>
				<Text style={styles.text}>Modify Image</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ModifyImage

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		backgroundColor: "#ffffff",
	},
	button: {
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		margin: 10,
	},
	buttonS: {
		backgroundColor: "green",
	},
	text: {
		fontSize: 20,
		color: "#ffffff",
	},
	image: {
		width: 200,
		height: 200,
		alignSelf: "center",
		borderRadius: 20,
		borderWidth: 5,
		borderColor: "orange",
	},
	header: {
		fontSize: 30,
		textAlign: "center",
		paddingBottom: 10,
		fontWeight: "bold",
		color: "black",
	},
})
