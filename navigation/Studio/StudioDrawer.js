import React from "react"
import { StyleSheet } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

import DetailsTab from "./DetailsTab"
import MoviesTab from "./MoviesTab"
import Followers from "../../screens/Studio/Followers/Followers"
import RatingStack from "./RatingStack"
import CommentStack from "./CommentStack"
import Logout from "../../screens/Landing/Logout"
import Delete from "../../screens/Landing/Delete"

const Drawer = createDrawerNavigator()

const StudioDrawer = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				drawerContentOptions={{
					activeTintColor: "#e91e63",
					itemStyle: { marginVertical: 5 },
				}}
			>
				<Drawer.Screen name="Details" component={DetailsTab} />
				<Drawer.Screen name="Movies" component={MoviesTab} />
				<Drawer.Screen name="Followers" component={Followers} />
				<Drawer.Screen name="Rating" component={RatingStack} />
				<Drawer.Screen name="Comments" component={CommentStack} />
				<Drawer.Screen name="Logout" component={Logout} />
				<Drawer.Screen name="Delete" component={Delete} />
			</Drawer.Navigator>
		</NavigationContainer>
	)
}

export default StudioDrawer

const styles = StyleSheet.create({})
