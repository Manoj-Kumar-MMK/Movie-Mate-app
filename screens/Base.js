import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"

import UserDrawer from "../navigation/User/UserDrawer"
import StudioDrawer from "../navigation/Studio/StudioDrawer"
import LandingStack from "../navigation/LandingStack"

const Base = () => {
	const mode = useSelector((state) => state.mode)
	return mode.logged ? (
		mode.mode === "user" ? (
			<UserDrawer />
		) : (
			<StudioDrawer />
		)
	) : (
		<LandingStack />
	)
}

export default Base

const styles = StyleSheet.create({})
