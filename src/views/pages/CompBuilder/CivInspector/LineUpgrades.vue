<template>
	<UIStack direction="row">
		<div
			v-for="tech in lineTechs" :key="tech"
			class="w-2 h-2 mx-px" :class="!disableTechIDs.includes(tech) ? 'bg-blue-500' : 'bg-gray-700'"
		/>
		<!-- TODO -->
		<!-- <div
			v-for="tech in lineTechs" :key="tech.name"
			class="w-2 h-2 mx-px" :class="!disableTechIDs.includes(tech.id) ? 'bg-blue-500' : 'bg-gray-700'"
			:title="tech.name"
		/> -->
	</UIStack>
</template>

<script setup="props" lang="ts">
import { computed } from 'vue'

// import techs from '/@/assets/generated/techs'

import UIStack from '/@/views/ui/Stack.vue'
export default { components: { UIStack } }

declare const props: {
	upgrades: number[]
	disableTechIDs: number[]
}

export const availableCount = computed(() => {
	return props.upgrades.filter(techID => !props.disableTechIDs.includes(techID)).length
})

export const lineTechs = computed(() => {
	return props.upgrades
	// const disableTechIDs = props.disableTechIDs
	// return [...props.upgrades]
	// 	.map(techID => techs[techID])
	// 	.sort((a, b) => {
	// 		const aAgeRequirement = a.requires.find(id => id >= 101 && id <= 103) ?? 0
	// 		const bAgeRequirement = b.requires.find(id => id >= 101 && id <= 103) ?? 0
	// 		return aAgeRequirement - bAgeRequirement
	// 	})
})
</script>
