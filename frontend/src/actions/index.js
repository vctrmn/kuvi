import axios from 'axios'

export const SWITCH_TO_DARK_THEME = 'SWITCH_TO_DARK_THEME'
export const SWITCH_TO_LIGHT_THEME = 'SWITCH_TO_LIGHT_THEME'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const FETCH_NAMESPACES_SERVICES_PODS = 'FETCH_NAMESPACES_SERVICES_PODS'
export const IS_LOADING = 'IS_LOADING'
export const ADD_ACTIVE_ELEMENT = 'ADD_ACTIVE_ELEMENT'
export const REMOVE_ACTIVE_ELEMENT = 'REMOVE_ACTIVE_ELEMENT'

export const switchToDarkTheme = () => (dispatch) => {
	try {
		localStorage.setItem('darkTheme', JSON.stringify(true))
		dispatch({ type: SWITCH_TO_DARK_THEME })
	} catch (error) {
		dispatch({
			type: ADD_NOTIFICATION,
			payload: { type: 'error', from: SWITCH_TO_DARK_THEME, message: 'Error while switching to dark theme.' }
		})
	}
}

export const switchToLightTheme = () => (dispatch) => {
	try {
		localStorage.setItem('darkTheme', JSON.stringify(false))
		dispatch({ type: SWITCH_TO_LIGHT_THEME })
	} catch (error) {
		dispatch({
			type: ADD_NOTIFICATION,
			payload: { type: 'error', from: SWITCH_TO_LIGHT_THEME, message: 'Error while switching to light theme.' }
		})
	}
}

export const removeNotification = (notificationUid) => (dispatch) => {
	dispatch({ type: REMOVE_NOTIFICATION, payload: { uid: notificationUid } })
}

export const fetchNamespacesServicesPods = () => async (dispatch) => {
	try {
		dispatch({ type: IS_LOADING })
		const res = await axios.get('/api/namespaces-services-pods')
		dispatch({ type: FETCH_NAMESPACES_SERVICES_PODS, payload: res.data })
	} catch (error) {
		if (error?.response?.status === 522) {
			dispatch({
				type: ADD_NOTIFICATION,
				payload: { type: 'error', from: FETCH_NAMESPACES_SERVICES_PODS, message: 'Backend request timed out.' }
			})
		} else {
			dispatch({
				type: ADD_NOTIFICATION,
				payload: {
					type: 'error',
					from: FETCH_NAMESPACES_SERVICES_PODS,
					message: 'Error while fetching data (namespaces, services and pods).'
				}
			})
		}
	}
}

export const togglePopupElement = (element) => (dispatch, getState) => {
	if (getState().popupElement === element) {
		dispatch({ type: REMOVE_ACTIVE_ELEMENT })
	} else {
		dispatch({ type: ADD_ACTIVE_ELEMENT, payload: element })
	}
}
