import { actionTypes } from "./types"

const initialState = {
	logged: false,
	mode: null,
}

export const modeReducer = (state = initialState, action) => {
	let { type, payload } = action
	switch (type) {
		case actionTypes.SET_MODE:
			return {
				...state,
				mode: payload,
			}
		case actionTypes.SET_LOGGED:
			return {
				...state,
				logged: true,
			}
		case actionTypes.RESET_LOGGED:
			return {
				mode: null,
				logged: false,
			}
		default:
			return state
	}
}
