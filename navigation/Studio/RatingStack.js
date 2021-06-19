import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Movies from "../../screens/Studio/Movie/Movies"
import Movie from "../../screens/Studio/Movie/Movie"
import Ratings from "../../screens/Studio/Ratings/Ratings"

const Stack = createStackNavigator()

const RatingStack = () => {
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
			<Stack.Screen name="Movies" component={Movies} />
			<Stack.Screen name="Movie" component={Movie} />
			<Stack.Screen name="Ratings" component={Ratings} />
		</Stack.Navigator>
	)
}

export default RatingStack

const styles = StyleSheet.create({})
