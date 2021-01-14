/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'

const ClusterWrapper = (props) => (
	<div
		css={{
			display: 'flex',
			alignSelf: 'baseline',
			width: 100 + '%',
			padding: 0.5 + 'rem',
			margin: '2rem 1rem 1rem 0rem',
			border: 'solid 2px ' + useTheme().colorAccentBlue,
			borderRadius: 2 + 'rem'
		}}
		{...props}
	/>
)

const Cluster = ({ children }) => {
	return <ClusterWrapper>{children}</ClusterWrapper>
}

export default Cluster
