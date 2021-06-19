import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"

import UserTile from "../../../components/Studio/UserTile"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import NoContent from "../../Utils/NoContent"
import { useIsFocused } from "@react-navigation/native"

const Followers = () => {
	const token = useSelector((state) => state.studio.token.data)
	const [loading, setLoading] = useState()
	const [followers, setFollowers] = useState([])
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getFollowers = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/studio/users", {
				headers: { authorization: "Bearer " + token },
			})
			setFollowers(res.data)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getFollowers()
	}, [refresh])
	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			{followers.length !== 0 ? (
				<FlatList
					data={followers}
					renderItem={({ item }) => <UserTile {...item} />}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<NoContent label="No followers" />
			)}
		</View>
	)
}

export default Followers

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		padding: 25,
		backgroundColor: "#ffffff",
	},
})
