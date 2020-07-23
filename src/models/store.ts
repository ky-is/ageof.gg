import { computed, reactive, readonly } from 'vue'

import type { CivData } from '/@/assets/types'

function createState() {
	return {
		selectedCiv: {
			hovered: null as CivData | null,
			clicked: null as CivData | null,
		},
		teamCivs: [
			null as CivData | null,
			null as CivData | null,
			null as CivData | null,
			null as CivData | null,
		],
	}
}

const state = reactive(createState())

const store = {
	state: readonly(state),

	commit: {
		selectCiv (type: 'hovered' | 'clicked', civ: CivData | null) {
			state.selectedCiv[type] = civ
		},

		addTeamCiv (teamCiv: CivData) {
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
		setTeamCivAt (index: 0 | 1 | 2 | 3, teamCiv: CivData) {
			store.commit.removeTeamCiv(teamCiv)
			state.teamCivs[index] = teamCiv
		},
		removeTeamCiv (teamCiv: CivData) {
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
			return (state.selectedCiv.hovered ?? state.selectedCiv.clicked) as CivData | null
		}),
	},
}

export function useStore() {
	return store
}
