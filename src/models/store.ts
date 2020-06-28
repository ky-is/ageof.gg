import { reactive, computed } from "vue"
import { CivilizationBonusesEntry } from "./civs/bonuses"

interface StoreState {
	selectedCiv: {
		hovered: CivilizationBonusesEntry | null
		clicked: CivilizationBonusesEntry | null
	}
}

function createState(): StoreState {
	return {
		selectedCiv: {
			hovered: null,
			clicked: null,
		},
	}
}

const state = reactive(createState())

const store = {
	state,

	commit: {
		selectedCiv (type: 'hovered' | 'clicked', civ: CivilizationBonusesEntry | null) {
			state.selectedCiv[type] = civ
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
