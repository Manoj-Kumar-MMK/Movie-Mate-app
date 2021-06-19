import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native"

import Input from "../../components/Form/Input"
import Password from "../../components/Form/Password"
import ImageUpload from "../../components/Form/ImageUpload"

import { userSignup } from "../../redux/user/actions"
import { studioSignup } from "../../redux/studio/actions"

import Splash from "../Utils/Splash"
import ErrorScreen from "../Utils/ErrorScreen"
import { Axios } from "../../redux"

const formDefault = {
	email: "",
	password: "",
	name: "",
	mobile: "",
}
const Signup = () => {
	const mode = useSelector((state) => state.mode.mode)
	const user = useSelector((state) => state.user.token)
	const studio = useSelector((state) => state.studio.token)
	const dispatch = useDispatch()

	const [image, setImage] = useState(null)

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
		email: yup
			.string()
			.required("Email is required")
			.email("Please enter a valid email")
			.test("emailTaken", "This email is already taken", async (value) => {
				let temp = value.length >= 1 ? value : "9"
				try {
					let res = await Axios.get(
						`${mode === "user" ? "user" : "studio"}/taken/${temp}`
					)
					return !res.data.value
				} catch (err) {
					if (err.respose) alert(err.response.data.error)
					else if (err.request) alert(err.request._response)
					else alert(err.message)
				}
			}),
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
		if (image === null) return alert("Please Upload an image")
		mode == "user"
			? dispatch(userSignup({ ...data, image }))
			: dispatch(studioSignup({ ...data, image }))
	}

	return user.loading || studio.loading ? (
		<Splash />
	) : user.error || studio.error ? (
		<ErrorScreen error={user.error || studio.error} />
	) : (
		<View style={styles.container}>
			<ScrollView>
				<Input
					label="Name"
					placeholder={`Enter ${mode} name`}
					name="name"
					errors={errors}
					control={control}
				/>
				<Input
					label="Email"
					placeholder="Enter email"
					name="email"
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
				<Password
					label="Password"
					placeholder="Enter password"
					name="password"
					errors={errors}
					control={control}
				/>
				<ImageUpload setImage={setImage} label="Choose Image" />
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
					<Text style={styles.text}>Signup</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}

export default Signup

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
