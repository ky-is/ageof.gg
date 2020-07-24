import type { TreeCiv, TreeCommand, TreeEffect, TreeTech } from './types/tree'
import { CivData, EffectType, CostData, TreeBranchData, ResourceType, Focus, ResourceTypeInfo, CivAge, CostType, UnitAttribute, UnitAttributeInfo, UnitClassInfo, EffectDescriptionData, EffectDescription, AmountTypeInfo } from '../src/assets/types'

import { effectSummaries } from './effectSummaries'

const fs = require('fs')
const path = require('path')

const unitFocuses: {[unitName: string]: Focus[] | undefined} = {
	'Archery Range': [Focus.Archery, Focus.ArcheryAnti],
	'Barracks': [Focus.Infantry, Focus.CavalryAnti],
	'Blacksmith': [Focus.Military],
	'Dock': [Focus.Navy],
	'Harbor': [Focus.Navy],
	'Siege Workshop': [Focus.Siege],
	'Stable': [Focus.Cavalry],
	'University': [Focus.Military],
}

const removePrefixes: string[] = [
	'Elite ',
	'Fortified ',
	'Heavy ',
	'Imperial ',
	'Rice ',
]

const unitAge: {[id: number]: number} = {
	// Trade
	17: CivAge.Feudal,
	204: CivAge.Feudal,

	// Castle
	82: CivAge.Castle,

	105: CivAge.Feudal,

	// Dock
	45: CivAge.Dark,
	133: CivAge.Feudal,
	47: CivAge.Castle,
	51: CivAge.Imperial,

	// Town Center
	109: CivAge.Dark,
	71: CivAge.Feudal,
	141: CivAge.Castle,
	142: CivAge.Imperial,
}

// aoe2dat

const tree = require('./data/full.json') as {
	Civs: TreeCiv[]
	Effects: TreeEffect[]
	Techs: TreeTech[]
}

const civs = tree.Civs
const effects = tree.Effects
const techs = tree.Techs

// Output

const outputCivs: CivData[] = []
const civTechs: TechData[][] = []

const enStrings: {[key: string]: string | undefined} = {}
{
	const stringsPath = path.join(__dirname, 'data/key-value-strings-utf8.txt')
	const rawStrings = fs.readFileSync(stringsPath, 'utf-8')
	for (const stringLine of rawStrings.split(/\r?\n/)) {
		const firstChar = stringLine.charAt(0)
		if (!firstChar) {
			continue
		}
		const firstDigit = parseInt(firstChar, 10)
		if (!isNaN(firstDigit)) {
			const valueStartIndex = stringLine.indexOf('"')
			if (valueStartIndex > 0) {
				const key = stringLine.slice(0, valueStartIndex - 1).trim()
				const string = stringLine.slice(valueStartIndex + 1)
				enStrings[key] = string.slice(0, -1)
			}
		}
	}
}

// Units

const units = civs[0].Units

