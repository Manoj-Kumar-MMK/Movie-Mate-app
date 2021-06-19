import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Movies from "../../screens/User/Movie/Movies"
import Movie from "../../screens/User/Movie/Movie"
import Studios from "../../screens/User/Movie/Studios"
import MovieRatings from "../../screens/User/Ratings/MovieRatings"
import MovieComments from "../../screens/User/Comments/MovieComments"

const Stack = createStackNavigator()

const MovieStack = () => {
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
			<Stack.Screen name="Studios" component={Studios} />
			<Stack.Screen name="Movies" component={Movies} />
			<Stack.Screen name="Movie" component={Movie} />
			<Stack.Screen name="Ratings" component={MovieRatings} />
			<Stack.Screen name="Comments" component={MovieComments} />
		</Stack.Navigator>
	)
}

export default MovieStack

const styles = StyleSheet.create({})
