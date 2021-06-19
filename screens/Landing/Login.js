import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Input from "../../components/Form/Input"
import Password from "../../components/Form/Password"

import { userLogin } from "../../redux/user/actions"
import { studioLogin } from "../../redux/studio/actions"

import Splash from "../Utils/Splash"
import ErrorScreen from "../Utils/ErrorScreen"
import { Axios } from "../../redux"

const formDefault = {
	email: "",
	password: "",
}

const Login = () => {
	const mode = useSelector((state) => state.mode.mode)
	const user = useSelector((state) => state.user.token)
	const studio = useSelector((state) => state.studio.token)
	const dispatch = useDispatch()

	const schema = yup.object().shape({
		email: yup
			.string()
			.required("Email is required")
			.email("Please enter a valid email")
			.test(
				"emailExist",
				"This email is does not exist in the database",
				async (value) => {
					let temp = value.length >= 1 ? value : "9"
					try {
						let res = await Axios.get(
							`${mode === "user" ? "user" : "studio"}/taken/${temp}`
						)
						return res.data.value
					} catch (err) {
						if (err.respose) alert(err.response.data.error)
						else if (err.request) alert(err.request._response)
						else alert(err.message)
					}
				}
			),
		password: yup
			.string()
			.required("Password is required")
			.max(15, "Too long (8-15 characters allowed)")
			.matches(
				/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
				"Password must contain at least 8 characters, one uppercase, one number and one special case character"
			),
	})

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: formDefault,
		resolver: yupResolver(schema),
	})

	const onSubmit = (data) => {
		mode == "user" ? dispatch(userLogin(data)) : dispatch(studioLogin(data))
	}
	return user.loading || studio.loading ? (
		<Splash />
	) : user.error || studio.error ? (
		<ErrorScreen error={user.error || studio.error} />
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
				style={[styles.button, styles.buttonF]}
				onPress={() => reset(formDefault)}
			>
				<Text style={styles.text}>Reset</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.button, styles.buttonS]}
				onPress={handleSubmit(onSubmit)}
			>
				<Text style={styles.text}>Login</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Login

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
