<template>
	<select v-model="value" class="h-8 -mx-px px-1 bg-transparent rounded border-2 border-gray-900 capitalize" name="Filter focus">
		<option value="" disabled>Filter by:</option>
		<template v-if="selected">
			<option value="" class="text-secondary">None</option>
			<option disabled>—</option>
		</template>
		<option v-for="[key, focus] in focusFilters" :key="key" :value="key">
			{{ focus }}
		</option>
	</select>
</template>

<script>
import { defineComponent, computed } from 'vue'

import { Focus } from '/@/models/types'

export default defineComponent({
	props: {
		selected: {
			type: String,
			required: true,
		},
	},

	setup (props, { emit }) {
		const focusFilters = Object.entries(Focus)
		const value = computed({
			get: () => props.selected,
			set: (newValue) => emit('update:selected', newValue),
		})
		return {
			focusFilters,
			value,
		}
	},
})
</script>
