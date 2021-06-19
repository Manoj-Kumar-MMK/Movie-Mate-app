import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Movie from "../../screens/User/Movie/Movie"
import Watched from "../../screens/User/Watched/Watched"

const Stack = createStackNavigator()

const WatchedStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#f4511e",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					alignSelf: "center",
					fontWeight: "bold",
					fontSize: 30,
				},
			}}
		>
			<Stack.Screen name="Watched" component={Watched} />
			<Stack.Screen name="Movie" component={Movie} />
		</Stack.Navigator>
	)
}

export default WatchedStack

const styles = StyleSheet.create({})
