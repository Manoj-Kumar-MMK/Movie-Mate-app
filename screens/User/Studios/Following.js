import React, { useState, useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"

import { useSelector } from "react-redux"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"

import StudioCard from "../../../components/User/StudioCard"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import NoContent from "../../Utils/NoContent"

const Following = ({ navigation }) => {
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
			if (res.status === 200) setFollowing(res.data)
			else setFollowing([])
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

	const unfollowed = async () => {
		getFollowing()
	}

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
						<StudioCard {...item} unfollowed={unfollowed} />
					)}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<NoContent label="No following studios" />
			)}
		</View>
	)
}

export default Following

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		backgroundColor: "#ffffff",
	},
})
