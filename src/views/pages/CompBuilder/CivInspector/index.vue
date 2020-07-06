<template>
	<div class="bg-gray-800 px-4">
		<UIStack v-if="civ" direction="col" class="my-2  group">
			<UIStack direction="row" wrap>
				<CivIcon :civ="civ" dragAction="copy" class="w-24 h-24 -ml-2" />
				<UIStack direction="col" class="ml-1">
					<h2 class="text-2xl font-light">{{ civ.name }}</h2>
					<table class="leading-tight">
						<FocusRow title="major" color="text-bonus-major" :focuses="civ.primaryFocuses" />
						<FocusRow title="minor" color="text-bonus-general" :focuses="civ.secondaryFocuses" />
						<FocusRow title="team" color="text-bonus-team" :focuses="civ.teamFocuses" />
					</table>
				</UIStack>
				<UIStack direction="row" alignment="center" justification="center" class="ml-4">
					<button class="ui-button my-2" @click="commit.addTeamCiv(civ)">+ to team</button>
				</UIStack>
			</UIStack>
			<ul class="mt-2">
				<UIStack v-for="[label, bonuses] in groupedBonuses" :key="label" direction="col">
					<h3 class="smallcaps" :class="`text-bonus-${label}`">{{ label }}</h3>
					<li v-for="bonus in bonuses" :key="bonus.description" class="ml-3">
						<img
							v-for="ageID in bonus.ages" :key="ageID"
							:src="`/images/ages/${ageID}.png`" :alt="CivAgeName[ageID] + ' age'"
							class="bonus-icon -ml-3"
						>
						<img
							v-if="bonus.icon"
							:src="`/images/techs/${bonus.icon}.png`" :alt="`${CivAgeName[bonus.ages[0]]} age unique tech`"
							class="bonus-icon"
						>
						<span v-if="bonus.name" class="text-secondary text-bold">{{ bonus.name }}: </span>
						<span class="text-secondary text-sm">{{ bonus.id }} : {{ bonus.type }} {{ bonus.a }}&nbsp;</span>
						<span>{{ bonus.description }}</span>
						<span v-if="bonus.names.length > 1" class="text-secondary  hidden group-hover:inline"> ({{ bonus.names.join(', ') }})</span>
					</li>
				</UIStack>
			</ul>
		</UIStack>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { BonusType, CivAgeName, EffectDescription, CivAge } from '/@/models/types'
import { useStore } from '/@/models/store'

import UIStack from '/@/views/ui/Stack.vue'
import CivIcon from '/@/views/components/CivIcon.vue'

import FocusRow from './FocusRow.vue'

export default defineComponent({
	components: {
		CivIcon,
		FocusRow,
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
			CivAgeName,
		}
	},
})
</script>

<style lang="postcss" scoped>
.bonus-icon {
	@apply inline w-5 h-5 mr-px;
}
</style>
