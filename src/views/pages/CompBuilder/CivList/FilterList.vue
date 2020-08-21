<template>
	<UIStack direction="col" class="mb-2">
		<h3 v-if="isFiltered" class="text-lg text-secondary smallcaps">{{ header }}</h3>
		<UIStack
			v-for="civ in civs" :key="civ.name"
			direction="row" alignment="start" class="py-1"
			@click="commit.selectCiv('clicked', civ)" @mouseenter="commit.selectCiv('hovered', civ)" @mouseleave="commit.selectCiv('hovered', null)"
		>
			<CivIcon :civ="civ" dragAction="copy" class="w-10 -ml-1 mr-1" />
			<UIStack direction="col" class="leading-tight">
				<h3 class="text-lg font-light">{{ civ.name }}</h3>
				<div class="text-sm text-secondary">{{ civ.focuses.primary.join(' + ') }}</div>
			</UIStack>
		</UIStack>
	</UIStack>
</template>

<script setup="props" lang="ts">
import type { CivData } from '/@/assets/types'
import { useStore } from '/@/models/store'

declare const props: {
	header: string
	civs: CivData[][]
	isFiltered: boolean
}

export const { commit } = useStore()
</script>
