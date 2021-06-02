<template>
	<UIStack direction="col" class="bg-gray-900">
		<h2 v-show="false">Team composition</h2>
		<UIStack direction="col" switchAt="lg">
			<UIStack direction="col">
				<UIStack direction="row" alignment="baseline" class="mx-4 py-2">
					<label for="teamSize" class="mr-px text-secondary">Team size:</label>
					<select id="teamSize" v-model="teamSize" class="ui-select">
						<option v-for="size in maxTeamSize" :key="size" :value="size" class="ui-option">
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
				<hr class="border-gray-700">
				<!-- TODO fix scroll -->
				<UIStack direction="row" class="overflow-y-scroll">
					<UIStack direction="col" class="mt-2 mx-4">
						<h3 class="smallcaps text-secondary">synergies</h3>
						<div
							v-for="[focus, [teamCivsAndBonuses, uniqueCivsAndBonuses]] in teamSynergies" :key="focus"
							class="group relative cursor-help"
						>
							<span class="capitalize">{{ focus }}</span>
							<span v-if="teamCivsAndBonuses.length"
								class="text-sm text-bonus-team"
								:title="teamCivsAndBonuses.map(civAndBonus => civAndBonus[0].name).join(', ')"
							>
								+{{ teamCivsAndBonuses.length }}
							</span>
							<span
								class="text-sm text-secondary"
								:title="uniqueCivsAndBonuses.map(civAndBonus => civAndBonus[0].name).join(', ')"
							>
								+{{ uniqueCivsAndBonuses.length }}
							</span>
							<div class="hidden group-hover:block absolute p-2 bg-gray-950 z-50 pointer-events-none">
								<template v-for="civsAndBonuses in [teamCivsAndBonuses, uniqueCivsAndBonuses]">
									<div v-for="[civ, description] in civsAndBonuses" :key="description.body" class="text-sm">
										<div v-if="description.team" class="inline-block w-5 text-base text-center">🌍</div>
										<CivIcon v-else :civ="civ" class="w-5" />
										{{ description.body }}
									</div>
								</template>
							</div>
						</div>
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
		</UIStack>
	</UIStack>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Focus, EffectDescription, CivData } from '@/assets/types'

import { useStore } from '@/models/store'

const { state } = useStore()
const teamCivs = state.teamCivs as (CivData | null)[]

const maxTeamSize = 4
const teamSize = ref(maxTeamSize - 1)

const mapStyles = ['open', 'closed', 'water', 'hybrid']
const mapStyle = ref('hybrid')

const isTeamEmpty = computed(() => {
	for (let index = 0; index < teamSize.value; index += 1) {
		if (teamCivs[index]) {
			return false
		}
	}
	return true
})

const synergies = computed(() => {
	const synergiesByFocus = new Map<Focus, [[CivData, EffectDescription][], [CivData, EffectDescription][]]>()
	for (const civ of teamCivs) {
		if (!civ) {
			continue
		}
		for (const civDescription of civ.descriptions) {
			const focusIndex = civDescription.team ? 0 : 1
			for (const focus of civDescription.focuses) {
				let synergy = synergiesByFocus.get(focus)
				if (!synergy) {
					synergy = [ [], [] ]
					synergiesByFocus.set(focus, synergy)
				}
				synergy[focusIndex].push([civ, civDescription])
			}
		}
	}
	return Array.from(synergiesByFocus.entries())
		.sort((a, b) => (b[1][0].length + b[1][1].length) - (a[1][0].length + a[1][1].length))
})

const teamSynergies = computed(() => {
	return synergies.value.filter(synergy => synergy[1][1].length)
})
</script>
