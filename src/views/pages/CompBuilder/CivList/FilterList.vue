<template>
	<div class="mt-1">
		<h3 class="text-lg text-secondary smallcaps">{{ header }}</h3>
		<div v-for="civilization in civs" :key="civilization.name" class="my-2  flex items-start">
			<CivIcon :civ="civ" class="w-10 -ml-1 mr-1" />
			<div class="leading-tight">
				<h3 class="text-lg">{{ civilization.name }}</h3>
				<div class="text-sm text-secondary">{{ civilization.focuses.join(' + ') }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CivIcon from '/@/views/components/CivIcon.vue'

import { CivilizationBonusesEntry } from '/@/models/civs/bonuses'

export default defineComponent({
	components: {
		CivIcon,
	},

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
