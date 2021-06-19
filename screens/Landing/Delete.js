import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import {
	Alert,
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
} from "react-native"

import { logout as userLogout } from "../../redux/user/actions"
import { logout as studioLogout } from "../../redux/studio/actions"

import Splash from "../Utils/Splash"
import ErrorScreen from "../Utils/ErrorScreen"
import { Axios } from "../../redux"

import Password from "../../components/Form/Password"
import Input from "../../components/Form/Input"
import { useIsFocused } from "@react-navigation/native"

const schema = yup.object().shape({
	email: yup
		.string()
		.required("Email is required")
		.email("Please enter a valid email"),
	password: yup
		.string()
		.required("Password is required")
		.max(15, "Too long (8-15 characters allowed)")
		.matches(
			/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
			"Password must contain at least 8 characters, one uppercase, one number and one special case character"
		),
})

const formDefault = {
	email: "",
	password: "",
}

const Delete = () => {
	const mode = useSelector((state) => state.mode.mode)
	const user = useSelector((state) => state.user.token.data)
	const studio = useSelector((state) => state.studio.token.data)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	const refresh = useIsFocused()

	useEffect(() => {
		reset(formDefault)
	}, [refresh])
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: formDefault,
		resolver: yupResolver(schema),
	})

	const userLogin = async (data) => {
		setLoading(true)
		try {
			let res = await Axios.post("/user/login", data)
			Alert.alert(
				"Deleting account",
				"Are you sure u want to delete your account.This action is irreversible?",
				[
					{
						text: "Delete",
						onPress: () => {
							deleteUser()
						},
					},
					{
						text: "No",
					},
				]
			)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const studioLogin = async (data) => {
		setLoading(true)
		try {
			let res = await Axios.post("/studio/login", data)
			Alert.alert(
				"Deleting account",
				"Are you sure u want to delete your account.This action is irreversible?",
				[
					{
						text: "Delete",
						onPress: () => {
							deleteStudio()
						},
					},
					{
						text: "No",
					},
				]
			)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const deleteUser = async () => {
		setLoading(true)
		try {
			let res = await Axios.delete("/user", {
				headers: { authorization: "Bearer " + user },
			})
			alert(res.data.message)
			dispatch(userLogout())
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const deleteStudio = async () => {
		setLoading(true)
		try {
			let res = await Axios.delete("/studio", {
				headers: { authorization: "Bearer " + studio },
			})
			alert(res.data.message)
			dispatch(studioLogout())
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const onSubmit = (data) => {
		mode === "user" ? userLogin(data) : studioLogin(data)
	}

	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			<Input
				label="Email"
				placeholder="Enter email"
				name="email"
				errors={errors}
				control={control}
			/>
			<Password
				label="Password"
				placeholder="Enter password"
				name="password"
				errors={errors}
				control={control}
			/>
			<TouchableOpacity
				style={[styles.button, styles.buttonB]}
				onPress={() => reset(formDefault)}
			>
				<Text style={styles.text}>Reset</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.button, styles.buttonR]}
				onPress={handleSubmit(onSubmit)}
			>
				<Text style={styles.text}>Delete Account</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Delete

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
	buttonB: {
		backgroundColor: "blue",
	},

	buttonR: {
		backgroundColor: "red",
	},
	text: {
		fontSize: 20,
		color: "#ffffff",
	},
})
