import type { TreeCiv, TreeCommand, TreeEffect, TreeTech } from './types'
import { EffectType } from '/@/models/types'
import { CivData, TechData, UnitData, EffectCommandData, CostData, TreeBranchData, ResourceType } from '/@/assets/types'

const fs = require('fs')
const path = require('path')

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
const outputTechs: (TechData | null)[] = []
const outputUnits: (UnitData | null)[] = []

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

for (const unit of civs[0].Units) {
	const localizedName = enStrings[unit.LanguageDLLName]
	// if (!localizedName) {
	// 	console.error('Missing localized name', unit.Name, unit.LanguageDLLName)
	// }
	const icon = unit.IconID
	outputUnits.push(
		localizedName
			? {
				name: localizedName,
				class: unit.Class,
				icon,
			}
			: null,
	)
}

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
	branch.class = outputUnits[branch.units[branch.units.length - 1][0]]!.class
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
	outputCivs.push({
		name,
		remove: [],
		modify: {
			id: -1,
			commands: [],
		},
		uniqueTechIDs: [],
		teamBonuses: null,
	})
}

// Techs

function formatCommand (command: TreeCommand): EffectCommandData {
	return [command.Type, command.A, command.B, command.C, command.D]
}
function getCommandsFrom (effect: TreeEffect) {
	return effect.EffectCommands.map(formatCommand)
}

for (let techID = 0; techID < techs.length; techID += 1) {
	const tech = techs[techID]
	const name = tech.Name
	let outputTech: TechData | null = null
	const effectID = tech.EffectID
	const hasEffect = effectID !== -1
	const iconID = tech.IconID
	const addToCiv = hasEffect && tech.Civ > 0
	if (hasEffect && (addToCiv || (name && name !== 'RESERVED' && name !== 'New Research' && iconID !== -1))) {
		const costs: CostData[] = []
		for (const resource of tech.ResourceCosts) {
			const costIndex = resource.Type
			if (costIndex !== -1) {
				costs.push([resource.Type, resource.Amount, resource.Flag])
			}
		}
		const effect = effects[effectID]
		const localizedName = enStrings[tech.LanguageDLLName]
		// if (!localizedName) {
		// 	console.error('Missing localized name', name, tech.LanguageDLLName)
		// }

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
		outputTech = {
			id: techID,
			name: localizedName!,
			building: buildingID !== -1 ? buildingID : null,
			requires: tech.RequiredTechs.filter((techID: number) => techID > 0),
			costs,
			time: tech.ResearchTime,
			icon: iconID !== -1 ? iconID : null,
			effect: {
				id: effectID,
				commands: getCommandsFrom(effect),
			},
		}
	}

	outputTechs.push(outputTech)
	if (addToCiv) {
		if (!outputTech) {
			console.error('Missing unique tech definition', tech)
		}
		outputCivs[tech.Civ].uniqueTechIDs.push(techID)
	}
}

// Civ techs

for (const civKey in civs) {
	const civ = civs[civKey]
	const techTreeEffectID = civ.TechTreeID
	const treeEffects = effects[techTreeEffectID]
	const teamEffectID = civ.TeamBonusID
	const teamBonusEffect = effects[teamEffectID]
	const output = outputCivs[parseInt(civKey, 10)]
	output.modify.id = techTreeEffectID
	output.teamBonuses = teamBonusEffect
		? {
			id: teamEffectID,
			commands: getCommandsFrom(teamBonusEffect),
		}
		: null
	for (const treeEffect of treeEffects.EffectCommands) {
		if (treeEffect.Type === EffectType.DisableTech) {
			const techID = treeEffect.D
			if (techID !== -1) {
				const tech = techs[techID]
				if (!tech) {
					console.error(civ.Name, treeEffect)
				} else if (!tech.Name.startsWith('C-Bonus')) { // Civ bonuses are implicitly disabled
					output.remove.push(techID)
				}
			}
		} else {
			output.modify.commands.push(formatCommand(treeEffect))
		}
	}
}

// Output

const outputPath = path.join(__dirname, '../src/assets/data')
fs.mkdirSync(outputPath, { recursive: true })

function writeFile (name: string, type: string, object: any) {
	const jsObjectString = JSON.stringify(object, null, '\t').replace(/(\[\n[^[{]+?\])/g, (match) => match.replace(/\s{2,}/g, ' ')).replace(/([^,[{])\n/g, '$1,\n')
	const collectionType = Array.isArray(object) ? `${type}[]` : `{[key: string]: ${type}}`
	const output = `import { ${type} } from '/@/assets/types'\n\nexport default ${jsObjectString} as ${collectionType}`
	fs.writeFileSync(path.join(outputPath, `${name}.ts`), output, 'utf-8')
}

const outputTreeObject: {[name: string]: TreeBranchData} = {}
outputTree.forEach(branch => {
	delete branch.resources
	outputTreeObject[branch.name.toLowerCase().replace(' ', '')] = branch
})

writeFile('civs', 'CivData', outputCivs)
writeFile('techs', 'TechData', outputTechs)
writeFile('trees', 'TreeBranchData', outputTreeObject)
writeFile('units', 'UnitData', outputUnits)
