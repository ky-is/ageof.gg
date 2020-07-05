import { Focus, ResourceTypeInfo, CivAge, UnitAttribute, UnitAttributeInfo, UnitClass, EffectDescription } from '/@/models/types'

import civs from '/@/assets/data/civs'
import techs from '/@/assets/data/techs'
import units from '/@/assets/data/units'

import { EffectCommandData, TechData, CostData, EffectType, UnitData } from '/@/assets/types'
import type { CivData } from '/@/assets/types'

const primaryFocuses: {[key: string]: Focus[]} = {
	'Aztecs': [Focus.Monk, Focus.Infantry],
}

interface EffectSummary {
	type: EffectType
	ages?: CivAge[]
	a?: number[]
	b?: number
	c?: number
	skipA?: number[]
	replace?: string //RELEASE hardcoded strings must be validated every new patch
	replaceName?: string
	delete?: boolean
	stack?: number[]
}

const effectSummaries: {[effectID: number]: EffectSummary[]} = {
	2: [ // Indians
		{
			type: 4,
			replaceName: 'Camels',
		},
	],

	6: [ // Magyars
		{
			type: 4,
			replaceName: 'Archers (except skirmishers)',
		},
	],

	10: [ // Italians
		{
			type: 101,
			skipA: [CivAge.Feudal, CivAge.Castle, CivAge.Imperial],
			replace: 'Dock upgrades cost -50%',
		},
		{
			type: 101,
			a: [CivAge.Feudal, CivAge.Castle, CivAge.Imperial],
			replace: 'Advancing to the next age costs -15%',
		},
	],

	49: [ // Ethiopians
		{
			type: 4,
			replaceName: 'Tower/Outpost',
		},
	],

	258: [ // Franks
		{
			type: 103,
			replaceName: 'Farm upgrades',
		},
	],
	403: [ // Franks
		{
			type: 4,
			replaceName: 'Knights',
			// ages: [CivAge.Castle],
		},
	],

	263: [ // Turks
		{
			type: 101,
			replace: 'Gunpowder techs cost -50%',
			// ages: [CivAge.Castle],
		},
		{
			type: 103,
			a: [254],
			replaceName: 'Scout upgrades',
		},
		{
			type: 103,
			a: [428],
			delete: true,
		},
	],
	410: [ // Turks
		{
			type: 5,
			replaceName: 'Gunpowder units',
			ages: [CivAge.Castle],
		},
	],

	304: [ // Chinese
		{
			type: 1,
			delete: true,
		},
	],
	349: [ // Chinese
		{
			type: 1,
			stack: [350, 351], //TODO
			// ages: [CivAge.Feudal],
		},
	],

	342: [ // Goths
		{
			type: 5,
			stack: [765, 767], //TODO
		},
	],

	407: [ // Mongols
		{
			type: 4,
			replaceName: 'Scouts',
		},
	],

	411: [ // Vikings
		{
			type: 5,
			replaceName: 'Docks',
		},
	],

	446: [ // Spanish
		{
			type: 5,
			replaceName: 'Gunpowder',
			ages: [CivAge.Imperial],
		},
		{
			type: 101,
			replaceName: 'Blacksmith upgrades',
		},
	],
	490: [ // Spanish
		{
			type: 5,
			replaceName: 'Trade units',
			ages: [CivAge.Feudal],
		},
	],

	447: [ // Aztecs
		{
			type: 5,
			replaceName: 'Military units',
		},
	],

	449: [ // Mayans
		{
			type: 5,
			c: 13,
			delete: true,
		},
		{
			type: 1,
			b: 0,
			replaceName: 'Resources last',
		},
		{
			type: 5,
			c: 100,
			replaceName: 'Archers',
			stack: [485, 486], //TODO
		},
	],

	649: [ // Malay
		{
			type: 5,
			replaceName: 'Dock',
		},
	],

	652: [ // Vietnamese
		{
			type: 101,
			replaceName: 'Economy upgrades',
		},
	],
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

function getDisplayNameFor (overrideName: string | undefined, { name }: UnitData) {
	if (overrideName) {
		return overrideName
	}
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

function formatDifference (amount: number): string {
	if (amount < 0) {
		return amount.toString()
	}
	return `+${amount}`
}

function formatPercent (proportion: number): string {
	return `${formatDifference(Math.round((proportion - 1) * 100))}%`
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

	private makeDescription (text: string, age: CivAge | undefined, nameable: {name: string} | undefined, modifyAge?: boolean): EffectDescription {
		return {
			id: this.id,
			text,
			ages: [age ?? CivAge.Dark],
			names: nameable ? [nameable.name] : [],
			modifyAge,
			type: this.type,
			a: this.a,
			b: this.b,
			c: this.c,
			d: this.d,
		}
	}

	getDescription (minimumAge?: CivAge, replaceName?: string): EffectDescription | null {
		let amountDescription
		switch (this.type) {

		case EffectType.UnitEnable:
			const enableUnit = units[this.a]
			if (!enableUnit) {
				console.error(this.id, 'Unknown unit', this.a, this.type, this.a, this.b, this.c, this.d)
				break
			}
			const enabled = this.b === 1
			return this.makeDescription(`${getDisplayNameFor(replaceName, enableUnit)} ${enabled ? 'available' : 'disabled'}`, minimumAge, enableUnit)

		case EffectType.UnitAvailable:
			const availableUnit = units[this.b]
			if (!availableUnit) {
				console.error(this.id, 'Unknown unit', this.b, this.type, this.a, this.b, this.c, this.d)
				break
			}
			return this.makeDescription(`${getDisplayNameFor(replaceName, availableUnit)} available`, minimumAge, availableUnit)

		case EffectType.UnitModifier:
			if (this.d > 0b11111111) {
				const toClass = UnitClass[this.d >>> 8]
				if (!toClass) {
					console.error(this.id, 'Unknown UnitClass', this.d, this.type, this.a, this.b, this.c, this.d)
					break
				}
				const value = this.d & 0b0000000011111111
				amountDescription = `${formatDifference(value)} to ${toClass.name}`
			} else {
				amountDescription = formatDifference(this.d)
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
				amountDescription = formatPercent(proportion)
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
			const name = replaceName ? replaceName : (multipliedUnit ? getDisplayNameFor(replaceName, multipliedUnit) : unitClass.name)
			return this.makeDescription(`${name} ${unitAttribute} ${amountDescription}${attribute === UnitAttribute.AccuracyPercent ? '%' : ''}`, minimumAge, multipliedUnit ?? unitClass)

		case EffectType.ResourceModifier:
			amountDescription = this.b ? formatDifference(this.d) : formatPercent(this.d)
		case EffectType.ResourceMultiplier:
			const resourceInfo = ResourceTypeInfo[this.a]
			if (!resourceInfo) {
				console.error(this.id, 'Unknown ResourceTypeInfo', this.a, this.type, this.a, this.b, this.c, this.d)
				break
			}
			if (!amountDescription) {
				amountDescription = formatPercent(this.d)
			}
			return this.makeDescription(`${replaceName ?? resourceInfo.name} ${amountDescription}`, getAgeFrom(resourceInfo), undefined)

		case EffectType.ModifyTechTime:
			amountDescription = 'free'
		case EffectType.ModifyTechCost:
			const techModify = techs[this.a]
			if (!techModify) {
				console.error(this.id, 'Unknown ModifyTechCost', this.a, this.type, this.a, this.b, this.c, this.d)
				break
			}
			if (!amountDescription) {
				const techResourceInfo = ResourceTypeInfo[this.b]
				if (!techResourceInfo) {
					console.error(this.id, 'Unknown ResourceTypeInfo', this.b, this.type, this.a, this.b, this.c, this.d)
					break
				}
				amountDescription = `${techResourceInfo.name} cost free`
			}
			return this.makeDescription(`${replaceName ?? techModify.name} ${amountDescription}${this.d === 0 ? '' : ' ' + formatDifference(this.d)}`, getAgeFrom(techModify), undefined)

		case EffectType.DisableTech:
			const techDisable = techs[this.d]
			if (!techDisable) {
				console.error(this.id, 'Unknown DisableTech', this.d, this.type, this.a, this.b, this.c, this.d)
				break
			}
			const age = getAgeFrom(techDisable)
			return this.makeDescription('', age === CivAge.Dark ? CivAge.Feudal : (age === CivAge.Feudal ? CivAge.Castle : CivAge.Imperial), undefined, true)

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
		const summaries = effectSummaries[this.id]
		let describeCommands = this.commands
		let addDescriptions: EffectDescription[] = []
		for (const command of describeCommands) {
			if (command.type === EffectType.ModifyTechTime) {
				const removeTechID = command.a
				for (let index = describeCommands.length - 1; index >= 0; index -= 1) {
					const command = describeCommands[index]
					if (command.type === EffectType.ModifyTechCost && command.a === removeTechID) {
						describeCommands.splice(index, 1)
					}
				}
			}
		}
		if (summaries) {
			const remainingCommands = new Set(describeCommands)
			for (const summary of summaries) {
				let summaryDescription: EffectDescription | null = null
				for (const command of describeCommands) {
					if (summary.type === command.type) {
						if ((summary.a !== undefined && !summary.a.includes(command.a)) || (summary.b !== undefined && summary.b !== command.b) || (summary.c !== undefined && summary.c !== command.c)) {
							continue
						}
						if (summary.skipA !== undefined && summary.skipA.includes(command.a)) {
							continue
						}
						remainingCommands.delete(command)
						if (summary.delete) {
							continue
						}
						if (!summaryDescription) {
							summaryDescription = command.getDescription(undefined, summary.replaceName)
							if (summaryDescription) {
								if (summary.replace) {
									summaryDescription.text = summary.replace
								}
								if (summary.ages) {
									summaryDescription.ages = summary.ages
								}
								addDescriptions.push(summaryDescription)
							}
						} else {
							if (summary.replace || summary.replaceName) {
								const description = command.getDescription()
								if (description) {
									for (const newAge of description.ages) {
										if (!summaryDescription.ages.includes(newAge)) {
											summaryDescription.ages.push(newAge)
										}
									}
									const newName = description.names[0]
									if (newName) {
										summaryDescription.names.push(newName)
									}
								}
							}
						}
					}
				}
			}
			describeCommands = Array.from(remainingCommands)
		}
		let previousDescription: EffectDescription | undefined = undefined
		let descriptions: EffectDescription[] = []
		for (let index = describeCommands.length - 1; index >= 0; index -= 1) {
			const command = describeCommands[index]
			const description = command.getDescription()
			if (!description) {
				continue
			}
			if (previousDescription?.modifyAge) {
				description.ages = previousDescription.ages
			}
			if (!description.modifyAge) {
				const newAges = description.ages
				if (previousDescription) {
					for (const newAge of newAges) {
						if (!previousDescription.ages.includes(newAge)) {
							previousDescription.ages.push(newAge)
						}
					}
				}
				if (!previousDescription || description.text !== previousDescription.text) {
					descriptions.push(description)
				}
			}
			previousDescription = description
		}
		descriptions = descriptions.concat(addDescriptions)
		for (const description of descriptions) {
			description.ages = description.ages.sort(sortByAge)
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
		let ages = [CivAge.Dark]
		let preset = techDescriptions[this.id]
		if (preset) {
			text = preset[0]
			ages = [preset[1]]
		} else {
			// console.error(this.id, 'No command', this.building, this.requires, this.costs, this.time, this.icon)
			// console.log(this.commandList.commands)
			text = this.name
		}
		return {
			id: this.id,
			text,
			ages,
			names: [],
			type: 0,
			a: 0,
			b: 0,
			c: 0,
			d: 0,
		}
	}
}

export function sortByName (a: {name: string}, b: {name: string}): number {
	return a.name.localeCompare(b.name)
}

export function sortByAge (a: CivAge, b: CivAge) {
	if (a === CivAge.Dark) {
		return -1
	}
	if (b === CivAge.Dark) {
		return 1
	}
	return a - b
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
				description.ages = [icon === 33 ? CivAge.Castle : CivAge.Imperial]
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
