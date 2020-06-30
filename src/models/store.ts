import { computed, reactive, readonly } from 'vue'

import { CivBonusesEntry } from '/@/models/types'

function createState() {
	return {
		selectedCiv: {
			hovered: null as CivBonusesEntry | null,
			clicked: null as CivBonusesEntry | null,
		},
		teamCivs: [
			null as CivBonusesEntry | null,
			null as CivBonusesEntry | null,
			null as CivBonusesEntry | null,
			null as CivBonusesEntry | null,
		],
	}
}

const state = reactive(createState())

const store = {
	state: readonly(state),

	commit: {
		selectedCiv (type: 'hovered' | 'clicked', civ: CivBonusesEntry | null) {
			state.selectedCiv[type] = civ
		},

		addTeamCiv (teamCiv: CivBonusesEntry) {
			for (const civ of state.teamCivs) {
				if (civ === teamCiv) {
					return
				}
			}
			for (const index in state.teamCivs) {
				const civ = state.teamCivs[index]
				if (civ === null) {
					state.teamCivs[index] = teamCiv
					break
				}
			}
		},
		setTeamCivAt (index: 0 | 1 | 2 | 3, teamCiv: CivBonusesEntry) {
			store.commit.removeTeamCiv(teamCiv)
			state.teamCivs[index] = teamCiv
		},
		removeTeamCiv (teamCiv: CivBonusesEntry) {
			state.selectedCiv.hovered = null
			for (const index in state.teamCivs) {
				const civ = state.teamCivs[index]
				if (civ && civ.name === teamCiv.name) {
					state.teamCivs[index] = null
					break
				}
			}
		},
	},

	getters: {
		selectedCiv: computed(() => {
			return state.selectedCiv.hovered || state.selectedCiv.clicked
		}),
	},
}

export function useStore() {
	return store
}
