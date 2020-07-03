import { Focus } from '/@/models/types'

import civs from '/@/assets/data/civs'
import techs from '/@/assets/data/techs'

import { EffectCommandData, TechData, CostData } from '/@/assets/types'
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

export class CommandList {
	commands: EffectCommand[]
	focuses: Focus[]

	constructor (commands: EffectCommandData[]) {
		this.commands = commands.map(command => new EffectCommand(command))
		this.focuses = []
	}

	hasFocus (focus: Focus) {
		return false
	}
}

export class CivTech {
	name: string
	building: number | null
	requirements: number[]
	costs: CostData[]
	time: number
	icon: number | null
	commands: CommandList

	constructor ({ name, building, requires, costs, time, icon, commands }: TechData) {
		this.name = name
		this.building = building
		this.requirements = requires
		this.costs = costs
		this.time = time
		this.icon = icon
		this.commands = new CommandList(commands ?? [])
	}
}

export class CivEntry {
	name: string
	focuses: Focus[]
	teamBonus: CommandList
	uniqueBonus: CommandList
	uniqueTechs: CivTech[]

	constructor (data: CivData) {
		const name = mapCivNames[data.name] ?? data.name
		this.name = name
		this.focuses = primaryFocuses[name] ?? []
		this.teamBonus = new CommandList(data.teamBonuses)
		this.uniqueBonus = new CommandList(data.modify)
		this.uniqueTechs = data.uniqueTechs
			.filter(techID => techs[techID])
			.map(techID => new CivTech(techs[techID]))
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
