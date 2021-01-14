/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { togglePopupElement } from '../actions'

const ServiceLabel = (props) => (
	<label
		css={{
			position: 'absolute',
			backgroundColor: useTheme().backgroundColorThirdary,
			padding: 0.5 + 'rem ' + 0.75 + 'rem',
			borderRadius: 0.5 + 'rem',
			fontSize: 0.875 + 'rem',
			top: 1.5 + 'rem',
			whiteSpace: 'nowrap',
			display: 'none',
			zIndex: 1
		}}
		{...props}
	/>
)

const ServiceWrapperStyle = {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	width: 100 + '%',
	minWidth: 3 + 'rem',
	borderRadius: 0.5 + 'rem',
	cursor: 'pointer',
	marginTop: 0.25 + 'rem',
	'&:hover > label': {
		display: 'flex'
	}
}

const ServiceWrapper = (props) => (
	<div
		css={{
			...ServiceWrapperStyle,
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

const ServiceWrapperLoadBalancerAndNodePort = (props) => (
	<div
		css={{
			...ServiceWrapperStyle,
			backgroundColor: useTheme().backgroundColor,
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

const DashedPartStyle = {
	display: 'flex',
	width: 100 + '%',
	height: 0.5 + 'rem',
	borderTopLeftRadius: 0.5 + 'rem',
	borderTopRightRadius: 0.5 + 'rem'
}

const SolidPartStyle = {
	display: 'flex',
	width: 100 + '%',
	height: 0.5 + 'rem',
	borderBottomLeftRadius: 0.5 + 'rem',
	borderBottomRightRadius: 0.5 + 'rem'
}

const DashedPartClusterIP = (props) => (
	<div
		css={{
			...DashedPartStyle,
			borderLeft: 0.125 + 'rem dashed ' + useTheme().colorSecond,
			borderTop: 0.125 + 'rem dashed ' + useTheme().colorSecond,
			borderRight: 0.125 + 'rem dashed ' + useTheme().colorSecond
		}}
		{...props}
	/>
)

const SolidPartClusterIP = (props) => (
	<div
		css={{
			...SolidPartStyle,
			borderLeft: 0.125 + 'rem solid ' + useTheme().colorSecond,
			borderBottom: 0.125 + 'rem solid ' + useTheme().colorSecond,
			borderRight: 0.125 + 'rem solid ' + useTheme().colorSecond
		}}
		{...props}
	/>
)

const DashedPartNodePort = (props) => (
	<div
		css={{
			...DashedPartStyle,
			borderLeft: 0.125 + 'rem dashed ' + useTheme().colorAccentYellow,
			borderTop: 0.125 + 'rem dashed ' + useTheme().colorAccentYellow,
			borderRight: 0.125 + 'rem dashed ' + useTheme().colorAccentYellow
		}}
		{...props}
	/>
)

const SolidPartNodePort = (props) => (
	<div
		css={{
			...SolidPartStyle,
			borderLeft: 0.125 + 'rem solid ' + useTheme().colorAccentYellow,
			borderBottom: 0.125 + 'rem solid ' + useTheme().colorAccentYellow,
			borderRight: 0.125 + 'rem solid ' + useTheme().colorAccentYellow
		}}
		{...props}
	/>
)

const DashedPartLoadBalancer = (props) => (
	<div
		css={{
			...DashedPartStyle,
			borderLeft: 0.125 + 'rem dashed ' + useTheme().colorAccentPurple,
			borderTop: 0.125 + 'rem dashed ' + useTheme().colorAccentPurple,
			borderRight: 0.125 + 'rem dashed ' + useTheme().colorAccentPurple
		}}
		{...props}
	/>
)

const SolidPartLoadBalancer = (props) => (
	<div
		css={{
			...SolidPartStyle,
			borderLeft: 0.125 + 'rem solid ' + useTheme().colorAccentPurple,
			borderBottom: 0.125 + 'rem solid ' + useTheme().colorAccentPurple,
			borderRight: 0.125 + 'rem solid ' + useTheme().colorAccentPurple
		}}
		{...props}
	/>
)

const ServiceWrapperExternalAcces = (props) => (
	<div
		css={{
			display: 'flex',
			width: 100 + '%',
			justifyContent: 'center'
		}}
		{...props}
	/>
)

const ExternalAcces = (props) => (
	<div
		css={{
			position: 'absolute',
			background: useTheme().backgroundColor,
			marginTop: 2 + 'rem',
			borderTop: 0.125 + 'rem dashed ' + props.color,
			top: 0,
			display: 'flex',
			justifyContent: 'space-around'
		}}
		{...props}
	/>
)

const ExternalLabel = (props) => (
	<label
		css={{
			fontSize: 0.875 + 'rem',
			cursor: 'text',
			padding: 0.25 + 'rem',
			marginTop: -2 + 'rem',
			color: useTheme().colorSecond
		}}
		{...props}
	/>
)

const Service = ({ service }) => {
	const dispatch = useDispatch()
	const yellow = useTheme().colorAccentYellow
	const purple = useTheme().colorAccentPurple

	const renderIngress = service?.loadBalancer?.ingress?.map((ingress, index) => {
		if (ingress?.hostname) return <ExternalLabel key={ingress?.hostname}>{ingress?.hostname}</ExternalLabel>
		return (
			<ExternalLabel key={ingress?.ip}>
				{ingress?.ip}:{service?.ports[index]?.port}
			</ExternalLabel>
		)
	})

	const renderPorts = service?.ports?.map((port) => {
		return <ExternalLabel key={port?.nodePort}>:{port?.nodePort}</ExternalLabel>
	})

	switch (service?.type) {
		case 'LoadBalancer':
			return (
				<ServiceWrapperExternalAcces>
					<ServiceWrapperLoadBalancerAndNodePort onClick={() => dispatch(togglePopupElement(service))}>
						<DashedPartLoadBalancer />
						<SolidPartLoadBalancer />
						<ServiceLabel>{service?.name}</ServiceLabel>
					</ServiceWrapperLoadBalancerAndNodePort>
					<ExternalAcces color={purple}>{renderIngress}</ExternalAcces>
				</ServiceWrapperExternalAcces>
			)
		case 'NodePort':
			return (
				<ServiceWrapperExternalAcces>
					<ServiceWrapperLoadBalancerAndNodePort onClick={() => dispatch(togglePopupElement(service))}>
						<DashedPartNodePort />
						<SolidPartNodePort />
						<ServiceLabel>{service?.name}</ServiceLabel>
					</ServiceWrapperLoadBalancerAndNodePort>
					<ExternalAcces color={yellow}>{renderPorts}</ExternalAcces>
				</ServiceWrapperExternalAcces>
			)
		default:
			return (
				<ServiceWrapper onClick={() => dispatch(togglePopupElement(service))}>
					<DashedPartClusterIP />
					<SolidPartClusterIP />
					<ServiceLabel>{service?.name}</ServiceLabel>
				</ServiceWrapper>
			)
	}
}

export default Service
