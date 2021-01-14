/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { togglePopupElement } from '../actions'
import { motion } from 'framer-motion'
import moment from 'moment'

import DarkCloseIcon from '../assets/dark-close-24px.svg'
import LightCloseIcon from '../assets/light-close-24px.svg'

const PopupWrapper = (props) => (
	<motion.div
		css={{
			maxWidth: 42 + 'rem',
			position: 'fixed',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: 1 + 'rem',
			zIndex: 2,
			right: 0
		}}
		initial={{ opacity: 0, y: -32 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.2, ease: 'easeInOut' }}
		exit={{ opacity: 0, y: 0 }}
		{...props}
	/>
)

const PopupCard = (props) => (
	<div
		css={{
			position: 'relative',
			backgroundColor: useTheme().backgroundColorThirdary,
			padding: 1.5 + 'rem',
			borderRadius: 1 + 'rem',
			boxShadow: useTheme().boxShadow,
			display: 'flex',
			flexDirection: 'column',
			width: 100 + '%'
		}}
		{...props}
	/>
)

const PopupCardRaw = (props) => (
	<div
		css={{
			display: 'flex',
			marginTop: 0.25 + 'rem',
			marginBottom: 0.25 + 'rem'
		}}
		{...props}
	/>
)

const Key = (props) => (
	<div
		css={{
			color: useTheme().colorSecond,
			display: 'flex',
			width: 9 + 'rem'
		}}
		{...props}
	/>
)

const Value = (props) => (
	<div
		css={{
			display: 'flex',
			flexWrap: 'wrap',
			width: 100 + '%'
		}}
		{...props}
	/>
)

const Namespace = (props) => (
	<div
		css={{
			display: 'flex',
			backgroundColor: useTheme().backgroundColorSecondary,
			padding: 0.5 + 'rem ' + 1 + 'rem',
			borderRadius: 1 + 'rem'
		}}
		{...props}
	/>
)

const Label = (props) => (
	<label
		css={{
			display: 'flex',
			padding: 0.5 + 'rem ' + 1 + 'rem',
			borderRadius: 2 + 'rem',
			margin: 0.125 + 'rem',
			fontSize: 0.813 + 'rem',
			backgroundColor: useTheme().backgroundColorSecondary,
			color: useTheme().colorAccentBlue
		}}
		{...props}
	/>
)

const Ingress = (props) => (
	<label
		css={{
			display: 'flex',
			padding: 0.5 + 'rem ' + 1 + 'rem',
			borderRadius: 2 + 'rem',
			margin: 0.125 + 'rem',
			fontSize: 0.813 + 'rem',
			backgroundColor: useTheme().backgroundColorAccentPurple,
			color: useTheme().colorAccentPurple
		}}
		{...props}
	/>
)

const Container = (props) => (
	<div
		css={{
			marginBottom: 0.25 + 'rem'
		}}
		{...props}
	/>
)

const Code = (props) => (
	<div
		css={{
			fontFamily: "'Source Code Pro', monospace",
			fontSize: 0.875 + 'rem'
		}}
		{...props}
	/>
)

const GreenColorSpan = (props) => <span css={{ color: useTheme().colorAccentGreen }} {...props} />

const RedColorSpan = (props) => <span css={{ color: useTheme().colorAccentRed }} {...props} />

const YellowColorSpan = (props) => <span css={{ color: useTheme().colorAccentYellow }} {...props} />

const DefaultColorSpan = (props) => <span css={{ color: useTheme().colorSecond }} {...props} />

const CloseButton = (props) => (
	<button
		css={{
			backgroundColor: 'transparent',
			border: 'none',
			cursor: 'pointer',
			padding: 0.125 + 'rem',
			borderRadius: 3 + 'rem',
			position: 'absolute',
			top: 0.5 + 'rem',
			right: 0.5 + 'rem',
			'&:hover': {
				backgroundColor: useTheme().backgroundColorHoverRGBA
			},
			'&:active': {
				backgroundColor: useTheme().backgroundColorActiveRGBA
			}
		}}
		{...props}
	/>
)

