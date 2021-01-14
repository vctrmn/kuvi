import { ADD_ACTIVE_ELEMENT, REMOVE_ACTIVE_ELEMENT } from '../actions'

const popupReducer = (state = null, action) => {
	switch (action.type) {
		case ADD_ACTIVE_ELEMENT:
			return action?.payload
		case REMOVE_ACTIVE_ELEMENT:
			return null
		default:
			return state
	}
}

export default popupReducer
