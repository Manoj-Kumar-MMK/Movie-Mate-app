import React, { useState } from "react"
import {
	TouchableOpacity,
	Button,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native"
import { useSelector } from "react-redux"
import ErrorScreen from "../../screens/Utils/ErrorScreen"
import Splash from "../../screens/Utils/Splash"
import { Axios } from "../../redux"

const MovieCard = ({
	name,
	genre,
	_id,
	image,
	description,
	navigation,
	mode,
}) => {
	const token = useSelector((state) => state.studio.token.data)
	const [loading, setLoading] = useState()
	const [error, setError] = useState()

	const deleteMovieById = async () => {
		setLoading(true)
		try {
			let res = await Axios.delete("/movie/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			alert(res.data.message)
			navigation.navigate("Movies")
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const selectMode = () => {
		switch (mode) {
			case "Modify Details":
				return (
					<>
						<TouchableOpacity
							style={[styles.button, styles.buttonS]}
							onPress={() => navigation.navigate("Modify Details", { _id })}
						>
							<Text style={styles.text}>Modify Details</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.buttonS]}
							onPress={() => navigation.navigate("Modify Image", { _id })}
						>
							<Text style={styles.text}>Modify Image</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.buttonF]}
							onPress={() => deleteMovieById()}
						>
							<Text style={styles.text}>Delete</Text>
						</TouchableOpacity>
					</>
				)
			case "Comments":
				return (
					<TouchableOpacity
						style={[styles.button, styles.buttonS]}
						onPress={() =>
							navigation.navigate("Comments", { _id, name, image })
						}
					>
						<Text style={styles.text}>Comments</Text>
					</TouchableOpacity>
				)
			case "Ratings":
				return (
					<TouchableOpacity
						style={[styles.button, styles.buttonS]}
						onPress={() => navigation.navigate("Ratings", { _id, name, image })}
					>
						<Text style={styles.text}>Ratings</Text>
					</TouchableOpacity>
				)
		}
	}
	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			<Text style={styles.header}>
				{name} ({genre})
			</Text>
			<View>
				<Image source={{ uri: image }} style={styles.image} />
			</View>
			<View style={styles.desc}>
				<Text style={styles.descText}>{description}</Text>
			</View>
			<View>{selectMode()}</View>
		</View>
	)
}

export default MovieCard

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
	buttonF: {
		backgroundColor: "red",
	},
	buttonS: {
		backgroundColor: "blue",
	},
	text: {
		fontSize: 20,
		color: "#ffffff",
	},
	header: {
		fontSize: 30,
		textAlign: "center",
		paddingBottom: 10,
		fontWeight: "bold",
		color: "black",
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 50,
		alignSelf: "center",
		margin: 10,
		borderColor: "orange",
		borderWidth: 5,
	},
	desc: {
		borderRadius: 10,
		backgroundColor: "yellow",
	},
	descText: {
		fontSize: 30,
		fontWeight: "bold",
		color: "black",
		padding: 20,
	},
})
