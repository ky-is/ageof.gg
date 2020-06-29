<template>
	<div class="bg-gray-900">
		<h2 v-show="false">Team composition</h2>
		<UIStack direction="col" switchAt="lg">
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
			<UIStack direction="row" justification="center" wrap class="flex-grow">
				<div
					v-for="size in teamSize" :key="size"
					class="center-center  flex-shrink-0" :class="size <= 2 ? 'w-1/2' : 'w-1/5'"
				>
					<TeamCivEntry :index="size - 1" :civ="teamCivs[size - 1]" />
				</div>
			</UIStack>
		</UIStack>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useStore } from '/@/models/store'

import UIStack from '/@/views/ui/Stack.vue'

import TeamCivEntry from './TeamCivEntry.vue'

export default defineComponent({
	components: {
		TeamCivEntry,
		UIStack,
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
