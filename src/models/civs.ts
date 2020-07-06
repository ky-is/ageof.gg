import civs from '/@/assets/data/civs'
import techs from '/@/assets/data/techs'
import units from '/@/assets/data/units'

import { EffectCommandData, TechData, CostData, EffectType, UnitData } from '/@/assets/types'
import type { CivData } from '/@/assets/types'

import { Focus, ResourceTypeInfo, CivAge, UnitAttribute, UnitAttributeInfo, UnitClass, EffectDescription, AttributeTypeInfo } from '/@/models/types'
import { effectSummaries, EffectSummary } from '/@/models/effectSummaries'

const primaryFocuses: {[key: string]: Focus[]} = {
	'Aztecs': [Focus.Monk, Focus.Infantry],
}

function getAgeFrom ({ requires }: {requires: number[]}, minimumAge: CivAge | undefined): CivAge | undefined {
	const foundAge = requires.find(requirement => requirement >= 101 && requirement <= 104)
	if (foundAge) {
		if (minimumAge && minimumAge !== CivAge.Dark) {
			return Math.max(minimumAge, foundAge)
		}
		return foundAge
	}
	return minimumAge
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
		case EffectType.ResourceModifier:
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

const unitAge: {[id: number]: number} = {
	17: CivAge.Feudal, // Trade Cog
	82: CivAge.Castle, // Castle
	204: CivAge.Feudal, // Trade Cart
}

const removePrefixes: string[] = [
	'Elite ',
	'Fortified ',
	'Heavy ',
	'Imperial ',
	'Rice ',
]

function removeSuffix (name: string) {
	return name.split(' (')[0]
}

function getDisplayName (name: string) {
	for (const prefix of removePrefixes) {
		if (name.startsWith(prefix)) {
			name = name.slice(prefix.length)
			break
		}
	}
	if (name.startsWith('Palisade ')) {
		return 'Palisade Wall'
	}
	return removeSuffix(name)
}

function getDisplayNameFor ({ name }: UnitData) {
	return getDisplayName(name)
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

	private makeDescription (description: string, age: CivAge | undefined, nameableID: number | undefined, nameable: {name: string} | undefined, modifyAge?: boolean): EffectDescription {
		if (nameableID && !age) {
			age = unitAge[nameableID]
		}
		return {
			id: this.id,
			title: null,
			team: false,
			castle: false,
			description,
			ages: [age ?? CivAge.Dark],
			names: nameable ? [removeSuffix(nameable.name)] : [],
			requires: [],
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
			const enableID = this.a
			const enableUnit = units[enableID]
			if (!enableUnit) {
				console.error(this.id, 'Unknown unit', enableID, this.type, this.a, this.b, this.c, this.d)
				break
			}
			const enabled = this.b === 1
			return this.makeDescription(`${getDisplayNameFor(enableUnit)} ${enabled ? 'available' : 'disabled'}`, minimumAge, enableID, enableUnit)

		case EffectType.UnitAvailable:
			const availableID = this.b
			const availableUnit = units[availableID]
			if (!availableUnit) {
				console.error(this.id, 'Unknown unit', availableID, this.type, this.a, this.b, this.c, this.d)
				break
			}
			return this.makeDescription(`${getDisplayNameFor(availableUnit)} available`, minimumAge, availableID, availableUnit)

		case EffectType.UnitModifier:
			let value = this.d
			let typeDescription
			if (this.d > 0b11111111) {
				const classID = this.d >>> 8
				typeDescription = AttributeTypeInfo[classID]
				if (this.c === UnitAttribute.Armor) {
					typeDescription = `(${typeDescription})`
				} else if (this.c === UnitAttribute.Attack) {
					typeDescription = 'vs ' + typeDescription
				}

				value = this.d & 0b0000000011111111
			}
			amountDescription = formatDifference(value)
			if (typeDescription) {
				amountDescription += ` ${typeDescription}`
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
			const multipliedUnitID = this.a
			const multipliedUnit = units[multipliedUnitID]
			const unitClass = UnitClass[this.b]

			if (!multipliedUnit && !unitClass) {
				if (multipliedUnitID === -1) { //TODO !
					console.error(this.id, multipliedUnitID !== -1 ? `Unknown Unit ${multipliedUnitID}` : `Unknown UnitClass ${this.b}`, this.type, this.a, this.b, this.c, this.d)
				}
				break
			}
			if (!unitAttribute) {
				console.error(this.id, 'Unknown UnitAttributeInfo', this.c, this.type, this.a, this.b, this.c, this.d)
			}
			const name = multipliedUnit ? getDisplayNameFor(multipliedUnit) : unitClass.name
			return this.makeDescription(`${name} ${unitAttribute} ${amountDescription}${attribute === UnitAttribute.AccuracyPercent ? '%' : ''}`, minimumAge, multipliedUnitID, multipliedUnit ?? unitClass)

		case EffectType.ResourceModifier:
			amountDescription = this.b ? formatDifference(this.d) : formatPercent(this.d)
		case EffectType.ResourceMultiplier:
			const resourceInfo = ResourceTypeInfo[this.a]
			if (!resourceInfo) {
				console.error(this.id, 'Unknown ResourceTypeInfo', this.a, this.type, this.a, this.b, this.c, this.d)
				break
			}
			const unitID = resourceInfo.unitID
			const unit = unitID ? units[unitID] : undefined
			if (!amountDescription) {
				amountDescription = formatPercent(this.d)
			}
			return this.makeDescription(`${resourceInfo.name} ${amountDescription}`, getAgeFrom(resourceInfo, minimumAge), unitID, unit)

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
			return this.makeDescription(`${techModify.name} ${amountDescription}${this.d === 0 ? '' : ' ' + formatDifference(this.d)}`, getAgeFrom(techModify, minimumAge), undefined, techModify)

		case EffectType.DisableTech:
			const techDisable = techs[this.d]
			if (!techDisable) {
				console.error(this.id, 'Unknown DisableTech', this.d, this.type, this.a, this.b, this.c, this.d)
				break
			}
			const age = getAgeFrom(techDisable, minimumAge) ?? CivAge.Dark
			console.log('TODO disable age', age, this)
			return this.makeDescription('', age === CivAge.Dark ? CivAge.Feudal : (age === CivAge.Feudal ? CivAge.Castle : CivAge.Imperial), undefined, undefined, true)

		default:
			console.error(this.id, 'Unknown EffectType', this.type, this.type, this.a, this.b, this.c, this.d)
		}
		return null
	}
}

class CivTech {
	id: number
	name: string
	team: boolean
	building: number | null
	requires: number[]
	castle: boolean
	age: CivAge | undefined
	costs: CostData[]
	time: number
	icon: number | null
	commands: EffectCommand[]
	focuses: Focus[]

	constructor ({ id, name, team, building, requires, costs, time, icon, effect }: TechData) {
		this.id = id
		this.name = name
		this.building = building
		this.requires = requires
		this.team = effect?.commands.find(command => command[0] >= 10 && command[0] <= 16) !== undefined
		this.age = getAgeFrom(this, undefined)
		this.castle = building === 82 || (!building && requires[0] === CivAge.Castle)
		this.costs = costs
		this.time = time
		this.icon = icon
		this.commands = effect?.commands?.map(command => new EffectCommand(this.id, command)) ?? []
		this.team = team || !!this.commands.find(command => command.team)
		this.focuses = Array.from(new Set(this.commands.flatMap(command => command.focuses)))
	}

	private getDescriptionFor (command: EffectCommand) {
		const description = command.getDescription(this.age)
		if (description) {
			description.team = this.team
			description.castle = this.castle
			if (this.icon === 33 || this.icon === 107) {
				description.icon = this.icon
				description.title = this.name
			}
		}
		return description
	}

	getDescriptions (): EffectDescription[] {
		const results: EffectDescription[] = []
		// Group commands that auto-research technologies
		let describeCommands = this.commands
		for (const overrideCommand of describeCommands) {
			if (overrideCommand.type === EffectType.ModifyTechTime) {
				const removeTechID = overrideCommand.a
				for (let index = describeCommands.length - 1; index >= 0; index -= 1) {
					const command = describeCommands[index]
					if (command.type === EffectType.ModifyTechCost && command.a === removeTechID) {
						describeCommands.splice(index, 1)
					}
				}
			} else if (overrideCommand.type === EffectType.UnitModifier && overrideCommand.c === UnitAttribute.MaxRange) {
				for (let index = describeCommands.length - 1; index >= 0; index -= 1) {
					const command = describeCommands[index]
					if (command.type === EffectType.UnitModifier && (command.c === UnitAttribute.LineOfSight || command.c === UnitAttribute.SearchRadius)) {
						describeCommands.splice(index, 1)
					}
				}
			}
		}

		// Summarize related descriptions
		const summaries = effectSummaries[this.id]
		let previousDescription: EffectDescription | undefined = undefined
		for (let index = describeCommands.length - 1; index >= 0; index -= 1) {
			const command = describeCommands[index]
			const description = this.getDescriptionFor(command)
			if (!description) {
				continue
			}
			if (previousDescription?.modifyAge) {
				description.ages = previousDescription.ages
			}
			previousDescription = description
			let descriptionSummary: EffectSummary | null = null
			if (summaries) {
				for (const summary of summaries) {
					if (summary.type !== undefined && summary.type !== command.type) {
						continue
					}
					if ((summary.a !== undefined && !summary.a.includes(command.a)) || (summary.b !== undefined && summary.b !== command.b) || (summary.c !== undefined && summary.c !== command.c)) {
						continue
					}
					if (summary.skipA !== undefined && summary.skipA.includes(command.a)) {
						continue
					}
					descriptionSummary = summary
					if (summary.delete) {
						break
					}
					if (summary.replace) {
						description.description = summary.replace
					} else if (summary.replaceName) {
						const rawName = description.names[0]
						if (rawName) {
							description.description = description.description.replace(getDisplayName(rawName), summary.replaceName)
						} else {
							console.error('No name for replacement', summary, description)
						}
					}
					if (summary.ages) {
						description.ages = summary.ages
					}
					if (summary.extension) {
						description.description += summary.extension
					}
				}
			}
			if (!descriptionSummary?.delete) {
				results.push(description)
			}
		}

		const upgradeRequirements = this.requires.filter(techID => techID < 101 || techID > 104).map(techID => {
			const tech = techs[techID]
			if (!tech) {
				console.error(this.id, 'Unknown tech', techID)
				return null
			}
			return tech.name
		}).filter(name => name) as string[]
		if (upgradeRequirements) {
			for (const result of results) {
				result.requires = upgradeRequirements
			}
		}
		return results
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

function dedupe<T> (array: T[]): T[] {
	return Array.from(new Set(array))
}

export class CivEntry {
	name: string
	primaryFocuses: Focus[]
	secondaryFocuses: Focus[]
	teamFocuses: Focus[]
	bonuses: CivTech[]

	constructor (data: CivData) {
		this.name = data.name
		this.primaryFocuses = primaryFocuses[name] ?? []
		const techIDs = data.techIDs.filter(techID => techs[techID])
		const techData = techIDs.map(techID => techs[techID])
		const bonuses = techData.map(tech => new CivTech(tech))
		bonuses.push(new CivTech({ id: data.modify.id, name: data.name, team: false, building: null, requires: [], costs: [], time: 0, icon: null, effect: data.modify }))
		if (data.teamBonuses) {
			bonuses.push(new CivTech({ id: data.teamBonuses.id, name: data.name, team: true, building: null, requires: [], costs: [], time: 0, icon: null, effect: data.teamBonuses }))
		}
		this.bonuses = bonuses.sort((a, b) => a.id - b.id)
		const teamFocuses = new Set(bonuses.filter(bonus => bonus.team).flatMap(bonus => bonus.focuses))
		const secondaryFocuses = dedupe(bonuses.flatMap(bonus => bonus.focuses)).filter(focus => !teamFocuses.has(focus) && !this.primaryFocuses.includes(focus))
		this.teamFocuses = Array.from(teamFocuses)
		this.secondaryFocuses = secondaryFocuses
	}


	getDescriptions () {
		const descriptions = this.bonuses.flatMap(bonus => bonus.getDescriptions())
		const descriptionsByText: {[text: string]: EffectDescription[]} = {}
		// Group summarized descriptions
		for (const description of descriptions) {
			const key = (description.title ?? '') + description.description
			if (descriptionsByText[key]) {
				descriptionsByText[key].push(description)
			} else {
				descriptionsByText[key] = [ description ]
			}
		}
		// Combine data for grouped descriptions
		let results: EffectDescription[] = []
		for (const key in descriptionsByText) {
			const groupDescriptions = descriptionsByText[key]
			const resultDescription = groupDescriptions[0]
			for (let index = groupDescriptions.length - 1; index > 0; index -= 1) {
				const description = groupDescriptions[index]
				if (description.icon) {
					resultDescription.icon = description.icon
				}
				for (const newAge of description.ages) {
					if (!resultDescription.ages.includes(newAge)) {
						resultDescription.ages.push(newAge)
					}
				}
				const newName = description.names[0]
				if (newName && !resultDescription.names.includes(newName)) {
					resultDescription.names.push(newName)
				}
				for (const requirement of description.requires) {
					if (!resultDescription.requires.includes(requirement)) {
						resultDescription.requires.push(requirement)
					}
				}
			}
			resultDescription.ages = resultDescription.ages.sort(sortByAge)
			results.push(resultDescription)
		}
		return results
	}
}

export const civEntries = civs.map(civData => new CivEntry(civData))
