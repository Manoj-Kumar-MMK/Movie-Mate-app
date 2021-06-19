import { actionTypes } from "./types"

const initialState = {
	token: {
		loading: false,
		data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwY2IyNDY3YmFmMWQ5MDAyMGE5NWU3YiIsImVtYWlsIjoibmV0ZmxpeEBnbWFpbC5jb20iLCJpYXQiOjE2MjM5MzMyMDN9.amIvs9PNhtkjiJ_M44D8mJOKX9ctK1Xw8UWJlDwA33o",
		error: null,
	},
	details: {
		loading: false,
		data: null,
		error: null,
	},
}

export const studioReducer = (state = initialState, action) => {
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
