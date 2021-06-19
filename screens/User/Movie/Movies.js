import React, { useState, useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { FlatList, StyleSheet, Text, View } from "react-native"

import MovieTile from "../../../components/User/MovieTile"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import NoContent from "../../Utils/NoContent"

const Movies = ({ navigation, route }) => {
	const { _id } = route.params
	const token = useSelector((state) => state.studio.token.data)

	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getMovies = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/movie/studioId/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			setMovies(res.data)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getMovies()
	}, [refresh])
	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			{movies.length !== 0 ? (
				<FlatList
					data={movies}
					renderItem={({ item }) => (
						<MovieTile {...item} navigation={navigation} />
					)}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<NoContent label="No movies" />
			)}
		</View>
	)
}

export default Movies

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		justifyContent: "center",
		backgroundColor: "#ffffff",
	},
})
