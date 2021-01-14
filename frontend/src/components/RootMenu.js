/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'

import SunIcon from '../assets/sun.svg'
import MoonIcon from '../assets/moon.svg'
import LightReload from '../assets/light-cached-24px.svg'
import DarkReload from '../assets/dark-cached-24px.svg'
import { switchToDarkTheme, switchToLightTheme, fetchNamespacesServicesPods } from '../actions'

const MenuWrapper = (props) => (
	<div
		css={{
			display: 'flex',
			flexDirection: 'column',
			padding: '1rem'
		}}
		{...props}
	/>
)

const MenuButton = (props) => (
	<button
		css={{
			display: 'flex',
			padding: '0.5rem 1rem',
			borderRadius: '0.5rem',
			border: 'none',
			backgroundColor: useTheme().backgroundColor,
			color: useTheme().color,
			cursor: 'pointer',
			transition: 'all 0.1s ease-in',
			marginBottom: '0.5rem',
			'&:hover': {
				backgroundColor: useTheme().backgroundColorSecondary
			},
			'&:active': {
				backgroundColor: useTheme().cardBackgroundColorActive
			},
			'&:focus': {
				outlineColor: useTheme().colorAccentBlue,
				outlineWidth: '2px',
				outlineStyle: 'solid'
			}
		}}
		{...props}
	/>
)

const ImageReload = (props) => (
	<motion.img
		alt="reload"
		src={props.darkTheme ? DarkReload : LightReload}
		animate={
			props.isLoading
				? {
						rotate: 360
				  }
				: {}
		}
		transition={
			props.isLoading
				? {
						duration: 1,
						ease: 'linear',
						repeat: Infinity,
						repeatDelay: 0
				  }
				: {}
		}
		{...props}
	/>
)

const ImageTheme = (props) => <img alt="theme" src={props.darkTheme ? SunIcon : MoonIcon} />

const RootMenu = () => {
	const darkTheme = useSelector((state) => state.darkTheme)
	const isLoading = useSelector((state) => state.isLoading)
	const dispatch = useDispatch()

	return (
		<MenuWrapper>
			<MenuButton onClick={() => (darkTheme ? dispatch(switchToLightTheme()) : dispatch(switchToDarkTheme()))}>
				<ImageTheme darkTheme={darkTheme} />
			</MenuButton>
			<MenuButton onClick={() => dispatch(fetchNamespacesServicesPods())}>
				<AnimatePresence>
					<ImageReload darkTheme={darkTheme} isLoading={isLoading} />
				</AnimatePresence>
			</MenuButton>
		</MenuWrapper>
	)
}

export default RootMenu
