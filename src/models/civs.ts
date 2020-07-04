import { Focus, ResourceTypeInfo, CivAge, UnitAttribute, UnitAttributeInfo, UnitClass, EffectDescription } from '/@/models/types'

import civs from '/@/assets/data/civs'
import techs from '/@/assets/data/techs'
import units from '/@/assets/data/units'

import { EffectCommandData, TechData, CostData, EffectType, UnitData } from '/@/assets/types'
import type { CivData } from '/@/assets/types'

const primaryFocuses: {[key: string]: Focus[]} = {
	'Aztecs': [Focus.Monk, Focus.Infantry],
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

function getFocusesFor (name: string, type: number, a: number, b: number, c: number, d: number) {
	switch (type) {
		case EffectType.UnitAvailable:
			const unit = units[b]
			if (!unit) {
				// console.error('Unknown unit', b, name, type, a, b, c, d)
				break
			}
			const unitClass = UnitClass[unit.class]
			if (!unitClass) {
				console.error('Unknown UnitClass', unit.name, unit.class, name, type, a, b, c, d)
				return []
			}
			return unitClass.focuses
		case EffectType.ResourceMultiplier:
			const resourceInfo = ResourceTypeInfo[a]
			if (resourceInfo) {
				return resourceInfo.focuses
			}
			console.error('Unknown ResourceTypeInfo', a, name, type, a, b, c, d)
			break
		}
		return []
}

const removePrefixes = [
	'Elite ',
	'Fortified ',
	'Heavy ',
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
	id: number //TODO dev only
	team: boolean
	focuses: Focus[]

	type: number
	a: number
	b: number
	c: number
	d: number

	constructor (id: number, [ type, a, b, c, d ]: EffectCommandData) {
		this.id = id
		const isTeam = type >= 10 && type < 20
		this.team = isTeam
		this.type = isTeam ? type - 10 : type
		this.a = a
		this.b = b
		this.c = c
		this.d = d
		this.focuses = getFocusesFor(name, type, a, b, c, d)
	}

	private makeDescription (text: string, age: CivAge | undefined, modifyAge?: boolean): EffectDescription {
		return {
			id: this.id,
			text,
			age: age ?? CivAge.Dark,
			modifyAge,
			type: this.type,
			a: this.a,
			b: this.b,
			c: this.c,
			d: this.d,
		}
	}

	getDescription (minimumAge?: CivAge): EffectDescription | null {
		let amountDescription
		switch (this.type) {

		case EffectType.UnitEnable:
			const enableUnit = units[this.a]
			if (!enableUnit) {
				console.error(this.id, 'Unknown unit', this.a, this.type, this.a, this.b, this.c, this.d)
				break
			}
			const enabled = this.b === 1
			return this.makeDescription(`${getDisplayNameFor(enableUnit)} ${enabled ? 'available' : 'disabled'}`, minimumAge)

		case EffectType.UnitAvailable:
			const availableUnit = units[this.b]
			if (!availableUnit) {
				console.error(this.id, 'Unknown unit', this.b, this.type, this.a, this.b, this.c, this.d)
				break
			}
			return this.makeDescription(`${getDisplayNameFor(availableUnit)} available`, minimumAge)

		case EffectType.UnitModifier:
			if (this.d > 0b11111111) {
				const toClass = UnitClass[this.d >>> 8]
				if (!toClass) {
					console.error(this.id, 'Unknown UnitClass', this.d, this.type, this.a, this.b, this.c, this.d)
					break
				}
				const value = this.d & 0b0000000011111111
				amountDescription = `+${value} to ${toClass.name}`
			} else {
				amountDescription = `+${this.d}`
			}
		case EffectType.UnitSetModifier:
			if (!amountDescription) {
				amountDescription = `to ${this.d}`
			}
		case EffectType.UnitMultiplier:
			const attribute = this.c
			const proportion = this.d
			const unitAttribute = UnitAttributeInfo[attribute]
			if (!amountDescription) {
				amountDescription = `${proportion > 1 ? '+' : ''}${Math.round((proportion - 1) * 100)}%`
			}
			const multipliedUnit = units[this.a]
			const unitClass = UnitClass[this.b]

			if (!multipliedUnit && !unitClass) {
				console.error(this.id, this.a !== -1 ? `Unknown Unit ${this.a}` : `Unknown UnitClass ${this.b}`, this.type, this.a, this.b, this.c, this.d)
				break
			}
			if (!unitAttribute) {
				console.error(this.id, 'Unknown UnitAttributeInfo', this.c, this.type, this.a, this.b, this.c, this.d)
			}
			const name = multipliedUnit ? getDisplayNameFor(multipliedUnit) : unitClass.name
			return this.makeDescription(`${name} ${unitAttribute} ${amountDescription}`, minimumAge)

		case EffectType.ResourceModifier:
			if (this.a === 178 || this.a === 179) {
				break
			}
			if (this.a === 210) {
				return this.makeDescription('Relics visible on map', minimumAge)
			}
			amountDescription = `+${this.d}`
		case EffectType.ResourceMultiplier:
			const resourceInfo = ResourceTypeInfo[this.a]
			if (!resourceInfo) {
				console.error(this.id, 'Unknown ResourceTypeInfo', this.a, this.type, this.a, this.b, this.c, this.d)
				break
			}
			if (!amountDescription) {
				amountDescription = `x${this.d}`
			}
			return this.makeDescription(`${resourceInfo.name} ${amountDescription}`, getAgeFrom(resourceInfo))

		case EffectType.ModifyTechTime:
			amountDescription = 'time'
		case EffectType.ModifyTech:
			const techModify = techs[this.a]
			if (!amountDescription) {
				const techResourceInfo = ResourceTypeInfo[this.b]
				if (!techResourceInfo) {
					console.error(this.id, 'Unknown ResourceTypeInfo', this.b, this.type, this.a, this.b, this.c, this.d)
					break
				}
				amountDescription = `${techResourceInfo.name} cost`
			}
			const prefix = `${techModify.name} ${this.d === 0 ? 'remove' : 'change'}`
			return this.makeDescription(`${prefix} ${amountDescription}${this.d === 0 ? '' : ' to ' + this.d}`, getAgeFrom(techModify))

		case EffectType.DisableTech:
			const techDisable = techs[this.d]
			const age = getAgeFrom(techDisable)
			return this.makeDescription('', age === CivAge.Dark ? CivAge.Feudal : (age === CivAge.Feudal ? CivAge.Castle : CivAge.Imperial), true)

		default:
			console.error(this.id, 'Unknown EffectType', this.type, this.type, this.a, this.b, this.c, this.d)
		}
		return null
	}
}

class EffectCommandList {
	id: number
	commands: EffectCommand[]
	team: boolean
	focuses: Focus[]

	constructor (id: number, name: string, commands: EffectCommandData[]) {
		this.id = id
		this.commands = commands.map(command => new EffectCommand(id, command))
		this.team = !!this.commands.find(command => command.team)
		this.focuses = Array.from(new Set(this.commands.flatMap(command => command.focuses)))
	}

	getDescriptions (): EffectDescription[] {
		let previousDescription: EffectDescription | undefined = undefined
		const commands = this.commands
		const descriptions: EffectDescription[] = []
		for (let index = commands.length - 1; index >= 0; index -= 1) {
			const command = commands[index]
			const description = command.getDescription()
			if (!description) {
				continue
			}
			if (previousDescription?.modifyAge) {
				description.age = previousDescription.age
			}
			if (!description.modifyAge) {
				if (!previousDescription || description.text !== previousDescription.text || description.age !== previousDescription.age) {
					descriptions.push(description)
				}
			}
			previousDescription = description
		}
		return descriptions
	}

	hasFocus (focus: Focus) {
		return this.focuses.includes(focus)
	}
}

const techDescriptions: {[name: string]: [string, CivAge]} = {
	'Atlatl': ['Skirmishers attack +1/range +1', CivAge.Castle],
	'C-Bonus, +5 monk HP': ['Monk HP +5 per Monastery technology researched', CivAge.Castle],
	'C-Bonus, Start w/ 6 villagers': ['Start with +3 villagers', CivAge.Dark],
	'': ['', CivAge.Castle],
}

export class CivTech {
	id: number
	name: string
	team: boolean
	building: number | null
	requires: number[]
	age: CivAge
	costs: CostData[]
	time: number
	icon: number | null
	commandList: EffectCommandList

	constructor ({ id, name, building, requires, costs, time, icon, effect }: TechData) {
		this.id = id
		this.name = name
		this.building = building
		this.requires = requires
		this.team = effect?.commands.find(command => command[0] >= 10 && command[0] <= 16) !== undefined
		this.age = getAgeFrom(this)
		this.costs = costs
		this.time = time
		this.icon = icon
		this.commandList = new EffectCommandList(effect?.id ?? -1, name, effect?.commands ?? [])
	}

	getDescription (): EffectDescription | null {
		const commands = this.commandList.commands
		if (commands.length === 1) {
			return commands[0].getDescription(this.age)
		}
		let text
		let age = CivAge.Dark
		let preset = techDescriptions[this.id]
		if (preset) {
			text = preset[0]
			age = preset[1]
		} else {
			// console.error(this.id, 'No command', this.building, this.requires, this.costs, this.time, this.icon)
			// console.log(this.commandList.commands)
			text = this.name
		}
		return {
			id: this.id,
			text,
			age,
			type: 0,
			a: 0,
			b: 0,
			c: 0,
			d: 0,
		}
	}
}

export function sortByName (a: {name: string}, b: {name: string}) {
	return a.name.localeCompare(b.name)
}

export class CivTechList {
	techs: CivTech[]

	constructor (techIDs: number[]) {
		this.techs = techIDs.map(techID => new CivTech(techs[techID]))
	}

	getDescriptions (): EffectDescription[] {
		let previousDescription: EffectDescription | undefined = undefined
		const techs = this.techs
		const descriptions: EffectDescription[] = []
		for (let index = techs.length - 1; index >= 0; index -= 1) {
			const tech = techs[index]
			const description = tech.getDescription()
			if (!description) {
				continue
			}
			const icon = tech.icon
			if (icon === 33 || icon === 107) {
				description.age = icon === 33 ? CivAge.Castle : CivAge.Imperial
				description.icon = icon
			}
			if (!previousDescription || description.text !== previousDescription.text) {
				descriptions.push(description)
			}
			previousDescription = description
		}
		return descriptions
	}
}
export class CivEntry {
	name: string
	focuses: Focus[]
	teamBonus: EffectCommandList
	uniqueBonus: EffectCommandList
	uniqueTechs: CivTechList

	constructor (data: CivData) {
		this.name = data.name
		this.focuses = primaryFocuses[name] ?? []
		this.teamBonus = new EffectCommandList(data.teamBonuses?.id ?? -1, name, data.teamBonuses?.commands ?? [])
		this.uniqueBonus = new EffectCommandList(data.modify.id, name, data.modify.commands)
		this.uniqueTechs = new CivTechList(data.uniqueTechIDs.filter(techID => techs[techID]))
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
