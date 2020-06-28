<template>
	<div class="mt-1">
		<h3 v-if="isFiltered" class="text-lg text-secondary smallcaps">{{ header }}</h3>
		<div
			v-for="civ in civs" :key="civ.name"
			class="py-1  flex items-start"
			@click="commit.selectedCiv('clicked', civ)" @mouseenter="commit.selectedCiv('hovered', civ)" @mouseleave="commit.selectedCiv('hovered', null)"
		>
			<CivIcon :civ="civ" class="w-10 -ml-1 mr-1" />
			<div class="leading-tight">
				<h3 class="text-lg">{{ civ.name }}</h3>
				<div class="text-sm text-secondary">{{ civ.focuses.join(' + ') }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CivIcon from '/@/views/components/CivIcon.vue'

import { useStore } from '/@/models/store'
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
		isFiltered: {
			type: Boolean,
			required: true,
		},
	},

	setup () {
		const store = useStore()
		return {
			commit: store.commit,
		}
	},
})
</script>
