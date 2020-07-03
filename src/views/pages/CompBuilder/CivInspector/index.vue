<template>
	<div class="bg-gray-800">
		<UIStack v-if="civ" direction="col" class="mx-4 my-2  group">
			<UIStack direction="row" wrap>
				<CivIcon :civ="civ" dragAction="copy" class="w-24 h-24 -ml-2" />
				<UIStack direction="col" class="ml-1">
					<h2 class="text-2xl font-light">{{ civ.name }}</h2>
					<table class="leading-tight">
						<FocusRow title="major" color="text-bonus-major" :focuses="civ.focuses" />
						<FocusRow title="minor" color="text-bonus-general" :focuses="civ.getSecondaryFocuses()" />
						<FocusRow title="team" color="text-bonus-team" :focuses="civ.teamBonus.focuses" />
					</table>
				</UIStack>
				<UIStack direction="row" alignment="center" justification="center" class="ml-4">
					<button class="ui-button my-2" @click="commit.addTeamCiv(civ)">+ to team</button>
				</UIStack>
			</UIStack>
			<ul class="mt-2 list-disc list-inside">
				<UIStack v-for="[label, bonuses] in groupedBonuses" :key="label" direction="col">
					<h3 class="smallcaps" :class="`text-bonus-${label}`">{{ label }}</h3>
					<li v-for="bonus in bonuses" :key="bonus.description">
						<img
							:src="`/images/ages/${bonus.getFirstAvailableAge()}.png`" :alt="bonus.getFirstAvailableAge() + ' age'"
							class="bonus-icon"
						>
						<img
							v-if="bonus.getBonusTechAge()"
							:src="`/images/techs/unique-${bonus.getBonusTechAge()}.png`" :alt="`${bonus.getBonusTechAge()} age unique tech`"
							class="bonus-icon"
						>
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

import { BonusType } from '/@/models/types'
import type { CivBonus } from '/@/models/civs'
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
			const groupedBonuses: [string, CivBonus[]][] = [['team', []], ['general', []], ['castle', []]]
			// for (const bonus of civ.value.bonuses) {
			// 	let group
			// 	if (bonus.team) {
			// 		group = groupedBonuses[0]
			// 	} else if (bonus.type !== undefined && bonus.type !== BonusType.Trait) {
			// 		group = groupedBonuses[2]
			// 	} else {
			// 		group = groupedBonuses[1]
			// 	}
			// 	group[1].push(bonus)
			// }
			return groupedBonuses
		})

		return {
			civ,
			commit: store.commit,
			groupedBonuses,
		}
	},
})
</script>

<style lang="postcss" scoped>
.bonus-icon {
	@apply inline w-5 h-5 mr-px;
}
</style>
