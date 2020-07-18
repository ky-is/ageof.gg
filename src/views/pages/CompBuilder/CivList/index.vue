<template>
	<UIStack direction="col" class="w-64 bg-gray-850">
		<h2 v-show="false">Civilizations</h2>
		<UIStack direction="row" alignment="center" class="my-2 px-4">
			<FilterFocus v-model:selected="filterFocus" />
		</UIStack>
		<div class="w-full px-4 flex-gro overflow-y-scroll">
			<FilterList v-if="filteredCivs[0].length" header="primary" :civs="filteredCivs[0]" :isFiltered="!!filterFocus" />
			<FilterList v-if="filteredCivs[1].length" header="secondary" :civs="filteredCivs[1]" :isFiltered="!!filterFocus" />
		</div>
	</UIStack>
</template>

<script setup lang="ts">
import { computed, ref, Ref } from 'vue'

import { Focus } from '/@/models/types'
import { civEntries, CivEntry, sortByName } from '/@/models/civs'

import UIStack from '/@/views/ui/Stack.vue'
import FilterFocus from './FilterFocus.vue'
import FilterList from './FilterList.vue'
export default { components: { FilterFocus, FilterList, UIStack } }

export const filterFocus: Ref<keyof typeof Focus | ''> = ref('')

export const filteredCivs = computed(() => {
	const focusFilter = filterFocus.value ? Focus[filterFocus.value] : null
	let primaryCivs: CivEntry[] = []
	const secondaryCivs: CivEntry[] = []
	if (!focusFilter) {
		primaryCivs = civEntries.slice(1)
	} else {
		for (const civ of civEntries) {
			if (civ.primaryFocuses.includes(focusFilter)) {
				primaryCivs.push(civ)
			} else if (civ.secondaryFocuses.includes(focusFilter)) {
				secondaryCivs.push(civ)
			} else {
				//TODO team
			}
		}
	}
	return [primaryCivs.sort(sortByName), secondaryCivs.sort(sortByName)]
})
</script>
