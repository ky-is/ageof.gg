<template>
	<UIStack direction="row">
		<div
			v-for="[id, tech] in lineTechs" :key="tech.name"
			class="wh-2 mx-px" :class="!disableTechIDs.includes(id) ? 'bg-blue-400' : 'bg-gray-700'"
			:title="tech.name"
		/>
	</UIStack>
</template>

<script setup="props" lang="ts">
import { computed } from 'vue'

import techs from '/@/assets/generated/techs'

declare const props: {
	upgrades: number[]
	disableTechIDs: number[]
}

export const availableCount = computed(() => {
	return props.upgrades.filter(techID => !props.disableTechIDs.includes(techID)).length
})

export const lineTechs = computed(() => {
	return props.upgrades.map(techID => [ techID, techs[techID] ])
})
</script>
