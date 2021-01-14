const lightTheme = {
	boxShadow: '0 0px 12px -6px rgba(0, 24, 40, 0.25)',
	color: '#425466',
	colorSecond: '#607a94',
	backgroundColor: '#f6f9fc',
	backgroundColorSecondary: 'rgba(66, 133, 244, 0.1)',
	backgroundColorThirdary: '#ffffff',
	colorAccentBlue: '#4285F4',
	colorAccentRed: '#EA4335',
	colorAccentGreen: '#25d383',
	colorAccentYellow: '#FBBC05',
	colorAccentGray: '#8399af',
	colorAccentPurple: '#9966ff',
	backgroundColorAccentPurple: 'rgba(153, 102, 255, 0.15)',
	backgroundColorHoverRGBA: 'rgba(0, 0, 0, 0.05)',
	backgroundColorActiveRGBA: 'rgba(0, 0, 0, 0.1)'
}

const darkTheme = {
	boxShadow: '0 0px 12px -6px rgba(0, 24, 40, 0.25)',
	color: '#ccd6e0',
	colorSecond: '#95aabd',
	backgroundColor: '#090b10',
	backgroundColorSecondary: '#252F40',
	backgroundColorThirdary: '#121720',
	colorAccentBlue: '#72a4f7',
	colorAccentRed: '#f0756a',
	colorAccentGreen: '#52e19f',
	colorAccentYellow: '#fcd152',
	colorAccentGray: '#425466',
	colorAccentPurple: '#c0a1ff',
	backgroundColorAccentPurple: 'rgba(192, 161, 255, 0.15)',
	backgroundColorHoverRGBA: 'rgba(255, 255, 255, 0.2)',
	backgroundColorActiveRGBA: 'rgba(255, 255, 255, 0.4)'
}

const theme = (mode) => (mode === 'dark' ? darkTheme : lightTheme)

export default theme
