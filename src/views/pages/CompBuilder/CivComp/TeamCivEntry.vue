<template>
	<div class="w-24 h-24 relative" @dragover.prevent @drop.prevent="onDrop">
		<div v-if="civ" class="absolute group" @mouseenter="commit.selectCiv('hovered', civ)" @mouseleave="commit.selectCiv('hovered', null)">
			<CivIcon :civ="civ" dragAction="move" @click="commit.selectCiv('clicked', civ)" @dragging="isDragging = $event" />
			<button
				v-if="!isDragging"
				class="center-center hidden group-hover:flex  absolute left-0 top-0 w-8 h-8 bg-black opacity-50 rounded-full"
				@click="commit.removeTeamCiv(civ)"
			>
				╳
			</button>
		</div>
		<div class="p-2 w-full h-full">
			<div class="center-center flex  w-full h-full border-secondary text-secondary rounded-full text-3xl font-thin" :class="!civ || isDragging ? 'border' : null">
				？
			</div>
		</div>
	</div>
</template>

<script setup="props" lang="ts">
import { ref, watch } from 'vue'

import type { CivData } from '/@/assets/types'
import civEntries from '/@/assets/generated/civs'

import { useStore } from '/@/models/store'

import CivIcon from '/@/views/components/CivIcon.vue'
export default { components: { CivIcon } }

declare const props: {
	index: 0 | 1 | 2 | 3
	civ?: CivData
}

export const { commit } = useStore()

export const isDragging = ref(false)
watch(() => props.civ, () => {
	isDragging.value = false
})

export function onDrop (event: DragEvent) {
	const civName = event.dataTransfer?.getData('text/civ')
	const civ = civEntries.find(civ => civ.name === civName)
	if (!civ) {
		return console.error('drop', civName, event)
	}
	commit.setTeamCivAt(props.index, civ)
	return false
}
</script>
