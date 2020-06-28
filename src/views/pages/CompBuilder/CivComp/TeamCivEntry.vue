<template>
	<div class="w-24 h-24">
		<div v-if="civ">
			<CivIcon :civ="civ" />
		</div>
		<div v-else class="p-2 w-full h-full">
			<div class="w-full h-full border border-secondary text-secondary rounded-full text-3xl font-thin  flex justify-center items-center">
				?
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
		civ: {
			type: Object as () => CivilizationBonusesEntry | null,
			default: null,
		},
	},
})
</script>
