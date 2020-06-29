<template>
	<div class="w-full bg-gray-700">
		<div v-if="civ" class="m-4">
			<div class="flex flex-wrap">
				<CivIcon :civ="civ" class="w-24 h-24 -ml-2" />
				<div class="ml-1 leading-tight">
					<h2 class="text-2xl font-light">{{ civ.name }}</h2>
					<table>
						<FocusRow title="major" color="text-bonus-major" :focuses="civ.focuses" />
						<FocusRow title="minor" color="text-bonus-general" :focuses="minorFocuses" />
						<FocusRow title="team" color="text-bonus-team" :focuses="teamFocuses" />
					</table>
				</div>
				<div class="ml-4  flex justify-center items-center">
					<button class="ui-button my-2" @click="commit.addTeamCiv(civ)">+ to team</button>
				</div>
			</div>
			<ul class="mt-2 list-disc list-inside">
				<li v-for="bonus in civ.bonuses" :key="bonus.description">
					{{ bonus.description }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import FocusRow from './FocusRow.vue'
import CivIcon from '/@/views/components/CivIcon.vue'

import { useStore } from '/@/models/store'

export default defineComponent({
	components: {
		CivIcon,
		FocusRow,
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

		return {
			civ,
			minorFocuses,
			teamFocuses,
			commit: store.commit,
		}
	},
})
</script>
