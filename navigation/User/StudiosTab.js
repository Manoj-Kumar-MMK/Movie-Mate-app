import React from "react"
import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import AllStudios from "../../screens/User/Studios/AllStudios"
import Following from "../../screens/User/Studios/Following"

const Tab = createBottomTabNavigator()

const StudiosTab = () => {
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
			<Tab.Screen name="All" component={AllStudios} />
			<Tab.Screen name="Following" component={Following} />
		</Tab.Navigator>
	)
}

export default StudiosTab

const styles = StyleSheet.create({})
