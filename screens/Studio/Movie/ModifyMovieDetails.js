import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSelector } from "react-redux"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Input from "../../../components/Form/Input"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import { useIsFocused } from "@react-navigation/native"

const schema = yup.object().shape({
	description: yup
		.string()
		.required("Description is required")
		.min(15, "Description must be at least 15 characters"),

	genre: yup
		.string()
		.required("Genre is required")
		.min(5, "Genre must be at least 5 characters"),
})

const formDefault = {
	description: "",
	genre: "",
}

const ModifyMovieImage = ({ route }) => {
	const token = useSelector((state) => state.studio.token.data)

	const { _id } = route.params
	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: formDefault,
		resolver: yupResolver(schema),
	})

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
	}, [refresh])

	useEffect(() => {
		reset(movie)
	}, [movie, refresh])

	const onSubmit = async (data) => {
		setLoading(true)
		try {
			let res = await Axios.patch("/movie/id/" + _id, data, {
				headers: { authorization: "Bearer " + token },
			})
			getMovieDetails()
			alert(res.data.message)
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
			<Input
				label="Genre"
				placeholder="Enter movie genre"
				name="genre"
				errors={errors}
				control={control}
			/>
			<Input
				multiline
				label="Description"
				placeholder="Enter movie description"
				name="description"
				errors={errors}
				control={control}
			/>
			<TouchableOpacity
				style={[styles.button, styles.buttonF]}
				onPress={() => reset(movie)}
			>
				<Text style={styles.text}>Reset</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.button, styles.buttonS]}
				onPress={handleSubmit(onSubmit)}
			>
				<Text style={styles.text}>Modify Details</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ModifyMovieImage

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
		backgroundColor: "green",
	},
	text: {
		fontSize: 20,
		color: "#ffffff",
	},
})
