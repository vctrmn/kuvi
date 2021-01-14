/** @jsxImportSource @emotion/react */
import React from 'react'
import { useTheme } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from '../actions'

const NotificationsWrapper = (props) => (
	<div
		css={{
			display: 'flex',
			flexDirection: 'column',
			position: 'fixed',
			alignItems: 'center',
			right: 0,
			left: 0,
			bottom: 0,
			padding: 2 + 'rem'
		}}
		{...props}
	/>
)

const Notification = (props) => (
	<motion.div
		css={{
			display: 'flex',
			marginTop: 0.5 + 'rem',
			width: 'fit-content',
			backgroundColor: useTheme().backgroundColorThirdary,
			padding: 1 + 'rem ' + 1.5 + 'rem',
			borderRadius: 1 + 'rem',
			boxShadow: useTheme().boxShadow
		}}
		initial={{ opacity: 0, y: 32 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.2, ease: 'easeInOut' }}
		exit={{ opacity: 0, y: 0 }}
		{...props}
	/>
)

const Notifications = () => {
	const dispatch = useDispatch()

	const { notifications } = useSelector((state) => ({
		notifications: state.notifications
	}))

	const renderNotifications = notifications.map((notification) => {
		setTimeout(() => {
			dispatch(removeNotification(notification.uid))
		}, 5000)
		return <Notification key={notification.uid}>{notification.message}</Notification>
	})

	if (notifications.length > 0)
		return (
			<NotificationsWrapper>
				<AnimatePresence>{renderNotifications}</AnimatePresence>
			</NotificationsWrapper>
		)

	return <div></div>
}

export default Notifications
