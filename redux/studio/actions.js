import { actionTypes } from "./types"
import { Axios } from "../index"
import { setLogged, resetLogged } from "../mode/actions"

export const detailsStart = () => {
	return {
		type: actionTypes.DETAILS_START,
	}
}

export const detailsSuccess = (data) => {
	return {
		type: actionTypes.DETAILS_SUCCESS,
		payload: data,
	}
}

export const detailsFailure = (data) => {
	return {
		type: actionTypes.DETAILS_FAILURE,
		payload: data,
	}
}

export const tokenStart = () => {
	return {
		type: actionTypes.TOKEN_START,
	}
}

export const tokenSuccess = (data) => {
	return {
		type: actionTypes.TOKEN_SUCCESS,
		payload: data,
	}
}

export const tokenFailure = (data) => {
	return {
		type: actionTypes.TOKEN_FAILURE,
		payload: data,
	}
}

export const reset = () => {
	return {
		type: actionTypes.RESET,
	}
}

export const logout = () => (dispatch) => {
	dispatch(reset())
	dispatch(resetLogged())
}

export const studioSignup = (data) => async (dispatch) => {
	dispatch(tokenStart())
	try {
		const res = await Axios.post("/studio/signup", data)
		dispatch(tokenSuccess(res.data.token))
		dispatch(setLogged())
	} catch (err) {
		if (err.response) dispatch(tokenFailure(err.response.data.error))
		else if (err.request) dispatch(tokenFailure(err.request._response))
		else dispatch(tokenFailure(err.message))
	}
}

export const studioLogin = (data) => async (dispatch) => {
	dispatch(tokenStart())
	try {
		const res = await Axios.post("/studio/login", data)
		dispatch(tokenSuccess(res.data.token))
		dispatch(setLogged())
	} catch (err) {
		if (err.response) dispatch(tokenFailure(err.response.data.error))
		else if (err.request) dispatch(tokenFailure(err.request._response))
		else dispatch(tokenFailure(err.message))
	}
}

export const getStudioDetails = () => async (dispatch, getState) => {
	let token = getState().studio.token.data
	dispatch(detailsStart())
	try {
		const res = await Axios.get("/studio", {
			headers: { authorization: "Bearer " + token },
		})
		dispatch(detailsSuccess(res.data))
	} catch (err) {
		console.log(err.request)
		if (err.response) dispatch(detailsFailure(err.response.data.error))
		else if (err.request) dispatch(detailsFailure(err.request._response))
		else dispatch(detailsFailure(err.message))
	}
}
