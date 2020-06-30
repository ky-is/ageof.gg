<template>
	<div class="bg-gray-700">
		<UIStack v-if="civ" direction="col" class="mx-4 my-2  group">
			<UIStack direction="row" wrap>
				<CivIcon :civ="civ" dragAction="copy" class="w-24 h-24 -ml-2" />
				<UIStack direction="col" class="ml-1">
					<h2 class="text-2xl font-light">{{ civ.name }}</h2>
					<table class="leading-tight">
						<FocusRow title="major" color="text-bonus-major" :focuses="civ.focuses" />
						<FocusRow title="minor" color="text-bonus-general" :focuses="minorFocuses" />
						<FocusRow title="team" color="text-bonus-team" :focuses="teamFocuses" />
					</table>
				</UIStack>
				<UIStack direction="row" alignment="center" justification="center" class="ml-4">
					<button class="ui-button my-2" @click="commit.addTeamCiv(civ)">+ to team</button>
				</UIStack>
			</UIStack>
			<ul class="mt-2 list-disc list-inside">
				<UIStack v-for="[label, bonuses] in bonusGroups" :key="label" direction="col">
					<h3 class="smallcaps" :class="`text-bonus-${label}`">{{ label }}</h3>
					<li v-for="bonus in bonuses" :key="bonus.description">
						<img v-if="bonus.getBonusTechIcon()" :src="`/images/techs/${bonus.getBonusTechIcon()}.png`" class="inline w-5 h-5">
						<img v-if="bonus.strengthByAge" :src="`/images/ages/${bonus.getFirstAvailableAge()}.png`" class="inline w-5 h-5">
						<span v-if="bonus.name" class="text-secondary text-bold">{{ bonus.name }}: </span>
						<span>{{ bonus.description }}</span>
						<span v-if="bonus.clarification" class="text-secondary  hidden group-hover:inline"> ({{ bonus.clarification }})</span>
					</li>
				</UIStack>
			</ul>
		</UIStack>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { BonusType, CivBonus } from '/@/models/types'
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

		const minorFocuses = computed(() => {
			const civilization = civ.value
			if (!civilization) {
				return []
			}
			return Array.from(new Set(civilization.bonuses.filter(bonus => !bonus.team).flatMap(bonus => bonus.focuses).filter(focus => !civilization.focuses.includes(focus))))
		})
		const teamFocuses = computed(() => {
			return civ.value?.bonuses.filter(bonus => bonus.team).flatMap(bonus => bonus.focuses)
		})

		const bonusGroups = computed(() => {
			const civilization = civ.value
			if (!civilization) {
				return []
			}
			const bonusGroups: [string, CivBonus[]][] = [['team', []], ['general', []], ['castle', []]]
			for (const bonus of civilization.bonuses) {
				let group
				if (bonus.team) {
					group = bonusGroups[0]
				} else if (bonus.type !== undefined && bonus.type !== BonusType.Trait) {
					group = bonusGroups[2]
				} else {
					group = bonusGroups[1]
				}
				group[1].push(bonus)
			}
			return bonusGroups
		})

		return {
			civ,
			minorFocuses,
			teamFocuses,
			bonusGroups,
			commit: store.commit,
		}
	},
})
</script>
