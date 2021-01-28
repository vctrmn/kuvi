import { KubernetesObject, KubernetesListObject, V1Pod } from '@kubernetes/client-node'

type Container = {
	image?: string
	name?: string
}

export type Pod = {
	objectType: string
	uid?: string
	name?: string
	namespace?: string
	creationTimestamp?: Date
	/* eslint-disable @typescript-eslint/no-explicit-any*/
	labels?: any
	phase?: string
	containers?: Array<Container>
	hostIP?: string
	podIP?: string
	nodeName?: string
	bound: boolean
}

export const filterPods = (defaultListPodsRepsonse: KubernetesListObject<KubernetesObject>): Array<Pod> => {
	return defaultListPodsRepsonse.items.map((pod: V1Pod) => {
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
}
