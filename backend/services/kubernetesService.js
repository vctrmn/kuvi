const k8s = require('@kubernetes/client-node')

module.exports = (app) => {
	// Instantiate K8S client
	const kc = new k8s.KubeConfig()
	kc.loadFromDefault()
	const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
	const isNil = (x) => x === null || x === undefined

	app.get('/api/namespaces', async (req, res) => {
		try {
			const [resultListPods, resultListServices, resultListNamespaces] = await Promise.all([
				k8sApi.listPodForAllNamespaces(),
				k8sApi.listServiceForAllNamespaces(),
				k8sApi.listNamespace()
			])

			const pods = resultListPods.body.items.map((pod) => {
				return {
					objectType: 'Pod',
					uid: pod?.metadata?.uid,
					name: pod?.metadata?.name,
					namespace: pod?.metadata?.namespace,
					creationTimestamp: pod?.metadata?.creationTimestamp,
					labels: pod?.metadata?.labels,
					phase: pod?.status?.phase,
					containers: pod?.spec?.containers?.map((container) => {
						return {
							image: container?.image,
							name: container?.name
						}
					}),
					hostIP: pod?.status?.hostIP,
					podIP: pod?.status?.podIP,
					nodeName: pod?.spec?.nodeName,
					bound: false
				}
			})

			const services = resultListServices.body.items.map((service) => {
				return {
					objectType: 'Service',
					uid: service?.metadata?.uid,
					name: service?.metadata?.name,
					namespace: service?.metadata?.namespace,
					creationTimestamp: service?.metadata?.creationTimestamp,
					selector: service?.spec?.selector,
					type: service?.spec?.type,
					clusterIP: service?.spec?.clusterIP,
					ports: service?.spec?.ports,
					loadBalancer: service?.status?.loadBalancer,
					bound: false
				}
			})

			const groupings = []
			for (let i = 0; i < services?.length; i++) {
				if (services[i]?.selector) {
					const grouping = {
						name: Object.values(services[i]?.selector)[0],
						namespace: services[i]?.namespace,
						services: [services[i]],
						pods: []
					}
					let boundIndex = null
					for (let j = 0; j < pods?.length; j++) {
						if (services[i]?.namespace === pods[j]?.namespace) {
							for (let k = 0; k < Object.keys(pods[j]?.labels)?.length; k++) {
								if (
									Object.keys(pods[j]?.labels)[k] === Object.keys(services[i]?.selector)[0] &&
									Object.values(pods[j]?.labels)[k] === Object.values(services[i]?.selector)[0]
								) {
									if (pods[j].bound) {
										boundIndex = groupings.findIndex(
											(elementGrouping) => elementGrouping.name === grouping.name
										)
									} else {
										pods[j].bound = true
										grouping.pods.push(pods[j])
									}
								}
							}
						}
					}
					if (boundIndex) {
						services[i].bound = true
						groupings[boundIndex].services.push(services[i])
					} else if (grouping.pods.length > 0) {
						services[i].bound = true
						groupings.push(grouping)
					}
				}
			}

			const namespaces = resultListNamespaces.body.items.map((namespace) => {
				return {
					uid: namespace?.metadata?.uid,
					name: namespace?.metadata?.name,
					groupings: groupings.filter((grouping) => namespace?.metadata?.name === grouping?.namespace),
					services: services.filter(
						(service) => !service?.bound && namespace?.metadata?.name === service?.namespace
					),
					pods: pods.filter((pod) => !pod?.bound && namespace?.metadata?.name === pod?.namespace)
				}
			})

			res.status(200).send(namespaces)
		} catch (error) {
			console.error(error)
			if (error?.code === 'ETIMEDOUT') {
				res.status(522).send()
			} else {
				res.status(500).send(error)
			}
		}
	})

	app.get('/api/nodes', async (req, res) => {
		try {
			const [resultListPods, resultListNodes] = await Promise.all([
				k8sApi.listPodForAllNamespaces(),
				k8sApi.listNode()
			])

			const pods = resultListPods.body.items.map((pod) => {
				return {
					objectType: 'Pod',
					uid: pod?.metadata?.uid,
					name: pod?.metadata?.name,
					namespace: pod?.metadata?.namespace,
					creationTimestamp: pod?.metadata?.creationTimestamp,
					labels: pod?.metadata?.labels,
					phase: pod?.status?.phase,
					containers: pod?.spec?.containers?.map((container) => {
						return {
							image: container?.image,
							name: container?.name
						}
					}),
					hostIP: pod?.status?.hostIP,
					podIP: pod?.status?.podIP,
					nodeName: pod?.spec?.nodeName,
					bound: false
				}
			})

			const nodes = resultListNodes.body.items.map((node) => {
				return {
					uid: node?.metadata?.uid,
					name: node?.metadata?.name,
					creationTimestamp: node?.metadata?.creationTimestamp,
					addresses: node?.status?.addresses,
					allocatable: node?.status?.allocatable,
					capacity: node?.status?.capacity,
					containerRuntimeVersion: node?.status?.nodeInfo?.containerRuntimeVersion,
					kubeProxyVersion: node?.status?.nodeInfo?.kubeProxyVersion,
					kubeletVersion: node?.status?.nodeInfo?.kubeletVersion,
					osImage: node?.status?.nodeInfo?.osImage,
					pods: pods?.filter((pod) => node?.metadata?.name === pod?.nodeName)
				}
			})

			res.status(200).send(nodes)
		} catch (error) {
			console.error(error)
			if (error?.code === 'ETIMEDOUT') {
				res.status(522).send()
			} else {
				res.status(500).send(error)
			}
		}
	})

	app.get('/api/test', async (req, res) => {
		try {
			const [result] = await Promise.all([k8sApi.listServiceForAllNamespaces()])

			res.status(200).send(result.body.items)
		} catch (error) {
			console.error(error)
			if (error?.code === 'ETIMEDOUT') {
				res.status(522).send()
			} else {
				res.status(500).send(error)
			}
		}
	})
}
