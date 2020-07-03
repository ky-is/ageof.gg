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
			const resource = ResourceFocus[a]
			if (resource) {
				return resource.focuses
			}
			console.error('Unknown ResourceFocus', a, name, type, a, b, c, d)
			break
		}
		return []
}

const removePrefixes = [
	'Elite ',
	'Fortified ',
	'Rice ',
]

const UnitAttributeDescription: {[id: number]: string} = {
	[UnitAttribute.HP]: 'HP',
	[UnitAttribute.LineOfSight]: 'line of sight',
	[UnitAttribute.Speed]: 'Speed',
	[UnitAttribute.Attack]: 'attack',
	[UnitAttribute.WorkRate]: 'work rate',
	[UnitAttribute.CarryCapacity]: 'carry capacity',
	[UnitAttribute.SearchRadius]: 'line of sight', // 'search radius'
	[UnitAttribute.Cost]: 'costs',
	[UnitAttribute.BuildTime]: 'build time',
}

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
	name: string
	focuses: Focus[]

	type: number
	a: number
	b: number
	c: number
	d: number

	constructor (name: string, [ type, a, b, c, d ]: EffectCommandData) {
		this.name = name
		this.type = type
		this.a = a
		this.b = b
		this.c = c
		this.d = d
		this.focuses = getFocusesFor(name, type, a, b, c, d)
	}

	private makeDescription (text: string, age: CivAge | undefined, modifyAge?: boolean): EffectDescription {
		return {
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
			const enabled = this.b === 1
			return this.makeDescription(`${getDisplayNameFor(enableUnit)} ${enabled ? 'available' : 'disabled'}`, minimumAge)
		case EffectType.UnitAvailable:
			const availableUnit = units[this.b]
			return this.makeDescription(`${getDisplayNameFor(availableUnit)} available`, minimumAge)
		case EffectType.UnitModifier:
			if (this.d > 0b11111111) {
				const toClass = UnitClass[this.d >>> 8]
				if (!toClass) {
					console.error('Unknown UnitClass', this.d, this.name, this.type, this.a, this.b, this.c, this.d)
				}
				const value = this.d & 0b0000000011111111
				amountDescription = `+${value} to ${toClass.name}`
			} else {
				amountDescription = `+${this.d}`
			}
		case EffectType.UnitMultiplier:
			const attribute = this.c
			const proportion = this.d
			const unitAttribute = UnitAttributeDescription[attribute]
			if (!amountDescription) {
				amountDescription = `${proportion > 1 ? '+' : ''}${Math.round((proportion - 1) * 100)}%`
			}
			if (attribute === UnitAttribute.BuildTime && this.name === 'Aztecs') {
				return this.makeDescription(`Military units ${unitAttribute} ${amountDescription}`, minimumAge)
			}
			const multipliedUnit = units[this.a]
			const unitClass = UnitClass[this.b]

			if (!multipliedUnit && !unitClass) {
				console.error(this.a !== -1 ? `Unknown Unit ${this.a}` : `Unknown UnitClass ${this.b}`, this.name, this.type, this.a, this.b, this.c, this.d)
				break
			}
			if (!unitAttribute) {
				console.error('Unknown UnitAttributeDescription', this.c, this.name, this.type, this.a, this.b, this.c, this.d)
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
			const resourceFocus = ResourceFocus[this.a]
			if (!resourceFocus) {
				console.error('Unknown ResourceFocus', this.a, this.name, this.type, this.a, this.b, this.c, this.d)
				break
			}
			if (!amountDescription) {
				amountDescription = `x${this.d}`
			}
			return this.makeDescription(`${resourceFocus.name} ${amountDescription}`, getAgeFrom(resourceFocus))
		case EffectType.ModifyTechTime:
			amountDescription = 'time'
		case EffectType.ModifyTech:
			const techModify = techs[this.a]
			if (!amountDescription) {
				const techResource = ResourceType[this.b]
				if (!techResource) {
					console.error('Unknown ResourceType', this.b, this.name, this.type, this.a, this.b, this.c, this.d)
					break
				}
				amountDescription = `${techResource} cost`
			}
			const prefix = `${techModify.name} ${this.d === 0 ? 'remove' : 'change'}`
			return this.makeDescription(`${prefix} ${amountDescription}${this.d === 0 ? '' : ' to ' + this.d}`, getAgeFrom(techModify))
		case EffectType.DisableTech:
			const techDisable = techs[this.d]
			const age = getAgeFrom(techDisable)
			return this.makeDescription('', age === CivAge.Dark ? CivAge.Feudal : (age === CivAge.Feudal ? CivAge.Castle : CivAge.Imperial), true)
		default:
			console.error('Unknown EffectType', this.type, this.name, this.type, this.a, this.b, this.c, this.d)
		}
		return null
	}
}

export class CommandList {
	commands: EffectCommand[]
	focuses: Focus[]

	constructor (name: string, commands: EffectCommandData[]) {
		this.commands = commands.map(command => new EffectCommand(name, command))
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
	'': ['', CivAge.Castle],
}

export class CivTech {
	name: string
	building: number | null
	requires: number[]
	age: CivAge
	costs: CostData[]
	time: number
	icon: number | null
	commandList: CommandList

	constructor ({ name, building, requires, costs, time, icon, commands }: TechData) {
		this.name = name
		this.building = building
		this.requires = requires
		this.age = getAgeFrom(this)
		this.costs = costs
		this.time = time
		this.icon = icon
		this.commandList = new CommandList(name, commands ?? [])
	}

	getDescription (): EffectDescription | null {
		const commands = this.commandList.commands
		if (commands.length === 1) {
			return commands[0].getDescription(this.age)
		}
		let text
		let age = CivAge.Dark
		let preset = techDescriptions[this.name]
		if (preset) {
			text = preset[0]
			age = preset[1]
		} else {
			console.error('No command', this.name, this.building, this.requires, this.costs, this.time, this.icon)
			console.log(this.commandList.commands)
			text = this.name
		}
		return {
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
		this.techs = techIDs.map(techID => new CivTech(techs[techID])).sort(sortByName)
	}

	getDescriptions (): EffectDescription[] {
		let previousDescription: EffectDescription | undefined = undefined
		const techs = this.techs
		const descriptions: EffectDescription[] = []
		let previousName = ''
		for (let index = techs.length - 1; index >= 0; index -= 1) {
			const tech = techs[index]
			if (tech.name === previousName) {
				continue
			}
			previousName = tech.name
			const description = tech.getDescription()
			if (!description) {
				continue
			}
			const icon = tech.icon
			if (icon === 33 || icon === 107) {
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
	teamBonus: CommandList
	uniqueBonus: CommandList
	uniqueTechs: CivTechList

	constructor (data: CivData) {
		const name = mapCivNames[data.name] ?? data.name
		this.name = name
		this.focuses = primaryFocuses[name] ?? []
		this.teamBonus = new CommandList(name, data.teamBonuses)
		this.uniqueBonus = new CommandList(name, data.modify)
		this.uniqueTechs = new CivTechList(data.uniqueTechs.filter(techID => techs[techID]))
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
