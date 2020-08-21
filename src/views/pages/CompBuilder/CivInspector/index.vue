<template>
	<div class="bg-gray-800 px-4 overflow-y-scroll">
		<UIStack v-if="selectedCiv" direction="col" switchAt="lg" class="my-2">
			<UIStack direction="col" class="lg:w-1/2 mb-4">
				<UIStack direction="row">
					<CivIcon :civ="selectedCiv" dragAction="copy" class="wh-24 -ml-2" />
					<UIStack direction="col" class="ml-1">
						<h2 class="text-2xl font-light">{{ selectedCiv.name }}</h2>
						<table class="leading-tight">
							<FocusRow title="major" color="text-bonus-major" :focuses="selectedCiv.focuses.primary" />
							<FocusRow title="team" color="text-bonus-team" :focuses="selectedCiv.focuses.team" />
							<FocusRow title="minor" color="text-bonus-general" :focuses="selectedCiv.focuses.secondary" />
						</table>
					</UIStack>
					<!-- <UIStack direction="row" alignment="center" justification="center" class="ml-4">
						<button class="ui-button my-2" @click="commit.addTeamCiv(selectedCiv)">+ to team</button>
					</UIStack> -->
				</UIStack>
				<ul class="mt-2">
					<UIStack v-for="[label, bonuses] in groupedBonuses" :key="label" direction="col">
						<h3 class="smallcaps" :class="`text-bonus-${label}`">{{ label }}</h3>
						<li v-for="bonus in bonuses" :key="bonus.body" class="ml-3  group">
							<img
								v-for="ageID in (bonus.ages || [darkAge])" :key="ageID"
								:src="`/images/ages/${ageID}.png`" :alt="CivAgeName[ageID] + ' age'"
								class="bonus-icon -ml-3"
							>
							<img
								v-if="bonus.icon"
								:src="`/images/techs/${bonus.icon}.png`" :alt="`${CivAgeName[bonus.ages ? bonus.ages[0] : darkAge]} age unique tech`"
								class="bonus-icon"
							>
							<!-- SAMPLE -->
							<!-- <span class="text-secondary text-sm">{{ bonus.debug }}&nbsp;</span> -->
							<span v-if="bonus.title" class="text-secondary text-bold">{{ bonus.title }}: </span>
							<span>{{ bonus.body }}</span>
							<span v-if="bonus.names" class="text-secondary  hidden group-hover:inline"> ({{ bonus.names.join(', ') }})</span>
							<span v-if="bonus.requires" class="text-secondary  hidden group-hover:inline"> (requires {{ bonus.requires.join(', ') }})</span>
						</li>
					</UIStack>
				</ul>
			</UIStack>
			<UIStack direction="col" class="mt-1 lg:ml-4 text-sm lg:w-1/2">
				<h3 v-show="false" class="-mb-1 text-lg">Tech Tree</h3>
				<div v-for="[category, unitLines] in unitCategoryLines" :key="category">
					<h4 class="mt-1 smallcaps text-secondary">{{ category }}</h4>
					<div v-for="line in unitLines" :key="line.name">
						<UIStack v-if="!selectedCiv.disableTechIDs.includes(line.units[0][1])" direction="row" alignment="center">
							{{ line.name }}
							<UIStack direction="col" class="ml-px pl-px">
								<UIStack direction="row">
									<div v-for="[unitID, techID] in line.units" :key="unitID" class="wh-2 mx-px" :class="techID === undefined ? 'bg-yellow-600' : (!selectedCiv.disableTechIDs.includes(techID) ? 'bg-yellow-400' : 'bg-gray-700')" :title="units[unitID].name" />
								</UIStack>
								<LineUpgrades :upgrades="line.upgrades" :disableTechIDs="selectedCiv.disableTechIDs" class="mt-px" />
							</UIStack>
						</UIStack>
					</div>
				</div>
			</UIStack>
		</UIStack>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from '/@/models/store'

import { CivAgeName, EffectDescription, CivAge } from '/@/assets/types'
import units from '/@/assets/generated/units'
import unitCategoryLines from '/@/assets/generated/unitLines'

import UIStack from '/@/views/ui/UIStack.vue'
import CivIcon from '/@/views/components/CivIcon.vue'
import LineUpgrades from '/@/views/pages/CompBuilder/CivInspector/LineUpgrades.vue'
import FocusRow from './FocusRow.vue'
export default { components: { CivIcon, FocusRow, LineUpgrades, UIStack } }

export { CivAgeName, unitCategoryLines, units }

export const darkAge = CivAge.Dark

const store = useStore()
export const commit = store.commit
export const { selectedCiv } = store.getters

export const groupedBonuses = computed(() => {
	if (!selectedCiv.value) {
		return []
	}

	const result: [string, EffectDescription[]][] = [
		['team', []],
		['general', []],
		['castle', []],
	]
	for (const description of selectedCiv.value.descriptions) {
		let index: number
		if (description.team) {
			index = 0
		} else if (description.castle) {
			index = 2
		} else {
			index = 1
		}
		result[index][1].push(description)
	}
	return result
})
</script>

<style lang="postcss" scoped>
.bonus-icon {
	@apply inline wh-5 mr-px;
}
</style>
