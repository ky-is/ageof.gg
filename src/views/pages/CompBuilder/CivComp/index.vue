<template>
	<div class="bg-gray-900">
		<div class="px-4">
			<label for="teamSize">Team size:</label>
			<select id="teamSize" v-model="teamSize" class="h-8 -mx-px px-1 bg-transparent rounded border-2 border-gray-900 capitalize">
				<option v-for="size in 4" :key="size" :value="size">
					{{ size }}
				</option>
			</select>
		</div>
		<div class="flex flex-wrap justify-center">
			<div
				v-for="index in teamSize" :key="index"
				class="flex justify-center flex-shrink-0" :class="index <= 2 ? 'w-1/2' : 'w-1/5'"
			>
				<TeamCivEntry :civ="teamCivs[index - 1]" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import TeamCivEntry from './TeamCivEntry.vue'

import { useStore } from '/@/models/store'

export default defineComponent({
	components: {
		TeamCivEntry,
	},

	setup () {
		const teamSize = ref(1)
		const store = useStore()
		const teamCivs = store.state.teamCivs
		return {
			teamSize,
			teamCivs,
		}
	},
})
</script>
