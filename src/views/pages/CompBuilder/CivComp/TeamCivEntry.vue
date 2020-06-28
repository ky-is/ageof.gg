<template>
	<div class="w-24 h-24">
		<div v-if="civ" class="relative group" @mouseenter="commit.selectedCiv('hovered', civ)" @mouseleave="commit.selectedCiv('hovered', null)">
			<CivIcon :civ="civ" @click="commit.selectedCiv('clicked', civ)" />
			<button
				class="absolute left-0 top-0 w-8 h-8 bg-black opacity-50 rounded-full   hidden group-hover:block  flex justify-center items-center"
				@click="commit.removeTeamCiv(civ)"
			>
				╳
			</button>
		</div>
		<div v-else class="p-2 w-full h-full">
			<div class="w-full h-full border border-secondary text-secondary rounded-full text-3xl font-thin  flex justify-center items-center">
				?
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CivIcon from '/@/views/components/CivIcon.vue'

import { CivilizationBonusesEntry } from '/@/models/civs/bonuses'
import { useStore } from '/@/models/store'

export default defineComponent({
	components: {
		CivIcon,
	},

	props: {
		civ: {
			type: Object as () => CivilizationBonusesEntry | null,
			default: null,
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
