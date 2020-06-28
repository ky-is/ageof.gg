<template>
	<div class="bg-gray-900">
		<div class="px-4">
			<label for="teamSize" class="text-secondary">Team size:</label>
			<select id="teamSize" v-model="teamSize" class="ui-select">
				<option v-for="size in 4" :key="size" :value="size" class="ui-option">
					{{ size }}
				</option>
			</select>
			<label for="mapStyle" class="text-secondary"> Map style:</label>
			<select id="mapStyle" v-model="mapStyle" class="ui-select">
				<option v-for="map in mapStyles" :key="map" :value="map" class="ui-option">
					{{ map }}
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
		const mapStyles = ['open', 'closed', 'water', 'hybrid']
		const mapStyle = ref(mapStyles[0])
		const store = useStore()
		const teamCivs = store.state.teamCivs
		return {
			teamSize,
			mapStyles,
			mapStyle,
			teamCivs,
		}
	},
})
</script>
