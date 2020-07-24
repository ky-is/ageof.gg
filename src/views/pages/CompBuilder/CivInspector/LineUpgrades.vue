<template>
	<UIStack direction="row">
		<div
			v-for="[id, tech] in lineTechs" :key="tech.name"
			class="w-2 h-2 mx-px" :class="!disableTechIDs.includes(id) ? 'bg-blue-500' : 'bg-gray-700'"
			:title="tech.name"
		/>
	</UIStack>
</template>

<script setup="props" lang="ts">
import { computed } from 'vue'

import techs from '/@/assets/generated/techs'

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
	return props.upgrades.map(techID => [ techID, techs[techID] ])
})
</script>
