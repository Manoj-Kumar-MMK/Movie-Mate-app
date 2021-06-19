import { actionTypes } from "./types"

export const setMode = (data) => {
	return {
		type: actionTypes.SET_MODE,
		payload: data,
	}
}

export const resetLogged = () => {
	return {
		type: actionTypes.RESET_LOGGED,
	}
}

export const setLogged = () => {
	return {
		type: actionTypes.SET_LOGGED,
	}
}
