<template>
	<div class="w-24 h-24 relative" @dragover.prevent @drop.prevent="onDrop">
		<div v-if="civ" class="absolute group" @mouseenter="commit.selectedCiv('hovered', civ)" @mouseleave="commit.selectedCiv('hovered', null)">
			<CivIcon :civ="civ" dragAction="move" @click="commit.selectedCiv('clicked', civ)" @dragging="isDragging = $event" />
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

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { civEntries } from '/@/models/civs'
import type { CivEntry } from '/@/models/civs'
import { useStore } from '/@/models/store'

import CivIcon from '/@/views/components/CivIcon.vue'

export default defineComponent({
	components: {
		CivIcon,
	},

	props: {
		index: {
			type: Number as PropType<0 | 1 | 2 | 3>,
			required: true,
		},
		civ: {
			type: Object as PropType<CivEntry | null>,
			default: null,
		},
	},

	setup (props) {
		const store = useStore()

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
			store.commit.setTeamCivAt(props.index, civ)
			return false
		}

		return {
			commit: store.commit,
			isDragging,
			onDrop,
		}
	},
})
</script>
