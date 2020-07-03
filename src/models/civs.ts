import type {  } from '/@/models/types'
import { Focus } from '/@/models/types'

import civs from '/@/assets/data/civs'
import { EffectCommandData } from '/@/assets/types'
import type { CivData, EffectData } from '/@/assets/types'

const primaryFocuses: {[key: string]: Focus[]} = {
	'Aztecs': [Focus.Monk, Focus.Infantry],
}

const mapCivNames: {[key: string]: string} = {
	British: 'Britons',
	Byzantine: 'Byzantines',
	French: 'Franks',
	Ethopians: 'Ethiopians', //cspell:disable-line
	Mayan: 'Mayans',
}

export class EffectCommand {
	constructor ([ type, a, b, c, d ]: EffectCommandData) {

	}
}

export class CivBonus {
	team: boolean
	commands: EffectCommand[]
	focuses: Focus[]

	constructor ({ commands }: EffectData, forTeam: boolean) {
		this.team = forTeam
		this.commands = commands.map(command => new EffectCommand(command))
		this.focuses = []
	}

	hasFocus (focus: Focus) {
		return false
	}
}

export class CivEntry {
	name: string
	focuses: Focus[]
	teamBonus: CivBonus
	uniqueBonus: CivBonus

	constructor (data: CivData) {
		const name = mapCivNames[data.name] ?? data.name
		this.name = name
		this.focuses = primaryFocuses[name] ?? []
		this.teamBonus = new CivBonus({ name: '', commands: data.teamBonuses }, true)
		this.uniqueBonus = new CivBonus({ name: '', commands: data.modify }, false)
	}

	getSecondaryFocuses () {
		const secondaryFocuses = new Set(this.teamBonus.focuses.concat(this.uniqueBonus.focuses))
		this.focuses.forEach(primaryFocus => secondaryFocuses.delete(primaryFocus))
		return Array.from(secondaryFocuses)
	}

	hasSecondaryFocus (focus: Focus) {
		return this.teamBonus.hasFocus(focus) || this.uniqueBonus.hasFocus(focus)
	}
}

export const civEntries = civs.map(civData => new CivEntry(civData))
