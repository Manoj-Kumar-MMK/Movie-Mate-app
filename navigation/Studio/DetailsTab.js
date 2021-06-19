import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Details from "../../screens/Studio/Details/Details"
import ModifyDetails from "../../screens/Studio/Details/ModifyDetails"
import ModifyImage from "../../screens/Studio/Details/ModifyImage"

const Tab = createBottomTabNavigator()

const DetailsTab = () => {
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
			<Tab.Screen name="View" component={Details} />
			<Tab.Screen name="Modify" component={ModifyDetails} />
			<Tab.Screen name="Modify Image" component={ModifyImage} />
		</Tab.Navigator>
	)
}

export default DetailsTab

const styles = StyleSheet.create({})
