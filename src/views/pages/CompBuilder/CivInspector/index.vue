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
							:src="`/images/ages/${bonus.age}.png`" :alt="bonus.age + ' age'"
							class="bonus-icon"
						>
						<!-- <img
							v-if="bonus.getBonusTechAge()"
							:src="`/images/techs/unique-${bonus.getBonusTechAge()}.png`" :alt="`${bonus.getBonusTechAge()} age unique tech`"
							class="bonus-icon"
						> -->
						<span v-if="bonus.name" class="text-secondary text-bold">{{ bonus.name }}: </span>
						<span>{{ bonus.text }}</span>
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
import type { EffectDescription } from '/@/models/types'
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
			const groupedBonuses: [string, EffectDescription[]][] = [
				['team', civ.value.teamBonus.getDescriptions()],
				['general', civ.value.uniqueBonus.getDescriptions()],
				['castle', civ.value.uniqueTechs.map(tech => tech.getDescription())],
			]
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
