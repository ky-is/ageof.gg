<template>
	<div class="mt-1">
		<h3 class="text-lg text-secondary smallcaps">{{ header }}</h3>
		<div v-for="civilization in civs" :key="civilization.name" class="my-2  flex items-start">
			<img :src="`src/assets/images/civs/${civilization.name.toLowerCase()}.png`" class="w-10 -ml-1 mr-1">
			<div class="leading-tight">
				<h3 class="text-lg">{{ civilization.name }}</h3>
				<div class="text-sm text-secondary">{{ civilization.focuses.join(' + ') }}</div>
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
