<template>
	<img :src="`/images/civs/${civ.name.toLowerCase()}.png`" class="inline-block">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { CivilizationBonusesEntry } from '/@/models/types'

export default defineComponent({
	props: {
		civ: {
			type: Object as () => CivilizationBonusesEntry,
			required: true,
		},
	},
})
</script>
