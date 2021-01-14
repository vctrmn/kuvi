/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { togglePopupElement } from '../actions'

const PodWrapper = (props) => (
	<div
		css={{
			backgroundColor: useTheme().backgroundColor,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 50 + '%',
			height: 3 + 'rem',
			width: 3 + 'rem',
			position: 'relative'
		}}
		{...props}
	/>
)

const PodLabel = (props) => (
	<label
		css={{
			position: 'absolute',
			backgroundColor: useTheme().backgroundColorThirdary,
			padding: 0.5 + 'rem ' + 0.75 + 'rem',
			borderRadius: 0.5 + 'rem',
			fontSize: 0.875 + 'rem',
			top: 3.125 + 'rem',
			whiteSpace: 'nowrap',
			display: 'none',
			zIndex: 1
		}}
		{...props}
	/>
)

const PodStyle = {
	height: 75 + '%',
	width: 75 + '%',
	borderRadius: 50 + '%',
	cursor: 'pointer',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexWrap: 'wrap',
	padding: 0.125 + 'rem',
	'&:hover': {
		opacity: 0.7
	},
	'&:active': {
		opacity: 0.4
	},
	'&:hover + label': {
		display: 'flex'
	}
}

const PodRunning = (props) => (
	<div
		css={{
			backgroundColor: useTheme().colorAccentGreen,
			...PodStyle
		}}
		{...props}
	/>
)

const PodPending = (props) => (
	<div
		css={{
			backgroundColor: useTheme().colorAccentYellow,
			...PodStyle
		}}
		{...props}
	/>
)

const PodError = (props) => (
	<div
		css={{
			backgroundColor: useTheme().colorAccentRed,
			...PodStyle
		}}
		{...props}
	/>
)

const PodDefault = (props) => (
	<div
		css={{
			backgroundColor: useTheme().colorAccentGray,
			...PodStyle
		}}
		{...props}
	/>
)

const Container = (props) => (
	<div
		css={{
			backgroundColor: useTheme().backgroundColor,
			height: 17.5 + '%',
			width: 35 + '%',
			margin: 0.125 + 'rem',
			borderRadius: 0.075 + 'rem'
		}}
		{...props}
	/>
)

const Pod = ({ pod }) => {
	const dispatch = useDispatch()

	const renderContainers = pod?.containers?.map((container) => {
		return <Container key={container?.image + container?.name} />
	})

	switch (pod?.phase) {
		case 'Running':
			return (
				<PodWrapper onClick={() => dispatch(togglePopupElement(pod))}>
					<PodRunning>{renderContainers}</PodRunning>
					<PodLabel>{pod?.name}</PodLabel>
				</PodWrapper>
			)
		case 'Pending':
			return (
				<PodWrapper onClick={() => dispatch(togglePopupElement(pod))}>
					<PodPending>{renderContainers}</PodPending>
					<PodLabel>{pod?.name}</PodLabel>
				</PodWrapper>
			)
		case 'Error':
			return (
				<PodWrapper onClick={() => dispatch(togglePopupElement(pod))}>
					<PodError>{renderContainers}</PodError>
					<PodLabel>{pod?.name}</PodLabel>
				</PodWrapper>
			)
		default:
			return (
				<PodWrapper onClick={() => dispatch(togglePopupElement(pod))}>
					<PodDefault>{renderContainers}</PodDefault>
					<PodLabel>{pod?.name}</PodLabel>
				</PodWrapper>
			)
	}
}

export default Pod
