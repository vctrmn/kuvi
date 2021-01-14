/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { motion } from 'framer-motion'
import Grouping from './Grouping'
import Pod from './Pod'
import Service from './Service'

const NamespaceWrapper = (props) => (
	<motion.div
		css={{ backgroundColor: useTheme().backgroundColorSecondary, padding: 1 + 'rem', borderRadius: 1 + 'rem', margin: 0.5 + 'rem', height: 'fit-content' }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ delay: 0.1 * props.index, duration: 0.2, ease: 'easeInOut' }}
		exit={{ opacity: 0 }}
		{...props}
	/>
)

const NamespaceContent = (props) => (
	<div css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', color: useTheme().colorSecond }} {...props} />
)

const Wrapper = (props) => <div css={{ margin: 0.5 + 'rem' }} {...props} />

const Namespace = ({ namespace, index }) => {
	const renderGroupings = namespace?.groupings?.map((grouping) => {
		return <Grouping key={grouping?.name + grouping?.namespace} grouping={grouping} />
	})

	const renderPods = namespace?.pods?.map((pod) => {
		return (
			<Wrapper key={pod?.uid}>
				<Pod pod={pod} />
			</Wrapper>
		)
	})

	const renderServices = namespace?.services?.map((service) => {
		return (
			<Wrapper key={service?.uid}>
				<Service service={service} />
			</Wrapper>
		)
	})

	return (
		<NamespaceWrapper index={index}>
			{namespace.name}
			<NamespaceContent>
				{renderServices}
				{renderGroupings}
				{renderPods}
			</NamespaceContent>
		</NamespaceWrapper>
	)
}

export default Namespace
