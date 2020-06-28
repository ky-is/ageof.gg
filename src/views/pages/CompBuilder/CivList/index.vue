<template>
	<div class="w-96 h-full bg-gray-800">
		<h2 v-show="false">Civilizations</h2>
		<div>
			<FilterFocus v-model:selected="filterFocus" />
		</div>
		<FilterList v-if="filteredCivs[0].length" header="Primary" :civs="filteredCivs[0]" />
		<FilterList v-if="filteredCivs[1].length" header="Secondary" :civs="filteredCivs[1]" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import FilterFocus from './FilterFocus.vue'
import FilterList from './FilterList.vue'

import { getFocus, Focus } from '/@/models/types'
import { civsBonuses, CivilizationBonusesEntry } from '/@/models/civs/bonuses'

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
