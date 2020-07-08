<template>
	<UIStack direction="col" class="bg-gray-900">
		<h2 v-show="false">Team composition</h2>
		<UIStack direction="col" switchAt="lg">
			<UIStack direction="col">
				<UIStack direction="row" alignment="baseline" class="px-4 py-2">
					<label for="teamSize" class="mr-px text-secondary">Team size:</label>
					<select id="teamSize" v-model="teamSize" class="ui-select">
						<option v-for="size in 4" :key="size" :value="size" class="ui-option">
							{{ size }}
						</option>
					</select>
					<label for="mapStyle" class="ml-2 mr-px text-secondary"> Map style:</label>
					<select id="mapStyle" v-model="mapStyle" class="ui-select">
						<option v-for="map in mapStyles" :key="map" :value="map" class="ui-option">
							{{ map }}
						</option>
					</select>
				</UIStack>
			</UIStack>
			<UIStack direction="col" class="flex-grow">
				<UIStack direction="row" justification="center" wrap class="flex-grow">
					<div
						v-for="size in teamSize" :key="size"
						class="center-center flex  flex-shrink-0" :class="size <= 2 ? 'w-1/2' : 'w-1/5'"
					>
						<TeamCivEntry :index="size - 1" :civ="teamCivs[size - 1]" />
					</div>
				</UIStack>
				<div v-if="isTeamEmpty" class="mt-4 text-center text-secondary font-light">drag+drop / double-click civ icons to add to team</div>
			</UIStack>
		</UIStack>
	</UIStack>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { useStore } from '/@/models/store'

import UIStack from '/@/views/ui/Stack.vue'

import TeamCivEntry from './TeamCivEntry.vue'

export default defineComponent({
	components: {
		TeamCivEntry,
		UIStack,
	},

	setup () {
		const teamSize = ref(3)
		const mapStyles = ['open', 'closed', 'water', 'hybrid']
		const mapStyle = ref(mapStyles[0])

		const store = useStore()
		const teamCivs = store.state.teamCivs
		const isTeamEmpty = computed(() => {
			for (let index = 0; index < teamSize.value; index += 1) {
				if (teamCivs[index]) {
					return false
				}
			}
			return true
		})

		return {
			teamSize,
			mapStyles,
			mapStyle,
			teamCivs,
			isTeamEmpty,
		}
	},
})
</script>
