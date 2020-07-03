<template>
	<UIStack direction="col" class="mb-2">
		<h3 v-if="isFiltered" class="text-lg text-secondary smallcaps">{{ header }}</h3>
		<UIStack
			v-for="civ in civs" :key="civ.name"
			direction="row" alignment="start" class="py-1"
			@click="commit.selectedCiv('clicked', civ)" @mouseenter="commit.selectedCiv('hovered', civ)" @mouseleave="commit.selectedCiv('hovered', null)"
		>
			<CivIcon :civ="civ" dragAction="copy" class="w-10 -ml-1 mr-1" />
			<UIStack direction="col" class="leading-tight">
				<h3 class="text-lg font-light">{{ civ.name }}</h3>
				<div class="text-sm text-secondary">{{ civ.focuses.join(' + ') }}</div>
			</UIStack>
		</UIStack>
	</UIStack>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useStore } from '/@/models/store'
import type { CivEntry } from '/@/models/civs'

import UIStack from '/@/views/ui/Stack.vue'
import CivIcon from '/@/views/components/CivIcon.vue'

export default defineComponent({
	components: {
		CivIcon,
		UIStack,
	},

	props: {
		header: {
			type: String,
			required: true,
		},
		civs: {
			type: Array as PropType<CivEntry[][]>,
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
