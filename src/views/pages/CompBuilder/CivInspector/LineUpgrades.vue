<template>
	<UIStack direction="row">
		<div
			v-for="[id, tech] in lineTechs" :key="tech.name"
			class="wh-2 mx-px" :class="!disableTechIDs.includes(id) ? 'bg-blue-400' : 'bg-gray-700'"
			:title="tech.name"
		/>
	</UIStack>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import techs from '@/assets/generated/techs'
import type { TechSummaryData } from '@/assets/types'

import UIStack from '@/views/components/UIStack.vue'

const props = defineProps<{
	upgrades: number[]
	disableTechIDs: number[]
}>()

// const availableCount = computed(() => {
// 	return props.upgrades.filter(techID => !props.disableTechIDs.includes(techID)).length
// })

const lineTechs = computed(() => {
	return props.upgrades.map(techID => [ techID, techs[techID] ] as [number, TechSummaryData])
})
</script>
