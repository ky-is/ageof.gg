<template>
	<img
		:src="`/images/civs/${civ.name.toLowerCase()}.png`" :alt="civ.name"
		class="inline-block" :class="dragging ? (dragAction === 'move' ? 'opacity-0' : 'opacity-50') : null"
		@dragstart="onDragStart" @dragend="onDragEnd" @dblclick="commit.addTeamCiv(civ)"
	>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmit } from 'vue'

import type { CivData } from '@/assets/types'

import { useStore } from '@/models/store'

const props = defineProps<{
	civ: CivData
	dragAction?: 'move' | 'copy'
}>()
const emit = defineEmit(['dragging'])

const { commit } = useStore()

const dragging = ref(false)
watch(dragging, dragging => {
	emit('dragging', dragging)
})

function onDragStart (event: DragEvent) {
	if (!props.dragAction) {
		return true
	}
	if (event.dataTransfer) {
		dragging.value = true
		event.dataTransfer.effectAllowed = props.dragAction
		event.dataTransfer.dropEffect = props.dragAction
		event.dataTransfer.setData('text/civ', props.civ.name)
	} else {
		console.error('Invalid copy source', event.target, event.dataTransfer)
	}
}

function onDragEnd (event: DragEvent) {
	dragging.value = false
}
</script>
