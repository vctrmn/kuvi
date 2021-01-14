/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNamespacesServicesPods } from '../actions'
import Namespace from './Namespace'

const NamespacesWrapper = (props) => <div css={{ display: 'flex', flexWrap: 'wrap', width: 100 + '%' }} {...props} />

const Namespaces = () => {
	const dispatch = useDispatch()

	const { namespaces } = useSelector((state) => ({
		namespaces: state.namespaces
	}))

	useEffect(() => {
		dispatch(fetchNamespacesServicesPods())
	}, [dispatch])

	const renderNamespaces = namespaces.map((namespace, index) => {
		return <Namespace key={namespace.uid} namespace={namespace} index={index} />
	})

	return (
		<NamespacesWrapper>
			<AnimatePresence>{renderNamespaces}</AnimatePresence>
		</NamespacesWrapper>
	)
}

export default Namespaces
