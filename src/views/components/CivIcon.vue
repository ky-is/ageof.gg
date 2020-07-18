<template>
	<img
		:src="`/images/civs/${civ.name.toLowerCase()}.png`" :alt="civ.name"
		class="inline-block" :class="dragging ? (dragAction === 'move' ? 'opacity-0' : 'opacity-50') : null"
		@dragstart="onDragStart" @dragend="onDragEnd" @dblclick="commit.addTeamCiv(civ)"
	>
</template>

<script setup="props, { emit }" lang="ts">
import { ref, watch } from 'vue'

import { CivEntry } from '/@/models/civs'
import { useStore } from '/@/models/store'

declare const props: {
	civ: CivEntry
	dragAction: 'move' | 'copy'
}

export const { commit } = useStore()

export const dragging = ref(false)
watch(dragging, dragging => {
	emit('dragging', dragging)
})

export function onDragStart (event: DragEvent) {
	if (event.dataTransfer) {
		dragging.value = true
		event.dataTransfer.effectAllowed = props.dragAction
		event.dataTransfer.dropEffect = props.dragAction
		event.dataTransfer.setData('text/civ', props.civ.name)
	} else {
		console.error('Invalid copy source', event.target, event.dataTransfer)
	}
}

export function onDragEnd (event: DragEvent) {
	dragging.value = false
}
</script>
