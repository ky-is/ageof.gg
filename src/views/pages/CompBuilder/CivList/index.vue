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

<script lang="ts">
import { defineComponent, computed, ref, Ref } from 'vue'

import { Focus } from '/@/models/types'
import { civEntries, CivEntry } from '/@/models/civs'

import UIStack from '/@/views/ui/Stack.vue'

import FilterFocus from './FilterFocus.vue'
import FilterList from './FilterList.vue'

function sortByName (a: CivEntry, b: CivEntry) {
	return a.name.localeCompare(b.name)
}

function getCivsForFilter (focusFilter: Focus | null): [CivEntry[], CivEntry[]] {
	let primaryCivs: CivEntry[] = []
	const secondaryCivs: CivEntry[] = []
	if (!focusFilter) {
		primaryCivs = civEntries.slice(1)
	} else {
		for (const civ of civEntries) {
			if (civ.focuses.includes(focusFilter)) {
				primaryCivs.push(civ)
			} else if (civ.hasSecondaryFocus(focusFilter)) {
				secondaryCivs.push(civ)
			}
		}
	}
	return [primaryCivs.sort(sortByName), secondaryCivs.sort(sortByName)]
}

export default defineComponent({
	components: {
		FilterFocus,
		FilterList,
		UIStack,
	},

	setup () {
		const filterFocus: Ref<keyof typeof Focus | ''> = ref('')
		const filteredCivs = computed(() => {
			return getCivsForFilter(filterFocus.value ? Focus[filterFocus.value] : null)
		})
		return {
			filteredCivs,
			filterFocus,
		}
	},
})
</script>
