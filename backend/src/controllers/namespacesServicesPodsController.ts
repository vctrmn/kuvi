import { NextFunction, Request, Response, Router } from 'express'
import * as k8s from '@kubernetes/client-node'
import { filterPods } from '../services/podService'
import { filterServices } from '../services/serviceService'
import { generateGroupingsV1 } from '../services/groupingService'
import { generateNamespacesServicesPods } from '../services/namespaceService'

const router: Router = Router()

// Instantiate K8S client
const kc = new k8s.KubeConfig()
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

router.get('/namespaces-services-pods', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const [resultListPods, resultListServices, resultListNamespaces] = await Promise.all([
			k8sApi.listPodForAllNamespaces(),
			k8sApi.listServiceForAllNamespaces(),
			k8sApi.listNamespace()
		])

		const pods = filterPods(resultListPods.body)

		const services = filterServices(resultListServices.body)

		const groupings = generateGroupingsV1(pods, services)

		const namespacesServicesPods = generateNamespacesServicesPods(
			resultListNamespaces.body,
			pods,
			services,
			groupings
		)

		res.status(200).send(namespacesServicesPods)
	} catch (e) {
		next(e)
	}
})

export default router
