<template>
	<UIStack direction="col" class="w-64 bg-gray-850">
		<h2 v-show="false">Civilizations</h2>
		<UIStack direction="row" alignment="center" class="my-2 px-4">
			<FilterFocus v-model:selected="filterFocus" />
		</UIStack>
		<div class="w-full px-4 flex-gro overflow-y-scroll">
			<template v-for="[header, civs] in filteredCivs">
				<FilterList :key="header" :header="header" :civs="civs" :isFiltered="!!filterFocus" />
			</template>
		</div>
	</UIStack>
</template>

<script setup lang="ts">
import { computed, ref, Ref } from 'vue'

import { CivData, Focus } from '/@/assets/types'
import civEntries from '/@/assets/generated/civs'

import UIStack from '/@/views/ui/Stack.vue'
import FilterFocus from './FilterFocus.vue'
import FilterList from './FilterList.vue'
export default { components: { FilterFocus, FilterList, UIStack } }

export const filterFocus: Ref<keyof typeof Focus | ''> = ref('')

function sortByName (a: {name: string}, b: {name: string}): number {
	return a.name.localeCompare(b.name)
}

export const filteredCivs = computed(() => {
	const focusFilter = filterFocus.value ? Focus[filterFocus.value] : null
	const results: [string, CivData[]][] = [ ['team', []], ['primary', []], ['secondary', []] ]
	if (!focusFilter) {
		results[1][1] = civEntries.slice(1)
	} else {
		for (const civ of civEntries) {
			let priorityIndex
			if (civ.focuses.team.includes(focusFilter)) {
				priorityIndex = 0
			} else if (civ.focuses.primary.includes(focusFilter)) {
				priorityIndex = 1
			} else if (civ.focuses.secondary.includes(focusFilter)) {
				priorityIndex = 2
			}
			if (priorityIndex !== undefined) {
				results[priorityIndex][1].push(civ)
			}
		}
	}
	return results.filter(([header, civs]) => civs.length)
})
</script>
