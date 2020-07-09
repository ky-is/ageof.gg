<template>
	<UIStack direction="row">
		<div v-for="tech in lineTechs" :key="tech.name" class="w-2 h-2 mx-px" :class="allCivTechs.includes(tech.id) ? 'bg-blue-700' : (!disableTechIDs.includes(tech.id) ? 'bg-blue-500' : 'bg-gray-700')" :title="tech.name" />
	</UIStack>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import techs from '/@/assets/data/techs'
import allCivTechs from '/@/assets/data/allCivTechs'

import UIStack from '/@/views/ui/Stack.vue'

export default defineComponent({
	components: {
		UIStack,
	},

	props: {
		upgrades: {
			type: Array as PropType<number[]>,
			required: true,
		},
		disableTechIDs: {
			type: Array as PropType<number[]>,
			required: true,
		},
	},

	setup (props) {
		const availableCount = computed(() => {
			return props.upgrades.filter(techID => !props.disableTechIDs.includes(techID)).length
		})
		const lineTechs = computed(() => {
			const disableTechIDs = props.disableTechIDs
			return [...props.upgrades]
				.map(techID => techs[techID])
				.sort((a, b) => {
					const aAgeRequirement = a.requires.find(id => id >= 101 && id <= 103) ?? 0
					const bAgeRequirement = b.requires.find(id => id >= 101 && id <= 103) ?? 0
					return aAgeRequirement - bAgeRequirement
				})
		})
		return {
			availableCount,
			lineTechs,
			allCivTechs,
		}
	},
})
</script>
