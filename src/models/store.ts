import { computed, reactive, readonly } from 'vue'

import type { CivEntry } from '/@/models/civs'

function createState() {
	return {
		selectedCiv: {
			hovered: null as CivEntry | null,
			clicked: null as CivEntry | null,
		},
		teamCivs: [
			null as CivEntry | null,
			null as CivEntry | null,
			null as CivEntry | null,
			null as CivEntry | null,
		],
	}
}

const state = reactive(createState())

const store = {
	state: readonly(state),

	commit: {
		selectCiv (type: 'hovered' | 'clicked', civ: CivEntry | null) {
			state.selectedCiv[type] = civ
		},

		addTeamCiv (teamCiv: CivEntry) {
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
		setTeamCivAt (index: 0 | 1 | 2 | 3, teamCiv: CivEntry) {
			store.commit.removeTeamCiv(teamCiv)
			state.teamCivs[index] = teamCiv
		},
		removeTeamCiv (teamCiv: CivEntry) {
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
			return state.selectedCiv.hovered ?? state.selectedCiv.clicked
		}),
	},
}

export function useStore() {
	return store
}
