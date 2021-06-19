import { actionTypes } from "./types"

const initialState = {
	token: {
		loading: false,
		data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwY2UyODAyMTk4ODcyMDAyMDAwMjYwZSIsImVtYWlsIjoidGVtcEBnbWFpbC5jb20iLCJpYXQiOjE2MjQxMjMzOTQsImV4cCI6MTYyNDIwOTc5NH0.g1Sm19PLbHdRjQ1_NVK31LkSW0aoVZ2d2fnkVdb_dW0",
		error: null,
	},
	details: {
		loading: false,
		data: null,
		error: null,
	},
}

export const userReducer = (state = initialState, action) => {
	let { type, payload } = action
	switch (type) {
		case actionTypes.DETAILS_START:
			return {
				...state,
				details: { loading: true, data: null, error: null },
			}

		case actionTypes.DETAILS_SUCCESS:
			return {
				...state,
				details: { loading: false, data: payload, error: null },
			}

		case actionTypes.DETAILS_FAILURE:
			return {
				...state,
				details: { loading: false, data: null, error: payload },
			}
		case actionTypes.TOKEN_START:
			return {
				...state,
				token: { loading: true, data: null, error: null },
			}

		case actionTypes.TOKEN_SUCCESS:
			return {
				...state,
				token: { loading: false, data: payload, error: null },
			}

		case actionTypes.TOKEN_FAILURE:
			return {
				...state,
				token: { loading: false, data: null, error: payload },
			}
		case actionTypes.RESET:
			return {
				...initialState,
			}
		default:
			return state
	}
}
