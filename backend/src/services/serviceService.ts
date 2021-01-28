import {
	KubernetesObject,
	KubernetesListObject,
	V1Service,
	V1ServicePort,
	V1LoadBalancerStatus
} from '@kubernetes/client-node'

export type Service = {
	objectType: string
	uid?: string
	name?: string
	namespace?: string
	creationTimestamp?: Date
	/* eslint-disable @typescript-eslint/no-explicit-any*/
	selector?: any
	type?: string
	clusterIP?: string
	ports?: V1ServicePort[]
	loadBalancer?: V1LoadBalancerStatus
	bound: boolean
}

export const filterServices = (defaultListServicesResponse: KubernetesListObject<KubernetesObject>): Array<Service> => {
	return defaultListServicesResponse.items.map((service: V1Service) => {
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
}
