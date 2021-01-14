import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions'
import { v4 as uuidv4 } from 'uuid'

const notificationsReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_NOTIFICATION:
			return [...state, { ...action.payload, uid: uuidv4() }]
		case REMOVE_NOTIFICATION:
			return state.filter((notification) => notification.uid !== action.payload.uid)
		default:
			return state
	}
}

export default notificationsReducer
