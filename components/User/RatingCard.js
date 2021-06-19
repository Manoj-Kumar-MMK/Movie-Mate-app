import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	Alert,
	TouchableOpacity,
} from "react-native"

import { Axios } from "../../redux"
import ErrorScreen from "../../screens/Utils/ErrorScreen"
import Splash from "../../screens/Utils/Splash"
import RatingCircle from "./RatingCircle"

const RatingCard = ({ movie, rating, _id, dorefresh }) => {
	const token = useSelector((state) => state.user.token.data)
	const [value, setValue] = useState(0)
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState()
	const [error, setError] = useState()

	const modifyRating = async () => {
		setLoading(true)
		try {
			let res = await Axios.patch(
				"/rating",
				{ ratingValue: value, rid: _id },
				{
					headers: { authorization: "Bearer " + token },
				}
			)
			alert(res.data.message)
			return dorefresh()
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const deleteRating = async () => {
		setLoading(true)
		try {
			let res = await Axios.delete("/rating/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			alert(res.data.message)
			return dorefresh()
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
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
			<View style={styles.box}>
				<Text style={styles.text}>{movie.name}</Text>
				<Image source={{ uri: movie.image }} style={styles.image} />
				<Text style={styles.text}>Movie Rating</Text>
				<RatingCircle rating={movie.rating} />
			</View>
			<View style={styles.box}>
				<Text style={styles.text}>My Rating</Text>
				<RatingCircle rating={rating} />
				<TouchableOpacity
					style={[styles.button, styles.buttonR]}
					onPress={() =>
						Alert.alert(
							"Delete my rating",
							"Are you sure you want to delete your rating",
							[
								{
									text: "Cancel",
									style: "cancel",
								},

								{
									text: "Yes",
									style: "destructive",
									onPress: () => deleteRating(),
								},
							],
							{
								cancelable: true,
							}
						)
					}
				>
					<Text style={styles.buttonText}>Delete Rating</Text>
				</TouchableOpacity>
				{!show && (
					<TouchableOpacity
						style={[styles.button, styles.buttonG]}
						onPress={() => setShow(true)}
					>
						<Text style={styles.buttonText}>Modify rating</Text>
					</TouchableOpacity>
				)}
				{show && (
					<>
						<TextInput
							value={value}
							style={styles.textInput}
							placeholderTextColor="white"
							placeholder="Enter rating"
							onChangeText={(value) => {
								if (value > 5 || value < 0) alert("Invalid rating")
								else setValue(value)
							}}
						/>
						<TouchableOpacity
							style={[styles.button, styles.buttonG]}
							onPress={modifyRating}
						>
							<Text style={styles.buttonText}>Ok</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.buttonR]}
							onPress={() => setShow(false)}
						>
							<Text style={styles.buttonText}>Close</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
		</View>
	)
}

export default RatingCard

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: "#a8a8a8",
		padding: 20,
		borderRadius: 20,
		margin: 10,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 20,
		borderWidth: 5,
		borderColor: "orange",
	},
	text: {
		fontSize: 20,
		color: "white",
		fontWeight: "bold",
		maxWidth: 300,
		flexShrink: 1,
		paddingLeft: 15,
		marginBottom: 10,
		textAlign: "center",
	},
	button: {
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		margin: 10,
		minWidth: 150,
	},
	buttonR: {
		backgroundColor: "red",
	},

	buttonG: {
		backgroundColor: "green",
	},
	buttonText: {
		fontSize: 20,
		color: "#ffffff",
	},
	box: {
		margin: 10,
		alignItems: "center",
	},
	textInput: {
		height: 60,
		borderRadius: 20,
		borderColor: "green",
		borderWidth: 2,
		padding: 8,
		color: "white",
		minWidth: 150,
	},
})
