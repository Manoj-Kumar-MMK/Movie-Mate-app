import React, { useEffect } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { getUserDetails } from "../../../redux/user/actions"

import DetailsCard from "../../../components/User/DetailsCard"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"

const Details = () => {
	const details = useSelector((state) => state.user.details)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!details.data) dispatch(getUserDetails())
	}, [])

	return details.loading ? (
		<Splash />
	) : details.error ? (
		<ErrorScreen error={details.error} />
	) : (
		<>{details.data && <DetailsCard {...details.data} />}</>
	)
}

export default Details

const styles = StyleSheet.create({})
