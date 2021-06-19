import React, { useState, useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"

import StudioCard from "../../../components/User/StudioCard"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"
import { Axios } from "../../../redux"
import NoContent from "../../Utils/NoContent"

const AllStudios = () => {
	const [key, setKey] = useState("")
	const [studios, setStudios] = useState([])
	const [error, setError] = useState()
	const [loading, setLoading] = useState()
	const refresh = useIsFocused()

	const getAllStudios = async () => {
		try {
			let res = await Axios.get("/studio/search?q=" + key)
			if (res.status === 200) setStudios(res.data)
			else setStudios([])
		} catch (err) {
			if (err.respose) setError(err.response.data.error)
			else if (err.request) setError(err.request._response)
			else setError(err.message)
		}
	}

	useEffect(() => {
		getAllStudios()
	}, [key])

	useEffect(() => {
		setKey("")
	}, [refresh])

	return loading ? (
		<Splash />
	) : error ? (
		<ErrorScreen error={error} />
	) : (
		<View style={styles.container}>
			<TextInput
				style={styles.textInput}
				placeholder="Enter studio name"
				value={key}
				onChangeText={(value) => setKey(value)}
			/>
			{studios.length !== 0 ? (
				<FlatList
					data={studios}
					renderItem={({ item }) => <StudioCard {...item} refresh={refresh} />}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<NoContent label="No studios" />
			)}
		</View>
	)
}

export default AllStudios

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		backgroundColor: "#ffffff",
	},
	textInput: {
		height: 60,
		width: 300,
		borderRadius: 20,
		borderColor: "#456732",
		borderWidth: 2,
		padding: 20,
		margin: 15,
		alignSelf: "center",
	},
})
