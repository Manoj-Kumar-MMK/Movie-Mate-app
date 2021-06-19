import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
	Alert,
	Button,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

import { Axios } from "../../redux"
import ErrorScreen from "../../screens/Utils/ErrorScreen"
import Splash from "../../screens/Utils/Splash"
import RatingModal from "./RatingModal"
import RatingCircle from "./RatingCircle"
import CommentModal from "./CommentModal"
import { useIsFocused } from "@react-navigation/native"

const MovieCard = ({
	name,
	genre,
	_id,
	image,
	description,
	rating,
	navigation,
	dorefresh,
}) => {
	const token = useSelector((state) => state.user.token.data)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const [wishlist, setWishlist] = useState(false)
	const [watched, setWatched] = useState(false)

	const refresh = useIsFocused()

	const [rated, setRated] = useState({ value: false, rid: null })
	const [ratingl, setRatingl] = useState({
		value: 0,
		modal: false,
		mode: "add",
	})

	const [commented, setCommented] = useState({ value: false, cid: null })
	const [comment, setComment] = useState({
		value: "",
		modal: false,
		mode: "add",
	})

	const isInWishlist = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/movie/isWishlist/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			setWishlist(res.data.value)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const isInWatched = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/movie/isWatched/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			setWatched(res.data.value)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const addToWishlist = async () => {
		setLoading(true)
		try {
			let res = await Axios.post(
				"/movie/wishlist",
				{ mid: _id },
				{
					headers: { authorization: "Bearer " + token },
				}
			)
			setWishlist(true)
			alert(res.data.message)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const addToWatched = async () => {
		setLoading(true)
		try {
			let res = await Axios.post(
				"/movie/watched",
				{ mid: _id },
				{
					headers: { authorization: "Bearer " + token },
				}
			)
			alert(res.data.message)
			setWatched(true)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const removeFromWishlist = async () => {
		setLoading(true)
		try {
			let res = await Axios.delete("/movie/wishlist/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			setWishlist(false)
			alert(res.data.message)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const removeFromWatched = async () => {
		setLoading(true)
		try {
			let res = await Axios.delete("/movie/watched/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			setWatched(false)
			alert(res.data.message)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const hasUserRatedMovie = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/rating/is/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			if (res.data.value) setRated({ ...res.data })
			else setRated({ ...res.data, rid: null })
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const hasUserCommentedMovie = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/comment/is/" + _id, {
				headers: { authorization: "Bearer " + token },
			})
			if (res.data.value) setCommented({ ...res.data })
			else setCommented({ ...res.data, cid: null })
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const addRating = async () => {
		setLoading(true)
		try {
			let res = await Axios.post(
				"/rating",
				{ mid: _id, ratingValue: ratingl.value },
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

	const addComment = async () => {
		setLoading(true)
		try {
			let res = await Axios.post(
				"/comment",
				{ mid: _id, text: comment.value },
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
	const modifyRating = async () => {
		setLoading(true)
		try {
			let res = await Axios.patch(
				"/rating",
				{ ratingValue: ratingl.value, rid: rated.rid },
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

	const modifyComment = async () => {
		setLoading(true)
		try {
			let res = await Axios.patch(
				"/comment",
				{ text: comment.value, cid: commented.cid },
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

	const deleteRating = async () => {
		setLoading(true)
		try {
			let res = await Axios.delete("/rating/" + rated.rid, {
				headers: { authorization: "Bearer " + token },
			})
			alert(res.data.message)
			dorefresh()
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
			let res = await Axios.delete("/comment/" + commented.cid, {
				headers: { authorization: "Bearer " + token },
			})
			alert(res.data.message)
			dorefresh()
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		isInWatched(), isInWishlist(), hasUserRatedMovie(), hasUserCommentedMovie()
	}, [refresh])

	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			<ScrollView>
				<Text style={styles.header}>
					{name} ({genre})
				</Text>
				<View style={styles.box}>
					<Image source={{ uri: image }} style={styles.image} />
					<RatingCircle rating={rating} />
				</View>
				<View style={styles.desc}>
					<Text style={styles.descText}>{description}</Text>
				</View>
				{wishlist ? (
					<TouchableOpacity
						style={[styles.button, styles.buttonR]}
						onPress={removeFromWishlist}
					>
						<Text style={styles.text}>Remove from wishlist</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={[styles.button, styles.buttonG]}
						onPress={addToWishlist}
					>
						<Text style={styles.text}>Add to wishlist</Text>
					</TouchableOpacity>
				)}

				<View>
					{watched ? (
						<TouchableOpacity
							style={[styles.button, styles.buttonR]}
							onPress={removeFromWatched}
						>
							<Text style={styles.text}>Remove from watched</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={[styles.button, styles.buttonG]}
							onPress={addToWatched}
						>
							<Text style={styles.text}>Add to watched</Text>
						</TouchableOpacity>
					)}
				</View>
				<View>
					{rated.value ? (
						<>
							<TouchableOpacity
								style={[styles.button, styles.buttonR]}
								onPress={() =>
									Alert.alert(
										"Delete my rating",
										"Are you sure you want to delete your rating",
										[
											{
												text: "Yes",
												style: "destructive",
												onPress: () => deleteRating(),
											},
											{
												text: "Cancel",
												style: "cancel",
											},
										],
										{
											cancelable: true,
										}
									)
								}
							>
								<Text style={styles.text}>Delete Rating</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.buttonG]}
								onPress={() =>
									setRatingl({ ...rating, modal: true, mode: "modify" })
								}
							>
								<Text style={styles.text}>Modify rating</Text>
							</TouchableOpacity>
						</>
					) : (
						<TouchableOpacity
							style={[styles.button, styles.buttonG]}
							onPress={() =>
								setRatingl({ ...rating, modal: true, mode: "add" })
							}
						>
							<Text style={styles.text}>Add rating</Text>
						</TouchableOpacity>
					)}
					<RatingModal
						rating={ratingl}
						setRating={setRatingl}
						addRating={addRating}
						modifyRating={modifyRating}
					/>
				</View>
				<View>
					{commented.value ? (
						<>
							<TouchableOpacity
								style={[styles.button, styles.buttonR]}
								onPress={() =>
									Alert.alert(
										"Delete my comment",
										"Are you sure you want to delete your comment",
										[
											{
												text: "Yes",
												style: "destructive",
												onPress: () => deleteComment(),
											},
											{
												text: "Cancel",
												style: "cancel",
											},
										],
										{
											cancelable: true,
										}
									)
								}
							>
								<Text style={styles.text}>Delete Comment</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.buttonG]}
								onPress={() =>
									setComment({ ...comment, modal: true, mode: "modify" })
								}
							>
								<Text style={styles.text}>Modify comment</Text>
							</TouchableOpacity>
						</>
					) : (
						<TouchableOpacity
							style={[styles.button, styles.buttonG]}
							onPress={() =>
								setComment({ ...comment, modal: true, mode: "add" })
							}
						>
							<Text style={styles.text}>Add comment</Text>
						</TouchableOpacity>
					)}
					<CommentModal
						comment={comment}
						setComment={setComment}
						addComment={addComment}
						modifyComment={modifyComment}
					/>
				</View>
				<View>
					<TouchableOpacity
						style={[styles.button, styles.buttonB]}
						onPress={() => navigation.navigate("Ratings", { _id, name, image })}
					>
						<Text style={styles.text}>Get Movie Ratings</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.buttonB]}
						onPress={() =>
							navigation.navigate("Comments", { _id, name, image })
						}
					>
						<Text style={styles.text}>Get Movie Comments</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}

export default MovieCard

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
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
	buttonG: {
		backgroundColor: "green",
	},
	text: {
		fontSize: 20,
		color: "#ffffff",
	},
	header: {
		fontSize: 30,
		textAlign: "center",
		paddingBottom: 10,
		fontWeight: "bold",
		color: "black",
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 50,
		alignSelf: "center",
		margin: 10,
		borderColor: "orange",
		borderWidth: 5,
	},
	desc: {
		margin: 20,
		borderRadius: 10,
		backgroundColor: "yellow",
	},
	descText: {
		fontSize: 30,
		fontWeight: "bold",
		color: "black",
		padding: 20,
	},
})
