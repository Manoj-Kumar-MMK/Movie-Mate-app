import React, { useState, useEffect } from "react"

import { FlatList, StyleSheet, Text, View, Image } from "react-native"
import RatingTile from "../../../components/User/RatingTile"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import NoContent from "../../Utils/NoContent"
import { useIsFocused } from "@react-navigation/native"

const MovieRatings = ({ route }) => {
	const { _id, name, image } = route.params
	const [loading, setLoading] = useState()
	const [ratings, setRatings] = useState([])
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getMovieRatings = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/rating/movie/" + _id)
			setRatings(res.data)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) {
				setError("Error in the request")
			} else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getMovieRatings()
	}, [refresh])
	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			<View style={styles.box}>
				<Image source={{ uri: image }} style={styles.image} />
				<Text style={styles.text}>{name}</Text>
			</View>
			{ratings.length !== 0 ? (
				<FlatList
					data={ratings}
					renderItem={({ item }) => <RatingTile {...item} />}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<NoContent label="No ratings for this movie" />
			)}
		</View>
	)
}

export default MovieRatings

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		backgroundColor: "#ffffff",
	},
	image: {
		width: 120,
		height: 120,
		alignSelf: "center",
		borderRadius: 20,
		borderWidth: 5,
		borderColor: "orange",
	},
	box: {
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "#479dff",
		borderRadius: 20,
	},
	text: {
		fontSize: 40,
		color: "white",
	},
})
