import { KubernetesObject, KubernetesListObject, V1Namespace } from '@kubernetes/client-node'
import { Pod } from './podService'
import { Service } from './serviceService'
import { GroupingV1 } from './groupingService'

type NamespaceServicesPodsGroupings = {
	uid?: string
	name?: string
	groupings: Array<GroupingV1>
	services: Array<Service>
	pods: Array<Pod>
}

export const generateNamespacesServicesPods = (
	defaultListNamespacesRepsonse: KubernetesListObject<KubernetesObject>,
	pods: Array<Pod>,
	services: Array<Service>,
	groupings: Array<GroupingV1>
): Array<NamespaceServicesPodsGroupings> => {
	return defaultListNamespacesRepsonse.items.map((namespace: V1Namespace) => {
		return {
			uid: namespace?.metadata?.uid,
			name: namespace?.metadata?.name,
			groupings: groupings.filter((grouping) => namespace?.metadata?.name === grouping?.namespace),
			services: services.filter((service) => !service?.bound && namespace?.metadata?.name === service?.namespace),
			pods: pods.filter((pod) => !pod?.bound && namespace?.metadata?.name === pod?.namespace)
		}
	})
}