const outputTree: TreeBranchData[] = [
	{
		name: 'Archer',
		resources: [],
		units: [
			[ 4 ],
			[ 24, 100 ],
			[ 492, 237 ],
		],
	},
	{
		name: 'Skirmisher',
		resources: [],
		units: [
			[ 7 ],
			[ 6, 98 ],
		],
	},
	{
		name: 'Cavalry Archer',
		resources: [],
		units: [
			[ 39, 192 ],
			[ 474, 218 ],
		],
	},
	{
		name: 'Militia',
		resources: [],
		units: [
			[ 74 ],
			[ 75 ],
			[ 77 ],
			[ 473, 217 ],
			[ 567, 264 ],
		],
	},
	{
		name: 'Spear',
		resources: [],
		units: [
			[ 93 ],
			[ 358, 197], //TODO verify
			[ 359, 429 ],
		],
	},
	{
		name: 'Eagle',
		resources: [],
		units: [
			[ 751, 384 ],
			[ 752, 434 ],
			[ 753, 434 ],
		],
	},
	{
		name: 'Scout',
		resources: [],
		units: [
			[ 448, 204 ],
			[ 546, 254 ],
			[ 441, 428 ],
		],
	},
	{
		name: 'Knight',
		resources: [],
		units: [
			[ 38, 166 ],
			[ 283, 209 ],
			[ 569, 265 ],
		],
	},
	{
		name: 'Camel',
		resources: [],
		units: [
			[ 329, 235 ],
			[ 330, 236 ],
		],
	},
	{
		name: 'Elephant',
		resources: [],
		units: [
			[ 1132, 630 ],
			[ 1134, 631 ],
		],
	},
	{
		name: 'Lancer',
		resources: [],
		units: [
			[ 1370, 714 ],
			[ 1372 ],
		],
	},
	{
		name: 'Ram',
		resources: [],
		units: [
			[ 35 ],
			[ 422 ],
			[ 548, 255 ],
		],
	},
	{
		name: 'Mangonel',
		resources: [],
		units: [
			[ 280 ],
			[ 550, 257 ],
			[ 588, 320 ],
		],
	},
	{
		name: 'Scorpion',
		resources: [],
		units: [
			[ 279 ],
			[ 542, 239 ],
		],
	},
	{
		name: 'Fire ship',
		resources: [],
		units: [
			[ 1103, 604 ],
			[ 529, 243 ],
			[ 532, 246 ],
		],
	},
	{
		name: 'Galley',
		resources: [],
		units: [
			[ 539 ],
			[ 21 ],
			[ 442, 35 ],
		],
	},
	{
		name: 'Demo ship',
		resources: [],
		units: [
			[ 1104, 605 ],
			[ 527, 242 ],
			[ 528, 244 ],
		],
	},
	{
		name: 'Cannon Galleon',
		resources: [],
		units: [
			[ 420, 37 ],
			[ 691, 376 ],
		],
	},
	{
		name: 'Tower',
		resources: [],
		units: [
			[ 79 ],
			[ 234, 140 ],
			[ 235, 63 ],
		],
	},
	{
		name: 'Bombard Cannon',
		resources: [],
		units: [
			[ 36, 188 ],
		],
	},
	{
		name: 'Bombard Tower',
		resources: [],
		units: [
			[ 236, 64 ],
		],
	},
	{
		name: 'Monk',
		resources: [ ResourceType.MonkConversionEnabled, ResourceType.BuildingConversionEnabled, ResourceType.FaithRechargeRate, ResourceType.Theocracy ],
		units: [
			[ 125 ],
		],
	},
].map((branch: any) => {
	branch.upgrades = []
	branch.class = units[branch.units[branch.units.length - 1][0]]!.Class
	return branch
})

// Civs

const mapCivNames: {[key: string]: string | undefined} = {
	British: 'Britons',
	Byzantine: 'Byzantines',
	French: 'Franks',
	Ethopians: 'Ethiopians', //cspell:disable-line
	Mayan: 'Mayans',
}

for (const civKey in civs) {
	const civ = civs[civKey]
	const internalName = civ.Name
	const name = mapCivNames[internalName] ?? internalName
	civTechs.push([])
	outputCivs.push({
		name,
		focuses: {
			primary: [],
			secondary: [],
			team: [],
		},
		disableTechIDs: [],
		descriptions: [],
	})
}

// Techs

interface EffectData {
	id: number
	commands: EffectCommand[]
}

interface TechData {
	id: number
	name: string
	team: boolean
	building: number | null
	castle: boolean
	requires: number[]
	costs: CostData[]
	time: number
	icon: number | null
	effect: EffectData | null
}

class EffectCommand {
	id: number
	team: boolean
	focuses: Focus[]

	type: number
	a: number
	b: number
	c: number
	d: number

