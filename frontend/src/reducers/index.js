import { combineReducers } from 'redux'
import themeReducer from './themeReducer'
import notificationsReducer from './notificationsReducer'
import namespacesReducer from './namespacesReducer'
import loadingReducer from './loadingReducer'
import popupReducer from './popupReducer'

export default combineReducers({
	darkTheme: themeReducer,
	notifications: notificationsReducer,
	namespaces: namespacesReducer,
	isLoading: loadingReducer,
	popupElement: popupReducer
})
