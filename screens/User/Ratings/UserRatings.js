import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { StyleSheet, View, FlatList } from "react-native"

import RatingCard from "../../../components/User/RatingCard"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import NoContent from "../../Utils/NoContent"
import { useIsFocused } from "@react-navigation/native"

const UserRatings = () => {
	const token = useSelector((state) => state.user.token.data)
	const [loading, setLoading] = useState()
	const [ratings, setRatings] = useState([])
	const [error, setError] = useState()
	const refresh = useIsFocused()

	const getUserRatings = async () => {
		setLoading(true)
		try {
			let res = await Axios.get("/rating/user", {
				headers: { authorization: "Bearer " + token },
			})
			setRatings(res.data)
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) {
				setError("Error in the request")
			} else setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getUserRatings()
	}, [refresh])

	const dorefresh = () => getUserRatings()

	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			{ratings.length !== 0 ? (
				<FlatList
					data={ratings}
					renderItem={({ item }) => (
						<RatingCard {...item} dorefresh={dorefresh} />
					)}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<NoContent label="No ratings done by you" />
			)}
		</View>
	)
}

export default UserRatings

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
})
