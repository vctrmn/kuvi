import React, { useEffect } from 'react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { switchToLightTheme } from '../actions'
import theme from '../theme.js'

const ThemeProvider = ({ children }) => {
	const darkTheme = useSelector((state) => state.darkTheme)
	const dispatch = useDispatch()

	useEffect(() => {
		const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
		if (!isDarkTheme) {
			dispatch(switchToLightTheme())
		}
	}, [])
	const computedTheme = darkTheme ? theme('dark') : theme('light')
	return <EmotionThemeProvider theme={computedTheme}>{children}</EmotionThemeProvider>
}

export default ThemeProvider
