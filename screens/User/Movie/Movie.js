import React, { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import { FlatList, StyleSheet, Text, View } from "react-native"

import MovieCard from "../../../components/User/MovieCard"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"

const Movie = ({ navigation, route }) => {
	const { _id } = route.params
	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getMovieById = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/movie/id/" + _id)
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

	const dorefresh = () => {
		getMovieById()
	}

	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		movie && (
			<MovieCard {...movie} dorefresh={dorefresh} navigation={navigation} />
		)
	)
}

export default Movie

const styles = StyleSheet.create({})
