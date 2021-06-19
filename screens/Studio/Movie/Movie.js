import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"
import { StyleSheet, Text } from "react-native"

import MovieCard from "../../../components/Studio/MovieCard"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"

const Movie = ({ navigation, route }) => {
	const token = useSelector((state) => state.studio.token.data)

	const { _id } = route.params
	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getMovieById = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/movie/id/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			setMovie(res.data)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getMovieById()
	}, [refresh])

	const chooseMode = () => {
		return navigation.dangerouslyGetState().routeNames[2]
	}

	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		movie && (
			<MovieCard {...movie} navigation={navigation} mode={chooseMode()} />
		)
	)
}

export default Movie

const styles = StyleSheet.create({})
