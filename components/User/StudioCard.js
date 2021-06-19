import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

import { Axios } from "../../redux"
import ErrorScreen from "../../screens/Utils/ErrorScreen"
import Splash from "../../screens/Utils/Splash"

const StudioCard = ({ _id, name, image, unfollowed, refresh }) => {
	const token = useSelector((state) => state.user.token.data)
	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	const [following, setFollowing] = useState(false)

	const follow = async () => {
		setLoading(true)
		try {
			let res = await Axios.post(
				"/user/follow",
				{ sid: _id },
				{
					headers: { authorization: "Bearer " + token },
				}
			)
			setFollowing(true)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const unfollow = async () => {
		setLoading(true)
		try {
			let res = await Axios.post(
				"/user/unfollow",
				{ sid: _id },
				{
					headers: { authorization: "Bearer " + token },
				}
			)
			setFollowing(false)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
			unfollowed()
		}
	}

	const isFollowing = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/user/isFollow/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			setFollowing(res.data.value)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		isFollowing()
	}, [refresh])

	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			<Image source={{ uri: image }} style={styles.image} />
			<View style={styles.box}>
				<Text style={styles.text}>{name}</Text>
				{following ? (
					<TouchableOpacity style={styles.button} onPress={unfollow}>
						<Text style={styles.buttonText}>Unfollow</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={styles.button} onPress={follow}>
						<Text style={styles.buttonText}>Follow</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

export default StudioCard

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: "#a8a8a8",
		padding: 20,
		borderRadius: 20,
		margin: 10,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 20,
		borderColor: "orange",
		borderWidth: 5,
	},
	text: {
		fontSize: 40,
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		maxWidth: 200,
		flexShrink: 1,
		paddingLeft: 15,
	},
	button: {
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		margin: 10,
		backgroundColor: "blue",
	},
	buttonText: {
		fontSize: 20,
		color: "#ffffff",
	},
	box: {
		margin: 10,
	},
})
