import { reactive, computed } from "vue"
import { CivilizationBonusesEntry } from "./civs/bonuses"

function createState() {
	return {
		selectedCiv: {
			hovered: null as CivilizationBonusesEntry | null,
			clicked: null as CivilizationBonusesEntry | null,
		},
		teamCivs: [
			null as CivilizationBonusesEntry | null,
			null as CivilizationBonusesEntry | null,
			null as CivilizationBonusesEntry | null,
			null as CivilizationBonusesEntry | null,
		],
	}
}

const state = reactive(createState())

const store = {
	state,

	commit: {
		selectedCiv (type: 'hovered' | 'clicked', civ: CivilizationBonusesEntry | null) {
			state.selectedCiv[type] = civ
		},

		addTeamCiv (teamCiv: CivilizationBonusesEntry | null) {
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
