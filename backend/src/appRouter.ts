import path from 'path'
import { Application, Request, Response } from 'express'
import healthzController from './controllers/healthzController'
import namespacesServicesPodsController from './controllers/namespacesServicesPodsController'

const prePath = '/api'

export default (app: Application): void => {
	app.use(prePath, healthzController)
	app.use(prePath, namespacesServicesPodsController)

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	app.get('*', (req: Request, res: Response) => {
		res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
	})
}