const Popup = () => {
	const dispatch = useDispatch()
	const darkTheme = useSelector((state) => state.darkTheme)
	const popupElement = useSelector((state) => state.popupElement)

	const renderPhase = () => {
		switch (popupElement?.phase) {
			case 'Running':
				return <GreenColorSpan>{popupElement?.phase}</GreenColorSpan>
			case 'Pending':
				return <YellowColorSpan>{popupElement?.phase}</YellowColorSpan>
			case 'Error':
				return <RedColorSpan>{popupElement?.phase}</RedColorSpan>
			default:
				return <DefaultColorSpan>{popupElement?.phase}</DefaultColorSpan>
		}
	}

	const renderExec = () => {
		if (popupElement?.phase !== 'Succeeded')
			return (
				<PopupCardRaw>
					<Key>Exec</Key>
					<Value>
						<Code>
							kubectl exec {popupElement?.name} -it -n {popupElement?.namespace} -- /bin/sh
						</Code>
					</Value>
				</PopupCardRaw>
			)
	}

	const renderLoadBalancer = () => {
		if (popupElement?.loadBalancer?.ingress)
			return (
				<PopupCardRaw>
					<Key>Load Balancer</Key>
					<Value>
						{popupElement?.loadBalancer?.ingress?.map((ingress) => {
							return <Ingress key={ingress?.ip || ingress?.hostname}>{ingress?.hostname || ingress?.ip}</Ingress>
						})}
					</Value>
				</PopupCardRaw>
			)
	}

	if (popupElement?.objectType === 'Pod')
		return (
			<PopupWrapper>
				<PopupCard>
					<CloseButton onClick={() => dispatch(togglePopupElement(popupElement))}>
						<img alt="close" src={darkTheme ? DarkCloseIcon : LightCloseIcon} />
					</CloseButton>
					<PopupCardRaw>
						<Key>Namespace</Key>
						<Value>
							<Namespace>{popupElement?.namespace}</Namespace>
						</Value>
					</PopupCardRaw>
					<PopupCardRaw>
						<Key>Name</Key>
						<Value style={{ fontWeight: 'bold' }}>{popupElement?.name}</Value>
					</PopupCardRaw>
					<PopupCardRaw>
						<Key>Phase</Key>
						<Value>{renderPhase()}</Value>
					</PopupCardRaw>
					<PopupCardRaw>
						<Key>Labels</Key>
						<Value>
							{Object?.keys(popupElement?.labels).map((labelKey, index) => {
								return (
									<Label key={labelKey + '=' + Object?.values(popupElement?.labels)[index]}>
										{labelKey + '=' + Object?.values(popupElement?.labels)[index]}
									</Label>
								)
							})}
						</Value>
					</PopupCardRaw>
					<PopupCardRaw>
						<Key>Containers</Key>
						<Value css={{ flexDirection: 'column' }}>
							{popupElement?.containers?.map((container) => {
								return <Container key={container?.image + container?.name}>{container?.image}</Container>
							})}
						</Value>
					</PopupCardRaw>
					{renderExec()}
					<PopupCardRaw>
						<Key>Created</Key>
						<Value>{moment(popupElement?.creationTimestamp).fromNow()}</Value>
					</PopupCardRaw>
				</PopupCard>
			</PopupWrapper>
		)

	if (popupElement?.objectType === 'Service')
		return (
			<PopupWrapper>
				<PopupCard>
					<CloseButton onClick={() => dispatch(togglePopupElement(popupElement))}>
						<img alt="close" src={darkTheme ? DarkCloseIcon : LightCloseIcon} />
					</CloseButton>
					<PopupCardRaw>
						<Key>Namespace</Key>
						<Value>
							<Namespace>{popupElement?.namespace}</Namespace>
						</Value>
					</PopupCardRaw>
					<PopupCardRaw>
						<Key>Name</Key>
						<Value style={{ fontWeight: 'bold' }}>{popupElement?.name}</Value>
					</PopupCardRaw>
					<PopupCardRaw>
						<Key>Type</Key>
						<Value>{popupElement?.type}</Value>
					</PopupCardRaw>
					<PopupCardRaw>
						<Key>Selector</Key>
						<Value>
							{Object?.keys(popupElement?.selector).map((labelKey, index) => {
								return (
									<Label key={Object?.values(popupElement?.selector)[index]}>
										{labelKey + '=' + Object?.values(popupElement?.selector)[index]}
									</Label>
								)
							})}
						</Value>
					</PopupCardRaw>
					{renderLoadBalancer()}
					<PopupCardRaw>
						<Key>Created</Key>
						<Value>{moment(popupElement?.creationTimestamp).fromNow()}</Value>
					</PopupCardRaw>
				</PopupCard>
			</PopupWrapper>
		)

	return null
}

export default Popup
