<template>
	<div class="mt-1">
		<h3 class="px-2">{{ header }}</h3>
		<div v-for="civilization in civs" :key="civilization.name" class="my-2  flex items-center">
			<img :src="`src/assets/images/civs/${civilization.name.toLowerCase()}.png`" class="w-10 mr-1">
			<div class="leading-tight">
				<h3 class="text-lg">{{ civilization.name }}</h3>
				<div class="text-sm text-gray-500">{{ civilization.focuses.join(' + ') }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { CivilizationBonusesEntry } from '/@/models/civs/bonuses'

export default defineComponent({
	props: {
		header: {
			type: String,
			required: true,
		},
		civs: {
			type: Array as () => CivilizationBonusesEntry[][],
			required: true,
		},
	},
})
</script>
