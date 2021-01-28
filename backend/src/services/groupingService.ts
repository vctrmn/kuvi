import { Pod } from './podService'
import { Service } from './serviceService'

export type GroupingV1 = {
	name: string
	namespace?: string
	services: Array<Service>
	pods: Array<Pod>
}

export const generateGroupingsV1 = (pods: Array<Pod>, services: Array<Service>): Array<GroupingV1> => {
	const groupings: Array<GroupingV1> = []
	for (let i = 0; i < services?.length; i++) {
		if (services[i]?.selector) {
			const grouping: GroupingV1 = {
				name: String(Object.values(services[i]?.selector)[0]),
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
	return groupings
}
