<template>
	<img
		:src="`/images/civs/${civ.name.toLowerCase()}.png`" :alt="civ.name"
		class="inline-block" :class="dragging ? (dragAction === 'move' ? 'opacity-0' : 'opacity-50') : null"
		@dragstart="onDragStart" @dragend="onDragEnd" @dblclick="commit.addTeamCiv(civ)"
	>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { CivBonusesEntry } from '/@/models/types'
import { useStore } from '/@/models/store'

export default defineComponent({
	props: {
		civ: {
			type: Object as PropType<CivBonusesEntry>,
			required: true,
		},
		dragAction: {
			type: String as PropType<'move' | 'copy'>,
			required: true,
		},
	},

	setup (props, context) {
		const store = useStore()
		const dragging = ref(false)
		watch(dragging, (dragging) => {
			context.emit('dragging', dragging)
		})
		function onDragStart (event: DragEvent) {
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

		return {
			commit: store.commit,
			dragging,
			onDragStart,
			onDragEnd,
		}
	},
})
</script>
