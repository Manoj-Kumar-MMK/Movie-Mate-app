import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSelector } from "react-redux"
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

import Input from "../../../components/Form/Input"
import ImageUpload from "../../../components/Form/ImageUpload"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import { useIsFocused } from "@react-navigation/native"

const schema = yup.object().shape({
	name: yup
		.string()
		.required("Movie Name is required")
		.min(5, "Movie Name must be at least 5 characters"),

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
	name: "",
	description: "",
	genre: "",
}

const AddMovie = () => {
	const token = useSelector((state) => state.studio.token.data)
	const [loading, setLoading] = useState()
	const [error, setError] = useState(null)
	const [image, setImage] = useState(null)
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

	useEffect(() => {
		reset(formDefault)
	}, [refresh])

	const onSubmit = async (data) => {
		if (image === null) return alert("Please Upload an image")
		setLoading(true)
		try {
			let res = await Axios.post(
				"/movie",
				{ image, ...data },
				{
					headers: { authorization: "Bearer " + token },
				}
			)
			alert(res.data.message)
			reset(formDefault)
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
			<ScrollView>
				<Input
					label="Name"
					placeholder={`Enter movie name`}
					name="name"
					errors={errors}
					control={control}
				/>
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
				<ImageUpload label="Choose Movie logo" setImage={setImage} />
				<TouchableOpacity
					style={[styles.button, styles.buttonS]}
					onPress={() => reset(formDefault)}
				>
					<Text style={styles.text}>Reset</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.buttonF]}
					onPress={handleSubmit(onSubmit)}
				>
					<Text style={styles.text}>Add Movie</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}

export default AddMovie

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		paddingTop: 40,
		backgroundColor: "#ffffff",
	},
	button: {
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		margin: 10,
	},
	buttonS: {
		backgroundColor: "red",
	},

	buttonF: {
		backgroundColor: "green",
	},
	text: {
		fontSize: 20,
		color: "#ffffff",
	},
})
