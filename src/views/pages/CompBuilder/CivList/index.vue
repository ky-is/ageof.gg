<template>
	<div class="w-64 h-full px-4 bg-gray-800">
		<h2 v-show="false">Civilizations</h2>
		<UIStack direction="row" alignment="center" class="mt-2">
			<FilterFocus v-model:selected="filterFocus" />
		</UIStack>
		<FilterList v-if="filteredCivs[0].length" header="primary" :civs="filteredCivs[0]" :isFiltered="!!filterFocus" />
		<FilterList v-if="filteredCivs[1].length" header="secondary" :civs="filteredCivs[1]" :isFiltered="!!filterFocus" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { getFocus, Focus, CivilizationBonusesEntry } from '/@/models/types'
import { civsBonuses } from '/@/models/civs/bonuses'

import UIStack from '/@/views/ui/Stack.vue'

import FilterFocus from './FilterFocus.vue'
import FilterList from './FilterList.vue'

function getCivsForFilter (focusFilter: Focus): [CivilizationBonusesEntry[], CivilizationBonusesEntry[]] {
	let primaryCivs: CivilizationBonusesEntry[] = []
	const secondaryCivs: CivilizationBonusesEntry[] = []
	if (!focusFilter) {
		primaryCivs = civsBonuses
	} else {
		for (const civ of civsBonuses) {
			if (civ.focuses.includes(focusFilter)) {
				primaryCivs.push(civ)
			} else {
				for (const bonus of civ.bonuses) {
					if (bonus.focuses.includes(focusFilter)) {
						secondaryCivs.push(civ)
						break
					}
				}
			}
		}
	}
	return [primaryCivs, secondaryCivs]
}

export default defineComponent({
	components: {
		FilterFocus,
		FilterList,
		UIStack,
	},

	setup () {
		const filterFocus = ref('')
		const filteredCivs = computed(() => {
			return getCivsForFilter(getFocus(filterFocus.value))
		})
		return {
			filteredCivs,
			filterFocus,
		}
	},
})
</script>
