import React, { useState, useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"

import StudioTile from "../../../components/User/StudioTile"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import NoContent from "../../Utils/NoContent"

const Studios = ({ navigation }) => {
	const token = useSelector((state) => state.user.token.data)
	const [loading, setLoading] = useState()
	const [following, setFollowing] = useState([])
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getFollowing = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/user/studios", {
				headers: { authorization: "Bearer " + token },
			})
			setFollowing(res.data)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		getFollowing()
	}, [refresh])

	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			{following.length !== 0 ? (
				<FlatList
					data={following}
					renderItem={({ item }) => (
						<StudioTile {...item} navigation={navigation} />
					)}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<NoContent label="No studios" />
			)}
		</View>
	)
}

export default Studios

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
