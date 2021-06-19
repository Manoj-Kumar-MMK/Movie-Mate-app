import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"
import { FlatList, StyleSheet, Text, View } from "react-native"

import MovieTile from "../../../components/Studio/MovieTile"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import NoContent from "../../Utils/NoContent"

const Watched = ({ navigation }) => {
	const token = useSelector((state) => state.user.token.data)

	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getWatched = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/movie/watched", {
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
		getWatched()
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
				<NoContent label="No movies in Watched" />
			)}
		</View>
	)
}

export default Watched

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		backgroundColor: "#ffffff",
	},
})
