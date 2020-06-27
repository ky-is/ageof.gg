<template>
	<div class="w-64 h-full bg-gray-800">
		<h2>Civilizations</h2>
		<div>
			<select v-model="filterFocus" class="bg-black capitalize" name="Filter focus">
				<option value="" disabled>Filter by</option>
				<option value="" class="text-gray-500">None</option>
				<option value="" disabled>—</option>
				<option v-for="[key, focus] in focusFilters" :key="key" :value="key">
					{{ focus }}
				</option>
			</select>
		</div>
		<div v-for="civilization in filteredCivs" :key="civilization.name" class="my-1 flex items-center">
			<img :src="`src/assets/images/civs/${civilization.name.toLowerCase()}.png`" class="w-12 mr-1">
			<div class="leading-tight">
				<h3 class="text-lg">{{ civilization.name }}</h3>
				<div class="text-sm">{{ civilization.focuses.join(' + ') }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { Focus } from '../../models/types'
import civBonuses from '../../models/civs/bonuses'

export default defineComponent({
	components: {
	},

	setup () {
		const filterFocus = ref('')
		const focusFilters = Object.entries(Focus)
		const filteredCivs = computed(() => {
			const selectedFilterFocus = Focus[filterFocus.value]
			if (!selectedFilterFocus) {
				return civBonuses
			}
			return civBonuses.filter(civ => civ.focuses.includes(selectedFilterFocus))
		})
		return {
			focusFilters,
			filteredCivs,
			filterFocus,
		}
	},
})
</script>
