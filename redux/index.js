import axios from "axios"

export const Axios = axios.create({
	baseURL: "http://movie-mate-native.herokuapp.com/api",
})
