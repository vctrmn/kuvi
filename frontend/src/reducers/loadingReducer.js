import { FETCH_NAMESPACES_SERVICES_PODS, ADD_NOTIFICATION, IS_LOADING } from '../actions'

const loadingReducer = (state = false, action) => {
	switch (action.type) {
		case IS_LOADING:
			return true
		case FETCH_NAMESPACES_SERVICES_PODS:
			return false
		case ADD_NOTIFICATION:
			return false
		default:
			return state
	}
}

export default loadingReducer
