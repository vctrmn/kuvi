import { FETCH_NAMESPACES_SERVICES_PODS } from '../actions'

const namespacesReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_NAMESPACES_SERVICES_PODS:
			return action.payload
		default:
			return state
	}
}

export default namespacesReducer
