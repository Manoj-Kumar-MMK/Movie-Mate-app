import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Movies from "../../screens/Studio/Movie/Movies"
import Movie from "../../screens/Studio/Movie/Movie"
import ModifyMovieDetails from "../../screens/Studio/Movie/ModifyMovieDetails"
import ModifyMovieImage from "../../screens/Studio/Movie/ModifyMovieImage"

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
			<Stack.Screen name="Movies" component={Movies} />
			<Stack.Screen name="Movie" component={Movie} />
			<Stack.Screen name="Modify Details" component={ModifyMovieDetails} />
			<Stack.Screen name="Modify Image" component={ModifyMovieImage} />
		</Stack.Navigator>
	)
}

export default MovieStack

const styles = StyleSheet.create({})
