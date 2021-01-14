/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'

import RootMenu from './RootMenu'
import RootView from './RootView'
import Notifications from './Notifications'
import Popup from './Popup'

const AppWrapper = (props) => (
	<div
		css={{
			display: 'flex',
			height: 100 + '%',
			minHeight: 100 + 'vh',
			backgroundColor: useTheme().backgroundColor,
			color: useTheme().color,
			fontFamily: "'sohne-var','Helvetica Neue','Arial',sans-serif",
			letterSpacing: 0.04 + 'em',
			margin: 0,
			transition: 'all 0.1s ease-in'
		}}
		{...props}
	/>
)

const App = () => {
	return (
		<AppWrapper>
			<RootMenu />
			<RootView />
			<Notifications />
			<Popup />
		</AppWrapper>
	)
}

export default App
