import React from "react"
import "react-native-gesture-handler"
import { StyleSheet, Text, View } from "react-native"
import { Provider } from "react-redux"
import { Provider as PaperProvider } from "react-native-paper"
import { store } from "./redux/store"
import Base from "./screens/Base"

export default function App() {
	return (
		<Provider store={store}>
			<PaperProvider>
				<Base />
			</PaperProvider>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})
