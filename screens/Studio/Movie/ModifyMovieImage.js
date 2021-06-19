import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	Alert,
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

import ImageUpload from "../../../components/Form/ImageUpload"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"

const ModifyMovieDetails = ({ route }) => {
	const token = useSelector((state) => state.studio.token.data)

	const { _id } = route.params

	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	const [movie, setMovie] = useState(null)
	const [image, setImage] = useState(null)

	const getMovieDetails = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/movie/id/" + _id)
			setMovie(res.data)
		} catch (err) {
			if (err.response) setError(err.response.data.error)
			else if (err.request) setError(err.requeset._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		getMovieDetails()
	}, [])

	const updateImage = async () => {
		if (image === null) return alert("Please upload an image")
		setLoading(true)
		try {
			let res = await Axios.patch(
				"/movie/id/image/" + _id,
				{ image },
				{ headers: { authorization: "Bearer " + token } }
			)
			getMovieDetails()
			alert(res.data.message)
		} catch (err) {
			if (err.response) setError(err.response.data.error)
			else if (err.request) setError(err.requeset._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			<Text style={styles.header}>Old Image</Text>
			{movie?.image && (
				<Image
					source={{
						uri: movie.image,
					}}
					style={styles.image}
				/>
			)}
			<ImageUpload label="Choose image to update" setImage={setImage} />
			<TouchableOpacity
				style={[styles.button, styles.buttonS]}
				onPress={updateImage}
			>
				<Text style={styles.text}>Modify Image</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ModifyMovieDetails

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
