<template>
	<div class="w-64 h-full bg-gray-800">
		<h2>Civilizations</h2>
		<div>
			<FilterFocus v-model:selected="filterFocus" />
		</div>
		<FilterList :civs="filteredCivs" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import FilterFocus from './FilterFocus.vue'
import FilterList from './FilterList.vue'

import { Focus } from '/@/models/types'
import civBonuses from '/@/models/civs/bonuses'

export default defineComponent({
	components: {
		FilterFocus,
		FilterList,
	},

	setup () {
		const filterFocus = ref('')
		const filteredCivs = computed(() => {
			const focusKey = <keyof typeof Focus>filterFocus.value
			const selectedFilterFocus = Focus[focusKey]
			return !selectedFilterFocus ? civBonuses : civBonuses.filter(civ => civ.focuses.includes(selectedFilterFocus))
		})
		return {
			filteredCivs,
			filterFocus,
		}
	},
})
</script>
