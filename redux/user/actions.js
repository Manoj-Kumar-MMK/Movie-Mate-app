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

export const detailsFailure = () => {
	return {
		type: actionTypes.DETAILS_FAILURE,
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

export const userSignup = (data) => async (dispatch) => {
	dispatch(tokenStart())
	try {
		const res = await Axios.post("/user/signup", data)
		dispatch(tokenSuccess(res.data.token))
		dispatch(setLogged())
	} catch (err) {
		if (err.response) dispatch(tokenFailure(err.response.data.error))
		else if (err.request) dispatch(tokenFailure(err.request._response))
		else dispatch(tokenFailure(err.message))
	}
}

export const userLogin = (data) => async (dispatch) => {
	dispatch(tokenStart())
	try {
		const res = await Axios.post("/user/login", data)
		dispatch(tokenSuccess(res.data.token))
		dispatch(setLogged())
	} catch (err) {
		if (err.response) dispatch(tokenFailure(err.response.data.error))
		else if (err.request) dispatch(tokenFailure(err.request._response))
		else dispatch(tokenFailure(err.message))
	}
}

export const getUserDetails = () => async (dispatch, getState) => {
	let token = getState().user.token.data
	dispatch(detailsStart())
	try {
		const res = await Axios.get("/user", {
			headers: { authorization: "Bearer " + token },
		})
		dispatch(detailsSuccess(res.data))
	} catch (err) {
		if (err.response) dispatch(detailsFailure(err.response.data.error))
		else if (err.request) dispatch(detailsFailure(err.request._response))
		else dispatch(detailsFailure(err.message))
	}
}
