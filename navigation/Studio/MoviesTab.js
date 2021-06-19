import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import AddMovie from "../../screens/Studio/Movie/AddMovie"
import MovieStack from "./MovieStack"

const Tab = createBottomTabNavigator()

const MoviesTab = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				labelStyle: {
					fontSize: 15,
				},
				activeTintColor: "white",
				activeBackgroundColor: "#0553fa",
				inactiveTintColor: "#0553fa",
				inactiveBackgroundColor: "white",
			}}
		>
			<Tab.Screen name="Add Movie" component={AddMovie} />
			<Tab.Screen name="View Movies" component={MovieStack} />
		</Tab.Navigator>
	)
}

export default MoviesTab

const styles = StyleSheet.create({})
