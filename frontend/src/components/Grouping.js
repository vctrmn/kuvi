/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'

import Pod from './Pod'
import Service from './Service'

const Connection = () => (
	<div
		css={{
			width: 3 + 'rem',
			height: 1.5 + 'rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		}}
	>
		<div
			css={{
				height: 100 + '%',
				borderLeft: '2px solid ' + useTheme().colorSecond
			}}
		/>
	</div>
)

const GroupingWrapper = (props) => <div css={{ display: 'flex', padding: 0.5 + 'rem', flexDirection: 'column' }} {...props} />

const GroupingContent = (props) => (
	<div css={{ display: 'flex', flexDirection: 'column', padding: 0.25 + 'rem', justifyContent: 'center', alignItems: 'center' }} {...props}></div>
)

const ConnectionsWrapper = (props) => <div css={{ display: 'flex' }} {...props}></div>

const PodsWrapper = (props) => <div css={{ display: 'flex' }} {...props}></div>

const Grouping = ({ grouping }) => {
	const renderServices = grouping?.services?.map((service) => {
		return <Service service={service} key={service?.uid} />
	})

	const renderLinks = grouping?.pods?.map((pod, item) => {
		return <Connection key={'connection' + item} />
	})

	const renderPods = grouping?.pods?.map((pod) => {
		return <Pod pod={pod} key={pod?.uid} />
	})

	return (
		<GroupingWrapper>
			{grouping?.name}
			<GroupingContent>
				{renderServices}
				<ConnectionsWrapper>{renderLinks}</ConnectionsWrapper>
				<PodsWrapper>{renderPods}</PodsWrapper>
			</GroupingContent>
		</GroupingWrapper>
	)
}

export default Grouping
