<template>
	<select v-model="value" class="ui-select -mx-px" name="Filter focus">
		<option value="" disabled class="ui-option">Filter by:</option>
		<template v-if="selected">
			<option value="" class="ui-option text-secondary">None</option>
			<option disabled class="ui-option">—</option>
		</template>
		<option v-for="[key, focus] in focusFilters" :key="key" :value="key" class="ui-option">
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
