const fs = require('fs')
const path = require('path')

const tree = require('./data/full.json')

const EffectType = {
	Remove: 102,
}

const enStrings = {}
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

const outputCivs = []
const outputTechs = []
const outputUnits = []

const civs = tree.Civs
const effects = tree.Effects
const techs = tree.Techs

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

const mapCivNames = {
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
	})
}

function formatCommand (command) {
	return [command.Type, command.A, command.B, command.C, command.D]
}
function getCommandsFrom (effect) {
	return effect.EffectCommands.map(formatCommand)
}


for (let index = 0; index < techs.length; index += 1) {
	const tech = techs[index]
	const name = tech.Name
	let outputTech = null
	const effectID = tech.EffectID
	const hasEffect = effectID !== -1
	const iconID = tech.IconID
	const addToCiv = hasEffect && tech.Civ > 0
	if (hasEffect && (addToCiv || (name && name !== 'RESERVED' && name !== 'New Research' && iconID !== -1))) {
		const costs = []
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

		const buildingID = tech.ResearchLocation
		outputTech = {
			id: index,
			name: localizedName,
			building: buildingID !== -1 ? buildingID : null,
			requires: tech.RequiredTechs.filter(techID => techID > 0),
			costs,
			time: tech.ResearchTime,
			icon: iconID !== -1 ? iconID : null,
			effect: {
				id: effectID,
				commands: effect ? getCommandsFrom(effect) : null,
			},
		}
	}

	outputTechs.push(outputTech)
	if (addToCiv) {
		if (!outputTech) {
			console.error('Missing unique tech definition', tech)
		}
		outputCivs[tech.Civ].uniqueTechIDs.push(index)
	}
}

for (const civKey in civs) {
	const civ = civs[civKey]
	const techTreeEffectID = civ.TechTreeID
	const treeEffects = effects[techTreeEffectID]
	const teamEffectID = civ.TeamBonusID
	const teamBonusEffect = effects[teamEffectID]
	const output = outputCivs[civKey]
	output.modify.id = techTreeEffectID
	output.teamBonuses = !teamBonusEffect ? null : {
		id: teamEffectID,
		commands: getCommandsFrom(teamBonusEffect)
	}
	for (const treeEffect of treeEffects.EffectCommands) {
		if (treeEffect.Type === EffectType.Remove) {
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

const outputPath = path.join(__dirname, '../src/assets/data')
fs.mkdirSync(outputPath, { recursive: true })

function writeFile (name, type, object) {
	const jsObjectString = JSON.stringify(object, null, '\t').replace(/(\[\n[^[{]+?\])/g, (match) => match.replace(/\s{2,}/g, ' ')).replace(/([^,[{])\n/g, '$1,\n')
	const output = `import { ${type} } from '/@/assets/types'\n\nexport default ${jsObjectString} as ${type}[]`
	fs.writeFileSync(path.join(outputPath, `${name}.ts`), output, 'utf-8')
}

writeFile('civs', 'CivData', outputCivs)
writeFile('techs', 'TechData', outputTechs)
writeFile('units', 'UnitData', outputUnits)
