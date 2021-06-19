import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

import DetailsTab from "./DetailsTab"
import StudiosTab from "./StudiosTab"
import MovieStack from "./MovieStack"
import WishStack from "./WishStack"
import WatchedStack from "./WatchedStack"
import UserRatings from "../../screens/User/Ratings/UserRatings"
import UserComments from "../../screens/User/Comments/UserComments"
import Logout from "../../screens/Landing/Logout"
import Delete from "../../screens/Landing/Delete"

const Drawer = createDrawerNavigator()

const UserDrawer = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				drawerContentOptions={{
					activeTintColor: "#e91e63",
					itemStyle: { marginVertical: 5 },
				}}
			>
				<Drawer.Screen name="Details" component={DetailsTab} />
				<Drawer.Screen name="Studios" component={StudiosTab} />
				<Drawer.Screen name="Movies" component={MovieStack} />
				<Drawer.Screen name="Wishlist" component={WishStack} />
				<Drawer.Screen name="Watched" component={WatchedStack} />
				<Drawer.Screen name="My Ratings" component={UserRatings} />
				<Drawer.Screen name="My Comments" component={UserComments} />
				<Drawer.Screen name="Logout" component={Logout} />
				<Drawer.Screen name="Delete" component={Delete} />
			</Drawer.Navigator>
		</NavigationContainer>
	)
}

export default UserDrawer

const styles = StyleSheet.create({})