	constructor (id: number, { Type, A, B, C, D }: TreeCommand) {
		this.id = id
		const isTeam = Type >= 10 && Type < 20
		this.team = isTeam
		this.type = isTeam ? Type - 10 : Type
		this.a = A
		this.b = B
		this.c = C
		this.d = D
		this.focuses = getFocusesFor(id, Type, A, B, C, D)
	}

	makeDescription (segments: string[], age: CivAge | undefined, nameableID: number | undefined, nameable: Nameable | string | undefined, modifyAge?: boolean): EffectDescriptionData {
		if (nameableID) {
			const minAge = unitAge[nameableID]
			if (!age || age === CivAge.Dark || minAge > age) {
				age = minAge
			}
		}
		return {
			id: this.id,
			team: false,
			castle: false,
			segments,
			ages: age ? [age] : [],
			names: nameable ? [removeSuffix(typeof nameable === 'string' ? nameable : getName(nameable))] : [],
			requires: [],
			focuses: this.focuses,
			modifyAge,
			type: this.type,
			a: this.a,
			b: this.b,
			c: this.c,
			d: this.d,
		}
	}

	getDescription (minimumAge?: CivAge): EffectDescriptionData | null {
		if (this.id === 573) {
			return this.makeDescription(['Gunpowder units', 'more accurate'], CivAge.Castle, undefined, undefined)
		}
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
			return this.makeDescription([getDisplayNameFor(enableUnit), 'available'], minimumAge, enableID, enableUnit)

		case EffectType.UnitUpgrade:
			// const oldUnit = units[this.a]
			const availableID = this.b
			const availableUnit = units[availableID]
			if (!availableUnit) {
				console.error(this.id, 'Unknown unit', availableID, this.type, this.a, this.b, this.c, this.d)
				break
			}
			return this.makeDescription([getDisplayNameFor(availableUnit), 'available'], minimumAge, availableID, availableUnit)

		case EffectType.UnitModifier:
			let value = this.d
			let typeDescription
			if (this.d > 0b11111111) {
				const amountTypeID = this.d >>> 8
				typeDescription = AmountTypeInfo[amountTypeID]
				if (!typeDescription) {
					console.warn(this.id, 'Unknown AmountTypeInfo', amountTypeID, this.type, this.a, this.b, this.c, this.d);
				}
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
				amountDescription = `set to ${this.d}`
			}
		case EffectType.UnitMultiplier:
			const attribute = this.c
			const proportion = this.d
			const unitAttribute = UnitAttributeInfo[attribute]
			if (!amountDescription) {
				if (proportion === 1) {
					console.warn('Proportion is zero for', this);
					break
				}
				amountDescription = formatPercentDifference(proportion)
			}
			const multipliedUnitID = this.a
			const multipliedUnit = units[multipliedUnitID]
			const unitClass = UnitClassInfo[this.b]

			if (!multipliedUnit && !unitClass) {
				// console.error(this.id, multipliedUnitID !== -1 ? `Unknown Unit ${multipliedUnitID}` : `Unknown UnitClassInfo ${this.b}`, this.type, this.a, this.b, this.c, this.d)
				break
			}
			if (!unitAttribute) {
				console.warn(this.id, 'Unknown UnitAttributeInfo', this.c, this.type, this.a, this.b, this.c, this.d)
			}
			const name = multipliedUnit ? getDisplayNameFor(multipliedUnit) : unitClass!.name
			return this.makeDescription([name, unitAttribute, amountDescription + (attribute === UnitAttribute.AccuracyPercent ? '%' : '')], minimumAge, multipliedUnitID, multipliedUnit ?? unitClass)

		case EffectType.ResourceModifier:
			const amount = this.d
			if (this.b) {
				amountDescription = formatDifference(amount)
			} else {
				if (amount === 1) {
					console.warn('Proportion is zero for', this)
					break
				}
				amountDescription = formatPercent(amount)
			}

		case EffectType.ResourceMultiplier:
			const resourceInfo = ResourceTypeInfo[this.a]
			if (!resourceInfo) {
				console.error(this.id, 'Unknown ResourceTypeInfo', this.a, this.type, this.a, this.b, this.c, this.d)
				break
			}
			const unitID = resourceInfo.unitID
			const unit = unitID ? units[unitID] : undefined
			if (!amountDescription) {
				const proportion = this.d
				if (proportion === 1) {
					console.warn('Proportion is zero for', this);
					break
				}
				amountDescription = formatPercentDifference(proportion)
			}
			return this.makeDescription([resourceInfo.name, amountDescription], getAgeFrom(resourceInfo, minimumAge), unitID, unit ?? resourceInfo.name)

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
			return this.makeDescription([getName(techModify), amountDescription, this.d === 0 ? '' : formatDifference(this.d)], getAgeFrom(techModify, minimumAge), undefined, techModify)

		case EffectType.DisableTech:
			const techDisable = techs[this.d]
			if (!techDisable) {
				console.error(this.id, 'Unknown DisableTech', this.d, this.type, this.a, this.b, this.c, this.d)
				break
			}
			const age = getAgeFrom(techDisable, minimumAge) ?? CivAge.Dark
			console.log('TODO disable age', age)
			return this.makeDescription([], age === CivAge.Dark ? CivAge.Feudal : (age === CivAge.Feudal ? CivAge.Castle : CivAge.Imperial), undefined, undefined, true)

		default:
			console.error(this.id, 'Unknown EffectType', this.type, this.type, this.a, this.b, this.c, this.d)
		}
		return null
	}
}

