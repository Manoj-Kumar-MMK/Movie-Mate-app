import { combineReducers } from "redux"
import { modeReducer } from "./mode/reducer"
import { userReducer } from "./user/reducer"
import { studioReducer } from "./studio/reducer"

export const rootReducer = combineReducers({
	mode: modeReducer,
	user: userReducer,
	studio: studioReducer,
})
