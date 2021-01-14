import { SWITCH_TO_DARK_THEME, SWITCH_TO_LIGHT_THEME } from '../actions'

const themeReducer = (state = true, action) => {
	switch (action.type) {
		case SWITCH_TO_DARK_THEME:
			return true
		case SWITCH_TO_LIGHT_THEME:
			return false
		default:
			return state
	}
}

export default themeReducer