function makeEffectCommands (id: number, effect: TreeEffect) {
	return effect.EffectCommands.map(command => new EffectCommand(id, command))
}

for (let techID = 0; techID < techs.length; techID += 1) {
	const tech = techs[techID]
	const rawName = tech.Name
	const effectID = tech.EffectID
	const hasEffect = effectID !== -1
	const iconID = tech.IconID
	const addToCiv = hasEffect && tech.Civ > 0

	const costs: CostData[] = []
	for (const resource of tech.ResourceCosts) {
		const costIndex = resource.Type
		if (costIndex !== -1) {
			costs.push([ resource.Type, resource.Amount, resource.Flag ])
		}
	}

	const effect = effects[effectID]
	if (hasEffect && (addToCiv || (rawName && rawName !== 'RESERVED' && rawName !== 'New Research' && iconID !== -1))) {
		// Tree techs
		const buildingID = tech.ResearchLocation
		if (!addToCiv && buildingID !== -1 && (techID < 101 || techID > 104)) {
			for (const command of effect.EffectCommands) {
				let unitID = -1, classID = -1, resourceID = -1
				switch (command.Type) {
				case EffectType.ResourceModifier:
					resourceID = command.A
					break
				case EffectType.UnitEnable:
				case EffectType.UnitUpgrade:
					continue
				case EffectType.UnitSetModifier:
					continue //TODO
				case EffectType.UnitModifier:
				case EffectType.UnitMultiplier:
					unitID = command.A
					classID = command.B
					break
				default:
					console.log('Unknown EffectType', command)
				}
				if (unitID !== -1 || classID !== -1 || resourceID !== -1) {
					for (const branch of outputTree) {
						if ((resourceID !== -1 && !branch.resources) || branch.upgrades.includes(techID)) {
							continue
						}
						let found = false
						if (resourceID !== -1) {
							found = branch.resources!.includes(resourceID)
						} else if (classID !== -1) {
							found = classID === branch.class
						} else {
							const units = branch.units
							for (const unit of units) {
								if (unit[0] === unitID) {
									found = true
									break
								}
							}
						}
						if (found) {
							branch.upgrades.push(techID)
						}
					}
				}
			}
		}
	}

	if (addToCiv) {
		const building = tech.ResearchLocation !== -1 ? tech.ResearchLocation : null
		const requires = tech.RequiredTechs
		const commands = makeEffectCommands(effectID, effect)
		const focuses = Array.from(new Set(commands.flatMap(command => command.focuses)))
		for (const cost of costs) {
			if (cost[0] === CostType.RelicsCaptured) {
				focuses.push(Focus.Relic)
				break
			}
		}
		civTechs[tech.Civ].push({
			id: techID,
			name: getName(tech),
			building,
			requires,
			team: !!commands.find(command => command.team),
			castle: building === 82 || (!building && requires[0] === CivAge.Castle && commands[0]?.type === EffectType.UnitEnable),
			costs,
			time: tech.ResearchTime,
			icon: tech.IconID,
			effect: {
				id: effectID,
				commands,
			},
		})
	}
}

