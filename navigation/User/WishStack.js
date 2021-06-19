import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Movie from "../../screens/User/Movie/Movie"
import Wishlist from "../../screens/User/Wishlist/Wishlist"

const Stack = createStackNavigator()

const WishStack = () => {
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
			<Stack.Screen name="Wishlist" component={Wishlist} />
			<Stack.Screen name="Movie" component={Movie} />
		</Stack.Navigator>
	)
}

export default WishStack

const styles = StyleSheet.create({})
