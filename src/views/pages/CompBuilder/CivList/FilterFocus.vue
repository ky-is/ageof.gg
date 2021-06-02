<template>
	<div>
		<label for="filterCivs" class="hidden">Filter civs:</label>
		<select id="filterCivs" v-model="value" class="ui-select -mx-px" name="Filter focus">
			<option value="" disabled class="ui-option">Filter by:</option>
			<template v-if="selected">
				<option value="" class="ui-option text-secondary">None</option>
				<option disabled class="ui-option">—</option>
			</template>
			<option v-for="[key, focus] in focusFilters" :key="key" :value="key" class="ui-option">
				{{ focus }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmit } from 'vue'

import { Focus } from '@/assets/types'

const props = defineProps<{
	selected: string
}>()
const emit = defineEmit(['update:selected'])

const focusFilters = Object.entries(Focus)

const value = computed({
	get: () => props.selected,
	set: (newValue) => emit('update:selected', newValue),
})
</script>