// Civ techs

const primaryFocuses: {[key: string]: Focus[]} = {
	'Aztecs': [Focus.Monk, Focus.Infantry],
}

for (const civKey in civs) {
	const civ = civs[civKey]
	const techTreeEffectID = civ.TechTreeID
	const civEffect = effects[techTreeEffectID]

	const civIndex = parseInt(civKey, 10)
	const output = outputCivs[civIndex]
	const bonuses = civTechs[civIndex]

	const civCommands = []
	for (const civCommand of civEffect.EffectCommands) {
		const techID = civCommand.D
		if (civCommand.Type === EffectType.DisableTech) {
			if (techID !== -1) {
				const tech = techs[techID]
				if (!tech) {
					console.error(civ.Name, civCommand)
				} else if (!tech.Name.startsWith('C-Bonus')) { // Civ bonuses are implicitly disabled
					output.disableTechIDs.push(techID)
				}
			} else {
				console.error(techID, 'Unknown techID', civ.Name)
			}
		} else {
			civCommands.push(new EffectCommand(techID, civCommand))
		}
	}
	const effect = { id: -1, commands: civCommands }
	bonuses.push({ id: -1, name: output.name, team: false, castle: false, building: null, requires: [], costs: [], time: 0, icon: null, effect })

	const teamEffectID = civ.TeamBonusID
	const teamBonusEffect = effects[teamEffectID]
	if (teamBonusEffect) {
		const effect = { id: -teamEffectID, commands: makeEffectCommands(teamEffectID, teamBonusEffect) }
		bonuses.push({ id: -teamEffectID, name: output.name, team: true, castle: false, building: null, requires: [], costs: [], time: 0, icon: null, effect })
	}
	const teamFocuses = new Set(
		bonuses
			.filter(tech => tech.team)
			.map(tech => tech.effect)
			.filter((effect): effect is EffectData => !!effect)
			.flatMap(effect => effect.commands.flatMap(command => command.focuses))
	)
	const secondaryFocuses = dedupe(
		bonuses
			.flatMap(tech => tech.effect?.commands.flatMap(command => command.focuses))
			.filter((focus): focus is Focus => !!focus && !teamFocuses.has(focus) && !output.focuses.primary.includes(focus))
	)
	output.focuses.primary = primaryFocuses[civ.Name] ?? []
	output.focuses.secondary = secondaryFocuses
	output.focuses.team = Array.from(teamFocuses)
	output.descriptions = outputDescriptions(bonuses.flatMap(getTechDescriptions))
}

// Output

const outputPath = path.join(__dirname, '../src/assets/generated')
fs.mkdirSync(outputPath, { recursive: true })

