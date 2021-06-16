<template>
	<div class="wh-24 relative" @dragover.prevent @drop.prevent="onDrop">
		<div v-if="civ" class="absolute group" @mouseenter="commit.selectCiv('hovered', civ)" @mouseleave="commit.selectCiv('hovered', undefined)">
			<CivIcon :civ="civ" dragAction="move" @click="commit.selectCiv('clicked', civ)" @dragging="isDragging = $event" />
			<button
				v-if="!isDragging"
				class="center-center hidden group-hover:flex  absolute left-0 top-0 wh-8 bg-black opacity-50 rounded-full"
				@click="commit.removeTeamCiv(civ)"
			>
				╳
			</button>
		</div>
		<div class="p-2 wh-full">
			<div class="center-center flex  wh-full border-secondary text-secondary rounded-full text-3xl font-extralight" :class="!civ || isDragging ? 'border' : null">
				？
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'

import type { CivData, TeamIndex } from '@/assets/types'
import civEntries from '@/assets/generated/civs'

import { useStore } from '@/models/store'

import CivIcon from '@/views/components/CivIcon.vue'

const props = defineProps<{
	index: number //TODO TeamIndex
	civ?: CivData //TODO vite doesn't allow `CivData | null`
}>()

const { commit } = useStore()

const isDragging = ref(false)
watch(() => props.civ, () => {
	isDragging.value = false
})

function onDrop (event: DragEvent) {
	const civName = event.dataTransfer?.getData('text/civ')
	const civ = civEntries.find(civ => civ.name === civName)
	if (!civ) {
		return console.error('drop', civName, event)
	}
	commit.setTeamCivAt(props.index as TeamIndex, civ)
	return false
}
</script>
