import { Focus, ResourceFocus, ResourceType, CivAge, UnitAttribute, UnitClass, EffectDescription } from '/@/models/types'

import civs from '/@/assets/data/civs'
import techs from '/@/assets/data/techs'
import units from '/@/assets/data/units'

import { EffectCommandData, TechData, CostData, EffectType, UnitData } from '/@/assets/types'
import type { CivData } from '/@/assets/types'


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

function getAgeFrom ({ requires }: {requires: number[]}): CivAge {
	const ageNumber = requires.find(requirement => requirement >= 101 && requirement <= 104)
	switch (ageNumber) {
	case 101:
		return CivAge.Feudal
	case 102:
		return CivAge.Castle
	case 103:
		return CivAge.Imperial
	case 104:
		return CivAge.Dark
	default:
		return CivAge.Dark
	}
}

function getFocusesFor (type: number, a: number, b: number, c: number, d: number) {
	switch (type) {
		case EffectType.UnitAvailable:
			const unit = units[b]
			if (!unit) {
				console.error('Unknown unit', b, '()', type, a, b, c, d)
				break
			}
			const unitClass = UnitClass[unit.class]
			if (!unitClass) {
				console.error('Unknown UnitClass', unit.name, unit.class)
				return []
			}
			return unitClass.focuses
		case EffectType.ResourceMultiplier:
			const resource = ResourceFocus[a]
			if (resource) {
				return resource.focuses
			}
			console.error('Unknown ResourceFocus', a);
			break
		}
		return []
}

const removePrefixes = [
	'Fortified ',
	'Rice ',
]

function getDisplayNameFor ({ name }: UnitData) {
	for (const prefix of removePrefixes) {
		if (name.startsWith(prefix)) {
			name = name.slice(prefix.length)
			break
		}
	}
	if (name.startsWith('Palisade')) {
		return 'Palisade Wall'
	}
	return name.split(' (')[0]
}

export class EffectCommand {
	focuses: Focus[]

	type: number
	a: number
	b: number
	c: number
	d: number

	constructor ([ type, a, b, c, d ]: EffectCommandData) {
		this.type = type
		this.a = a
		this.b = b
		this.c = c
		this.d = d
		this.focuses = getFocusesFor(type, a, b, c, d)
	}

	getDescription (): EffectDescription {
		let amountDescription
		switch (this.type) {
		case EffectType.UnitAvailable:
			const availableUnit = units[this.b]
			return {
				text: `${getDisplayNameFor(availableUnit)} available`,
				age: CivAge.Dark,
			}
		case EffectType.UnitModifier:
			if (this.d > 0b11111111) {
				const toClass = UnitClass[this.d >>> 8]
				if (!toClass) {
					console.error('Unknown UnitClass', this.d);
				}
				const value = this.d & 0b0000000011111111
				amountDescription = `+${value} to ${toClass.name}`
			} else {
				amountDescription = `+${this.d}`
			}
		case EffectType.UnitMultiplier:
			const multipliedUnit = units[this.a]
			const unitClass = UnitClass[this.b]
			if (!multipliedUnit && !unitClass) {
				console.error(this.a !== -1 ? `Unknown Unit ${this.a}` : `Unknown UnitClass ${this.b}`);
				break
			}
			const attribute = UnitAttribute[this.c]
			if (!attribute) {
				console.error('Unknown UnitAttribute', this.c);
			}
			const name = multipliedUnit ? getDisplayNameFor(multipliedUnit) : unitClass.name
			if (!amountDescription) {
				amountDescription = `${this.d > 1 ? '+' : ''}${Math.round((this.d - 1) * 100)}%`
			}
			return {
				text: `${name} ${attribute} ${amountDescription}`,
				age: CivAge.Dark,
			}
		case EffectType.ResourceModifier:
			if (this.a === 178 || this.a === 179) {
				break
			}
			if (this.a === 210) {
				return {
					text: 'Relics visible on map',
					age: CivAge.Dark,
				}
			}
			amountDescription = `+${this.a}`
		case EffectType.ResourceMultiplier:
			const resourceFocus = ResourceFocus[this.a]
			if (!resourceFocus) {
				console.error('Unknown ResourceFocus', this.a)
				break
			}
			if (!amountDescription) {
				amountDescription = `x${this.d}`
			}
			return {
				text: `${resourceFocus.name} ${amountDescription}`,
				age: getAgeFrom(resourceFocus),
			}
		case EffectType.ModifyTechTime:
			amountDescription = 'time'
		case EffectType.ModifyTech:
			const techModify = techs[this.a]
			if (!amountDescription) {
				const techResource = ResourceType[this.b]
				if (!techResource) {
					console.error('Unknown ResourceType', this.b)
					break
				}
				amountDescription = `${techResource} cost`
			}
			const prefix = `${techModify.name} ${this.d === 0 ? 'remove' : 'change'}`
			return {
				text: `${prefix} ${amountDescription}${this.d === 0 ? '' : ' to ' + this.d}`,
				groupBy: prefix,
				age: getAgeFrom(techModify),
			}
		case EffectType.DisableTech:
			const techDisable = techs[this.d]
			const age = getAgeFrom(techDisable)
			return {
				text: '',
				modifyAge: age === CivAge.Dark ? CivAge.Feudal : (age === CivAge.Feudal ? CivAge.Castle : CivAge.Imperial),
				age,
			}
		default:
			console.error('Unknown EffectType', this.type, this.a, this.b, this.c, this.d)
		}
		return {
			text: '',
			age: null,
		}
	}
}

export class CommandList {
	commands: EffectCommand[]
	focuses: Focus[]

	constructor (commands: EffectCommandData[]) {
		this.commands = commands.map(command => new EffectCommand(command))
		this.focuses = Array.from(new Set(this.commands.flatMap(command => command.focuses)))
	}

	getDescriptions (): EffectDescription[] {
		const descriptions = this.commands.map(command => command.getDescription())
		for (let index = descriptions.length - 1; index >= 0; index -= 1) {
			const description = descriptions[index]
			if (index > 0) {
				for (let nextIndex = index - 1; index >= 0; index -= 1) {
					const nextDescription = descriptions[nextIndex]
					if (description.modifyAge) {
						nextDescription.age = description.modifyAge
					} else if (description.text.toLowerCase() === nextDescription.text.toLowerCase() && description.age === nextDescription.age) {
						descriptions.splice(index, 1)
						break
					}
				}
			}
			if (!description.text) {
				descriptions.splice(index, 1)
				continue
			}
		}
		return descriptions
	}

	hasFocus (focus: Focus) {
		return this.focuses.includes(focus)
	}
}

export class CivTech {
	name: string
	building: number | null
	requires: number[]
	costs: CostData[]
	time: number
	icon: number | null
	commands: CommandList

	constructor ({ name, building, requires, costs, time, icon, commands }: TechData) {
		this.name = name
		this.building = building
		this.requires = requires
		this.costs = costs
		this.time = time
		this.icon = icon
		this.commands = new CommandList(commands ?? [])
	}

	getDescription (): EffectDescription {
		return {
			text: this.name,
			age: getAgeFrom(this),
		}
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
