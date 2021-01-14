/** @jsxImportSource @emotion/react */
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Cluster from './Cluster'
import Namespaces from './Namespaces'
import Nodes from './Nodes'

const RootView = () => {
	return (
		<BrowserRouter>
			<Cluster>
				<Route
					exact
					path="/"
					render={() => {
						return <Redirect to="/namespaces-services-pods" />
					}}
				/>
				<Route exact path="/namespaces-services-pods" component={Namespaces} />
				<Route exact path="/nodes" component={Nodes} />
			</Cluster>
		</BrowserRouter>
	)
}

export default RootView
