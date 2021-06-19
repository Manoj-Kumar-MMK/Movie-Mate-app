import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Input from "../../../components/Form/Input"
import { getUserDetails } from "../../../redux/user/actions"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import { useIsFocused } from "@react-navigation/native"

const schema = yup.object().shape({
	name: yup
		.string()
		.required("Name is required")
		.min(3, "Name must be at least 3 characters"),
	mobile: yup
		.number()
		.typeError("That doesn't look like a phone number")
		.positive("A phone number can't start with a minus")
		.integer("A phone number can't include a decimal point")
		.min(8)
		.required("A phone number is required"),
})

const ModifyDetails = () => {
	const token = useSelector((state) => state.user.token.data)
	const details = useSelector((state) => state.user.details)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const refresh = useIsFocused()

	useEffect(() => {
		reset(details.data)
	}, [details.data, refresh])

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: { name: "", mobile: "" },
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data) => {
		setLoading(true)
		try {
			let res = await Axios.patch("/user", data, {
				headers: { authorization: "Bearer " + token },
			})
			dispatch(getUserDetails())
			alert(res.data.message)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	return loading || details.loading ? (
		<Splash />
	) : error || details.error ? (
		<ErrorScreen error={error || details.data.error} />
	) : (
		<View style={styles.container}>
			<Input
				label="Name"
				placeholder="Enter studio name"
				name="name"
				errors={errors}
				control={control}
			/>
			<Input
				label="Mobile Number"
				placeholder="Enter mobile number"
				name="mobile"
				errors={errors}
				control={control}
			/>
			<TouchableOpacity
				style={[styles.button, styles.buttonF]}
				onPress={() => reset(details.data)}
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

export default ModifyDetails

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
