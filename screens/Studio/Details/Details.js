import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet } from "react-native"

import { getStudioDetails } from "../../../redux/studio/actions"

import DetailsCard from "../../../components/Studio/DetailsCard"

import Splash from "../../Utils/Splash"
import ErrorScreen from "../../Utils/ErrorScreen"

const Details = () => {
	const details = useSelector((state) => state.studio.details)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!details.data) dispatch(getStudioDetails())
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
