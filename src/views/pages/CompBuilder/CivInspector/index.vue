<template>
	<div class="bg-gray-800 px-4 overflow-y-scroll">
		<UIStack v-if="civ" direction="col" switchAt="lg" class="my-2">
			<UIStack direction="col" class="lg:w-1/2 mb-4">
				<UIStack direction="row">
					<CivIcon :civ="civ" dragAction="copy" class="w-24 h-24 -ml-2" />
					<UIStack direction="col" class="ml-1">
						<h2 class="text-2xl font-light">{{ civ.name }}</h2>
						<table class="leading-tight">
							<FocusRow title="major" color="text-bonus-major" :focuses="civ.primaryFocuses" />
							<FocusRow title="team" color="text-bonus-team" :focuses="civ.teamFocuses" />
							<FocusRow title="minor" color="text-bonus-general" :focuses="civ.secondaryFocuses" />
						</table>
					</UIStack>
					<!-- <UIStack direction="row" alignment="center" justification="center" class="ml-4">
						<button class="ui-button my-2" @click="commit.addTeamCiv(civ)">+ to team</button>
					</UIStack> -->
				</UIStack>
				<ul class="mt-2">
					<UIStack v-for="[label, bonuses] in groupedBonuses" :key="label" direction="col">
						<h3 class="smallcaps" :class="`text-bonus-${label}`">{{ label }}</h3>
						<li v-for="bonus in bonuses" :key="bonus.segments" class="ml-3  group">
							<img
								v-for="ageID in bonus.ages.length ? bonus.ages : [darkAge]" :key="ageID"
								:src="`/images/ages/${ageID}.png`" :alt="CivAgeName[ageID] + ' age'"
								class="bonus-icon -ml-3"
							>
							<img
								v-if="bonus.icon"
								:src="`/images/techs/${bonus.icon}.png`" :alt="`${CivAgeName[bonus.ages[0]]} age unique tech`"
								class="bonus-icon"
							>
							<!-- SAMPLE -->
							<!-- <span class="text-secondary text-sm">{{ bonus.id }} : {{ bonus.type }} {{ bonus.a }}&nbsp;</span> -->
							<span v-if="bonus.title" class="text-secondary text-bold">{{ bonus.title }}: </span>
							<span>{{ bonus.segments.join(' ') }}</span>
							<span v-if="bonus.names.length > 1" class="text-secondary  hidden group-hover:inline"> ({{ bonus.names.join(', ') }})</span>
							<span v-if="bonus.requires.length" class="text-secondary  hidden group-hover:inline"> (requires {{ bonus.requires.join(', ') }})</span>
						</li>
					</UIStack>
				</ul>
			</UIStack>
			<UIStack direction="col" class="mt-1 lg:ml-4 text-sm lg:w-1/2">
				<h3 class="-mb-1 text-lg">Tech Tree</h3>
				<div v-for="[category, unitLines] in unitCategoryLines" :key="category">
					<h4 class="mt-1 smallcaps text-secondary">{{ category }}</h4>
					<div v-for="line in unitLines" :key="line.name">
						<UIStack v-if="!civ.disableTechIDs.includes(line.units[0][1])" direction="row" alignment="center">
							{{ line.name }}
							<UIStack direction="col" class="ml-px pl-px">
								<UIStack direction="row">
									<div v-for="[unitID, techID] in line.units" :key="unitID" class="w-2 h-2 mx-px" :class="techID === undefined ? 'bg-yellow-700' : (!civ.disableTechIDs.includes(techID) ? 'bg-yellow-500' : 'bg-gray-500')" />
								</UIStack>
								<LineUpgrades :upgrades="line.upgrades" :disableTechIDs="civ.disableTechIDs" class="mt-px" />
							</UIStack>
						</UIStack>
					</div>
				</div>
			</UIStack>
		</UIStack>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { unitCategoryLines } from '/@/models/effectSummaries'
import { BonusType, CivAgeName, EffectDescription, CivAge } from '/@/models/types'
import { useStore } from '/@/models/store'

import UIStack from '/@/views/ui/Stack.vue'
import CivIcon from '/@/views/components/CivIcon.vue'

import LineUpgrades from '/@/views/pages/CompBuilder/CivInspector/LineUpgrades.vue'

import FocusRow from './FocusRow.vue'

export default defineComponent({
	components: {
		CivIcon,
		FocusRow,
		LineUpgrades,
		UIStack,
	},

	setup () {
		const store = useStore()
		const civ = store.getters.selectedCiv

		const groupedBonuses = computed(() => {
			if (!civ.value) {
				return []
			}

			const result: [string, EffectDescription[]][] = [
				['team', []],
				['general', []],
				['castle', []],
			]
			for (const description of civ.value.getDescriptions()) {
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

		return {
			civ,
			commit: store.commit,
			groupedBonuses,
			darkAge: CivAge.Dark,
			CivAgeName,
			unitCategoryLines,
		}
	},
})
</script>

<style lang="postcss" scoped>
.bonus-icon {
	@apply inline w-5 h-5 mr-px;
}
</style>