function writeFile (name: string, prefix: string, object: any, suffix: string) {
	const jsObjectString = JSON.stringify(object, null, '\t').replace(/(\[\n[^[{]+?\])/g, (match) => match.replace(/\s{2,}/g, ' ')).replace(/([^,[{])\n/g, '$1,\n')
	const output = `${prefix}export default ${jsObjectString}${suffix}`
	fs.writeFileSync(path.join(outputPath, `${name}.ts`), output, 'utf-8')
}

function writeFileFor (name: string, type: string, importType: string | undefined, object: any) {
	const collectionType = Array.isArray(object) ? `${type}[]` : `{[key: string]: ${type}}`
	writeFile(name, `import { ${importType ?? type} } from '/@/assets/types'\n\n`, object, ` as ${collectionType}`)
}

const outputTreeObject: {[name: string]: TreeBranchData} = {}
outputTree.forEach(branch => {
	outputTreeObject[branch.name.toLowerCase().replace(' ', '')] = branch
})

const unitCategoryLines = [
	[
		'archery range',
		[
			outputTreeObject.archer,
			outputTreeObject.skirmisher,
			outputTreeObject.cavalryarcher,
		],
	],
	[
		'barracks',
		[
			outputTreeObject.militia,
			outputTreeObject.spear,
			outputTreeObject.eagle,
		],
	],
	[
		'stable',
		[
			outputTreeObject.scout,
			outputTreeObject.knight,
			outputTreeObject.camel,
			outputTreeObject.elephant,
			outputTreeObject.lancer,
		],
	],
	[
		'siege workshop',
		[
			outputTreeObject.ram,
			outputTreeObject.mangonel,
			outputTreeObject.scorpion,
		],
	],
	[
		'dock',
		[
			outputTreeObject.fireship,
			outputTreeObject.galley,
			outputTreeObject.demoship,
			outputTreeObject.cannongalleon,
		],
	],
	[
		'misc.',
		[
			outputTreeObject.tower,
			outputTreeObject.bombardcannon,
			outputTreeObject.bombardtower,
			outputTreeObject.monk,
		],
	],
]

const allCivTechs = new Set(outputTree.flatMap(branch => branch.upgrades))
for (const civ of outputCivs) {
	for (const id of civ.disableTechIDs) {
		allCivTechs.delete(id)
	}
}
// console.log(Array.from(allCivTechs).map(techID => techs[techID]!.Name)) //SAMPLE
const CHEMISTRY_TECH_ID = 47
outputTree.forEach(branch => {
	branch.upgrades = branch.upgrades.filter(techID => techID === CHEMISTRY_TECH_ID || !allCivTechs.has(techID))
})

writeFileFor('civs', 'CivData', undefined, outputCivs)
writeFileFor('unitLines', '[string, TreeBranchData[]]', 'TreeBranchData', unitCategoryLines)
writeFile('allCivTechs', '', Array.from(allCivTechs), '')

// Descriptions

type Nameable = {LanguageDLLName: number}
type RequiresTechs = {RequiredTechs?: number[], requires?: number[]}

function getName (entity: Nameable): string {
	const name = enStrings[entity.LanguageDLLName]
	if (!name) {
		console.error('Unknown name', entity.LanguageDLLName, entity)
		return ''
	}
	return name
}

function getAgeFrom (requiresTech: RequiresTechs, minimumAge: CivAge | undefined): CivAge | undefined {
	const requiredTechIDs = requiresTech.RequiredTechs ?? requiresTech.requires
	const foundAge = requiredTechIDs?.find(requirement => requirement >= 101 && requirement <= 104)
	if (foundAge) {
		if (minimumAge && minimumAge !== CivAge.Dark) {
			return Math.max(minimumAge, foundAge)
		}
		return foundAge
	}
	return minimumAge
}

function getFocusesFor (id: number, type: number, a: number, b: number, c: number, d: number) {
	let unitID = -1, unitClassID = -1, unitAttribute = -1
	switch (type) {
	case EffectType.UnitSetModifier:
	case EffectType.UnitEnable:
	case EffectType.UnitModifier:
	case EffectType.UnitMultiplier:
		if (a !== -1) {
			unitID = a
		} else if (b !== -1) {
			unitClassID = b
		} else {
			console.error('Invalid focus', id, type, a, b, c, d)
		}
		if (c !== -1) {
			unitAttribute = c
		}
		break

	case EffectType.UnitUpgrade:
		unitID = b
		break

	case EffectType.ResourceModifier:
	case EffectType.ResourceMultiplier:
	case EffectType.ResourceSet:
	case EffectType.ResourceAdd:
		const resourceInfo = ResourceTypeInfo[a]
		if (resourceInfo) {
			return resourceInfo.focuses
		}
		console.error('Unknown ResourceTypeInfo', a, id, type, a, b, c, d)
		break
	}

	let focuses: Focus[] = []
	if (unitID !== -1) {
		const unit = units[unitID]
		if (unit) {
			const name = getName(unit)
			const uFocuses = name ? unitFocuses[name] : undefined
			if (uFocuses) {
				focuses = uFocuses
			} else {
				unitClassID = unit.Class
			}
		} else {
			console.error('Unknown unit', unitID, id, type, a, b, c, d)
		}
	}
	if (unitClassID !== -1) {
		const unitClass = UnitClassInfo[unitClassID]
		if (unitClass) {
			for (const focus of unitClass.focuses) {
				if (!focuses.includes(focus)) {
					focuses.push(focus)
				}
			}
		} else {
			console.error('Unknown UnitClassInfo', unitID, unitClassID, id, type, a, b, c, d)
		}
	}
	if (unitAttribute !== -1) {
		let extraFocus
		if (unitAttribute === UnitAttribute.SearchRadius || unitAttribute === UnitAttribute.LineOfSight) {
			extraFocus = Focus.Vision
		}
		if (unitAttribute === UnitAttribute.ResourceStorage) {
			extraFocus = Focus.PopSpace
		}
		if (extraFocus && !focuses.includes(extraFocus)) {
			focuses.push(extraFocus)
		}
	}
	if (id === 721) {
		console.log(unitID, unitClassID, unitAttribute, focuses, type, a, b, c, d)
	}
	return focuses
}

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

function getDisplayNameFor (nameable: Nameable) {
	return getDisplayName(getName(nameable))
}

function formatDifference (amount: number): string {
	if (amount < 0) {
		return amount.toString()
	}
	return `+${amount}`
}

function calculatePercent (proportion: number): number {
	return Math.round(proportion * 100)
}
function formatPercent (proportion: number): string {
	return `${calculatePercent(proportion)}%`
}
function formatPercentDifference (proportion: number): string {
	return formatDifference(calculatePercent(proportion - 1)) + '%'
}

function getTechCommandDescription (tech: TechData, command: EffectCommand) {
	const age = getAgeFrom(tech, undefined)
	const description = command.getDescription(age)
	if (description) {
		description.team = tech.team
		description.castle = tech.castle
		if (tech.icon === 33 || tech.icon === 107) {
			description.icon = tech.icon
			description.title = tech.name
		}
	}
	return description
}

function getTechDescriptions (tech: TechData): EffectDescriptionData[] {
	const results: EffectDescriptionData[] = []
	// Group commands that auto-research technologies
	let describeCommands = tech.effect?.commands ?? []
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
	const summaries = effectSummaries[tech.id]
	let previousDescription: EffectDescriptionData | undefined = undefined
	for (let index = describeCommands.length - 1; index >= 0; index -= 1) {
		const command = describeCommands[index]
		const commandSummaries = summaries?.filter(summary => {
			if (summary.type !== undefined && summary.type !== command.type) {
				return false
			}
			if ((summary.a !== undefined && !summary.a.includes(command.a)) || (summary.b !== undefined && summary.b !== command.b) || (summary.c !== undefined && summary.c !== command.c)) {
				return false
			}
			if (summary.skipA !== undefined && summary.skipA.includes(command.a)) {
				return false
			}
			return true
		})
		if (commandSummaries?.find(summary => summary.delete)) {
			continue
		}
		const description = getTechCommandDescription(tech, command)
		if (!description) {
			continue
		}
		if (previousDescription?.modifyAge) {
			console.log(tech.name, description.ages, previousDescription.ages)
			description.ages = previousDescription.ages
		}
		previousDescription = description
		if (commandSummaries) {
			for (const summary of commandSummaries) {
				if (summary.replace) {
					description.segments = [summary.replace]
				} else if (summary.replaceName) {
					const rawName = description.names?.[0]
					if (rawName) {
						description.segments[0] = summary.replaceName
					} else {
						console.warn('No name for replacement', summary, description)
					}
				}
				if (summary.ages) {
					description.ages = summary.ages
				}
				if (summary.extension) {
					description.extension = summary.extension
				}
			}
		}
		results.push(description)
	}

	const upgradeRequirements = tech.requires
		.filter(techID => techID !== -1 && (techID < 101 || techID > 104))
		.map(techID => {
			const tech = techs[techID]
			if (!tech) {
				console.error(techID, 'Unknown tech')
				return null
			}
			return tech.Name
		})
		.filter(name => name) as string[]
	if (upgradeRequirements) {
		for (const result of results) {
			result.requires = upgradeRequirements
		}
	}
	return results
}

function sortAges (a: CivAge, b: CivAge) {
	if (!a || a === CivAge.Dark) {
		return -1
	}
	if (!b || b === CivAge.Dark) {
		return 1
	}
	return a - b
}

function sortByAge ({ages: aAges}: {ages: CivAge[]}, {ages: bAges}: {ages: CivAge[]}) {
	return sortAges(aAges[0], bAges[0])
}

function dedupe<T> (array: T[]): T[] {
	return Array.from(new Set(array))
}

function outputDescriptions (descriptions: EffectDescriptionData[]): EffectDescription[] {
	const descriptionsByText: {[text: string]: EffectDescriptionData[]} = {}
	// Group summarized descriptions
	for (const description of descriptions) {
		const key = (description.title ?? '') + description.segments.join('')
		if (descriptionsByText[key]) {
			descriptionsByText[key].push(description)
		} else {
			descriptionsByText[key] = [ description ]
		}
	}
	// Combine data for grouped descriptions
	let results: EffectDescriptionData[] = []
	for (const key in descriptionsByText) {
		const groupDescriptions = descriptionsByText[key]
		const resultDescription = groupDescriptions[0]
		for (let index = groupDescriptions.length - 1; index > 0; index -= 1) {
			const description = groupDescriptions[index]
			if (description.icon) {
				resultDescription.icon = description.icon
			}
			if (description.extension) {
				resultDescription.extension = description.extension
			}
			for (const newAge of description.ages) {
				if (!resultDescription.ages.includes(newAge)) {
					resultDescription.ages.push(newAge)
				}
			}
			const newName = description.names?.[0]
			if (newName && !resultDescription.names?.includes(newName)) {
				resultDescription.names?.push(newName)
			}
			for (const requirement of description.requires) {
				if (!resultDescription.requires.includes(requirement)) {
					resultDescription.requires.push(requirement)
				}
			}
		}
		resultDescription.ages = resultDescription.ages.sort(sortAges)
		if (resultDescription.extension) {
			resultDescription.segments.push(resultDescription.extension)
			// delete resultDescription.extension
		}
		results.push(resultDescription)
	}
	results.sort(sortByAge)
	return results.map(descriptionData => {
		const description: EffectDescription = {
			id: descriptionData.id,
			body: descriptionData.segments.join(' '),
			debug: `${descriptionData.id}: ${descriptionData.type} ${descriptionData.a}`,
			focuses: descriptionData.focuses,
		}
		if (descriptionData.names.length > 1) {
			description.names = descriptionData.names
		}
		if (descriptionData.requires.length) {
			description.requires = descriptionData.requires
		}
		if (descriptionData.team) {
			description.team = descriptionData.team
		}
		if (descriptionData.castle) {
			description.castle = descriptionData.castle
		}
		if (descriptionData.ages.length && (descriptionData.ages.length > 1 || descriptionData.ages[0] !== CivAge.Dark)) {
			description.ages = descriptionData.ages
		}
		return description
	})
}
