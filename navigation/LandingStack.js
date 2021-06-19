import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import Mode from "../screens/Landing/Mode"
import AuthMode from "../screens/Landing/AuthMode"
import Login from "../screens/Landing/Login"
import Signup from "../screens/Landing/Signup"

const Stack = createStackNavigator()

const LandingStack = () => {
	return (
		<NavigationContainer>
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
				<Stack.Screen name="Mode" component={Mode} />
				<Stack.Screen name="Authentication Mode" component={AuthMode} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default LandingStack

const styles = StyleSheet.create({})
