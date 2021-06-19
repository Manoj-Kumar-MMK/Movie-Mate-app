import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native"
import { Axios } from "../../redux"
import ErrorScreen from "../../screens/Utils/ErrorScreen"
import Splash from "../../screens/Utils/Splash"

const CommentCard = ({ movie, text, _id, dorefresh }) => {
	const token = useSelector((state) => state.user.token.data)
	const [value, setValue] = useState("")
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState()
	const [error, setError] = useState()

	const modifyComment = async () => {
		setLoading(true)
		try {
			let res = await Axios.patch(
				"/comment",
				{ text: value, cid: _id },
				{
					headers: { authorization: "Bearer " + token },
				}
			)
			alert(res.data.message)
			return dorefresh()
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const deleteComment = async () => {
		setLoading(true)
		try {
			let res = await Axios.delete("/comment/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			alert(res.data.message)
			return dorefresh()
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
			<View style={styles.box}>
				<Text style={styles.text}>{movie.name}</Text>
				<Image source={{ uri: movie.image }} style={styles.image} />
			</View>
			<View style={styles.textBox}>
				<Text style={styles.text}>{text}</Text>
				<View style={styles.butttonBox}>
					<TouchableOpacity
						style={[styles.button, styles.buttonR]}
						onPress={() =>
							Alert.alert(
								"Delete my comment",
								"Are you sure you want to delete your comment",
								[
									{
										text: "Cancel",
										style: "cancel",
									},

									{
										text: "Yes",
										style: "destructive",
										onPress: () => deleteComment(),
									},
								],
								{
									cancelable: true,
								}
							)
						}
					>
						<Text style={styles.buttonText}>Delete Comment</Text>
					</TouchableOpacity>
					{!show && (
						<TouchableOpacity
							style={[styles.button, styles.buttonG]}
							onPress={() => setShow(true)}
						>
							<Text style={styles.buttonText}>Modify Comment</Text>
						</TouchableOpacity>
					)}
					{show && (
						<>
							<TextInput
								value={value}
								style={styles.textInput}
								placeholderTextColor="white"
								placeholder="Enter comment"
								onChangeText={(value) => {
									setValue(value)
								}}
							/>
							{value !== " " && (
								<TouchableOpacity
									style={[styles.button, styles.buttonG]}
									onPress={modifyComment}
								>
									<Text style={styles.buttonText}>OK</Text>
								</TouchableOpacity>
							)}
							<TouchableOpacity
								style={[styles.button, styles.buttonR]}
								onPress={() => setShow(false)}
							>
								<Text style={styles.buttonText}>Close</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
			</View>
		</View>
	)
}

export default CommentCard

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
		borderWidth: 5,
		borderColor: "orange",
	},
	text: {
		fontSize: 20,
		color: "white",
		fontWeight: "bold",
		maxWidth: 300,
		flexShrink: 1,
		paddingLeft: 15,
		marginBottom: 10,
		textAlign: "center",
	},
	button: {
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		margin: 10,
	},
	buttonR: {
		backgroundColor: "red",
	},

	buttonG: {
		backgroundColor: "green",
	},
	buttonText: {
		fontSize: 20,
		color: "#ffffff",
	},
	box: {
		margin: 10,
	},
	textInput: {
		height: 60,
		borderRadius: 20,
		borderColor: "green",
		borderWidth: 2,
		padding: 8,
		color: "white",
	},
})
