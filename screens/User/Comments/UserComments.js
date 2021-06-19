import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { FlatList, StyleSheet, Text, View } from "react-native"

import CommentCard from "../../../components/User/CommentCard"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import { useIsFocused } from "@react-navigation/native"
import NoContent from "../../Utils/NoContent"

const UserComments = () => {
	const token = useSelector((state) => state.user.token.data)
	const [loading, setLoading] = useState()
	const [comments, setComments] = useState([])
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getUserComments = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/comment/user", {
				headers: { authorization: "Bearer " + token },
			})
			setComments(res.data)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getUserComments()
	}, [refresh])

	const dorefresh = () => getUserComments()

	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			{comments.length !== 0 ? (
				<FlatList
					data={comments}
					renderItem={({ item }) => (
						<CommentCard {...item} dorefresh={dorefresh} />
					)}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<NoContent label="No Comments made by you" />
			)}
		</View>
	)
}

export default UserComments

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
})
