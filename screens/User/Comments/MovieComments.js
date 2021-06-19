import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, Text, View, Image } from "react-native"

import CommentTile from "../../../components/User/CommentTile"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import NoContent from "../../Utils/NoContent"
import { Axios } from "../../../redux"
import { useIsFocused } from "@react-navigation/native"

const MovieComments = ({ route }) => {
	const { _id, name, image } = route.params
	const [loading, setLoading] = useState()
	const [comments, setComments] = useState([])
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getMovieComments = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/comment/movie/" + _id)
			setComments(res.data)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getMovieComments()
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
			{comments.length !== 0 ? (
				<FlatList
					data={comments}
					renderItem={({ item }) => <CommentTile {...item} />}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<NoContent label="No Comments for this movie" />
			)}
		</View>
	)
}

export default MovieComments

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
		maxWidth: 300,
	},
})
