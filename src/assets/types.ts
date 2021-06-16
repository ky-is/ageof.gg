export const enum EffectType {
	UnitSetModifier = 0,
	ResourceModifier = 1,
	UnitEnable = 2,
	UnitUpgrade = 3,
	UnitModifier = 4,
	UnitMultiplier = 5,
	ResourceMultiplier = 6,
	ResourceSet = 10,
	ResourceAdd = 11, //TODO verify
	ModifyTechCost = 101,
	DisableTech = 102,
	ModifyTechTime = 103,
}

export const enum ResourceType {
	MonkConversionEnabled = 27,
	BuildingConversionEnabled = 28,
	FaithRechargeRate = 35,
	Theocracy = 193,
}

export type CostData = [number, number, number]

export type EffectCommandData = [number, number, number, number, number]

export interface CivData {
	name: string
	focuses: {
		primary: Focus[]
		secondary: Focus[]
		team: Focus[]
	}
	disableTechIDs: number[]
	descriptions: EffectDescription[]
}

export interface UnitSummaryData {
	name: string
	class: number
	icon: number | null
}
export interface TechSummaryData {
	name: string
	age: number
	icon: number | null
}

export interface TreeBranchData {
	name: string
	class: number
	resources?: ResourceType[]
	units: [number, number][]
	upgrades: number[]
}

export interface EffectDescriptionData {
	id: number
	title?: string
	segments: string[]
	extension?: string
	modifyAge?: boolean
	names: string[]
	requires: string[]
	ages: CivAge[]
	icon?: number
	team: boolean
	castle: boolean
	focuses: Focus[]

	type: number
	a: number
	b: number
	c: number
	d: number
}

export interface EffectDescription {
	id: number
	title?: string
	body: string
	names?: string[]
	requires?: string[]
	ages?: CivAge[]
	icon?: number
	team?: boolean
	castle?: boolean
	focuses: Focus[]
	debug?: string //TODO dev only
}

export enum Focus {
	// NOTE: Should these be plural or singular?
	Archery = 'archery',
	ArcheryAnti = 'anti-archery',
	Cavalry = 'cavalry',
	CavalryAnti = 'anti-cavalry',
	Defense = 'defense',
	Elephantry = 'elephant',
	Gunpowder = 'gunpowder',
	Infantry = 'infantry',
	InfantryAnti = 'anti-infantry',
	Laming = 'laming',
	Military = 'military',
	Monk = 'monk',
	MonkAnti = 'anti-monk',
	Navy = 'navy',
	PopSpace = 'population space',
	Relic = 'relics',
	Resources = 'resources',
	ResourceFood = 'food',
	ResourceGold = 'gold',
	ResourceStone = 'stone',
	ResourceWood = 'wood',
	Siege = 'siege',
	Tower = 'tower',
	Trash = 'trash',
	UniqueUnits = 'unique unit',
	Vision = 'vision',
	Wall = 'wall'
}

export const enum Strength {
	Unavailable,
	Weak,
	Normal,
	Strong,
}

export enum CivAge {
	Dark = 104,
	Feudal = 101,
	Castle = 102,
	Imperial = 103,
}

export const CivAgeName = {
	104: 'Dark',
	101: 'Feudal',
	102: 'Castle',
	103: 'Imperial',
}

interface Building {
	age: CivAge
}

export const Building = {
	ArcheryRange: {
		age: CivAge.Feudal,
	},
	Dock: {
		age: CivAge.Dark,
	},
	Castle: {
		age: CivAge.Castle,
	},
	Monastery: {
		age: CivAge.Castle,
	},
	Stable: {
		age: CivAge.Feudal,
	},
}

export const enum TechID {
	FeudalAge = 101,
	CastleAge = 102,
	ImperialAge = 103,
	DarkAge = 104,
}

export const ResourceTypeInfo: {[id: string]: {name: string, unitID?: number, focuses: Focus[], RequiredTechs?: TechID[]}} = {
	0: {
		name: 'Food',
		focuses: [Focus.ResourceFood],
	},
	1: {
		name: 'Wood',
		focuses: [Focus.ResourceWood],
	},
	2: {
		name: 'Stone',
		focuses: [Focus.ResourceStone],
	},
	3: {
		name: 'Gold',
		focuses: [Focus.ResourceGold],
	},
	4: {
		name: 'Max population space',
		focuses: [Focus.PopSpace],
	},
	10: {
		name: 'Population space',
		focuses: [Focus.PopSpace],
	},
	32: {
		name: 'Population max cap',
		focuses: [Focus.Military],
	},
	36: {
		name: 'Farm food',
		focuses: [Focus.ResourceFood],
	},
	47: {
		name: 'Gold mining',
		focuses: [Focus.ResourceGold],
	},
	50: {
		name: 'Reveal allies',
		focuses: [Focus.Vision],
	},
	77: {
		name: 'Conversion resistance',
		focuses: [Focus.MonkAnti],
	},
	78: {
		name: 'Commodity trade fee',
		focuses: [Focus.MonkAnti],
	},
	79: {
		name: 'Stone mining',
		focuses: [Focus.ResourceStone],
	},
	85: {
		name: 'Research cost',
		focuses: [Focus.Resources],
	},
	89: {
		name: 'Monk healing rate',
		focuses: [Focus.Monk, Focus.Defense],
	},
	91: {
		name: 'Starting Food',
		focuses: [Focus.ResourceFood],
	},
	92: {
		name: 'Starting Wood',
		focuses: [Focus.ResourceWood],
	},
	94: {
		name: 'Starting Gold',
		focuses: [Focus.ResourceGold],
	},
	96: {
		name: 'Berserker heal delay',
		focuses: [],
	},
	189: {
		name: 'Wood chopping',
		focuses: [Focus.ResourceWood],
	},
	190: {
		name: 'Food gathering',
		focuses: [Focus.ResourceFood],
	},
	191: {
		name: 'Relic gold income',
		unitID: 285,
		RequiredTechs: [TechID.CastleAge],
		focuses: [Focus.Relic, Focus.ResourceGold],
	},
	195: {
		name: 'Building construction rate',
		focuses: [Focus.Defense],
	},
	196: {
		name: 'Relic / Wonder victory',
		focuses: [],
	},
	197: {
		name: 'Spies / Treason cost',
		focuses: [Focus.Vision],
	},
	210: {
		name: 'Relics visible on map',
		focuses: [Focus.Relic],
	},
}

export const AmountTypeInfo: {[id: string]: string} = {
	1: 'infantry',
	3: 'pierce',
	4: 'melee',
	8: 'cavalry',
	13: 'buildings', // stone defense
	14: 'predators',
	15: 'archers',
	16: 'ships & camels',
	21: 'buildings',
	24: 'boars',
	30: 'camels',
	31: 'armor ignored',
}

export const enum CostType {
	RelicsCaptured = 7
}

export const enum UnitAttribute {
	HP = 0,
	LineOfSight = 1,
	GarrisonCapacity = 2,
	Speed = 5,
	Armor = 8,
	Attack = 9,
	ReloadTime = 10,
	AccuracyPercent = 11,
	MaxRange = 12,
	WorkRate = 13,
	CarryCapacity = 14,
	MinRange = 20,
	ResourceStorage = 21,
	BlastRadius = 22,
	SearchRadius = 23,
	Cost = 100,
	BuildTime = 101,
	TotalMissileCount = 102,
	CostFood = 103,
	CostWood = 104,
	CostGold = 105,
	CostStone = 106,
	MaxMissileCount = 107,
	RegenerationRate = 109,
}

export const UnitAttributeInfo: {[id: number]: string} = {
	[UnitAttribute.HP]: 'HP',
	[UnitAttribute.LineOfSight]: 'line of sight',
	[UnitAttribute.GarrisonCapacity]: 'garrison capacity',
	[UnitAttribute.Speed]: 'move speed',
	[UnitAttribute.Armor]: 'armor',
	[UnitAttribute.Attack]: 'attack',
	[UnitAttribute.ReloadTime]: 'attack delay',
	[UnitAttribute.AccuracyPercent]: 'accuracy',
	[UnitAttribute.MaxRange]: 'max range',
	[UnitAttribute.MinRange]: 'min range',
	[UnitAttribute.WorkRate]: 'work rate',
	[UnitAttribute.CarryCapacity]: 'carry capacity',
	[UnitAttribute.ResourceStorage]: 'population space', //TODO
	[UnitAttribute.BlastRadius]: 'blast radius',
	[UnitAttribute.SearchRadius]: 'line of sight', // 'search radius'
	[UnitAttribute.Cost]: 'cost',
	[UnitAttribute.BuildTime]: 'build time',
	[UnitAttribute.TotalMissileCount]: 'missile count',
	[UnitAttribute.CostFood]: 'food cost',
	[UnitAttribute.CostWood]: 'wood cost',
	[UnitAttribute.CostGold]: 'gold cost',
	[UnitAttribute.CostStone]: 'stone cost',
	[UnitAttribute.MaxMissileCount]: 'missile count',
	[UnitAttribute.RegenerationRate]: 'regeneration',
}

export const UnitFocuses: {[id: number]: Focus[] | undefined} = {
	// Skirmishers
	6: [ Focus.ArcheryAnti ],
	7: [ Focus.ArcheryAnti ],
	1155: [ Focus.ArcheryAnti ],

	// Spears
	93: [ Focus.CavalryAnti ],
	358: [ Focus.CavalryAnti ],
	359: [ Focus.CavalryAnti ],

	// Stables
	101: [ Focus.Cavalry ],
	86: [ Focus.Cavalry ],
	153: [ Focus.Cavalry ],
}

export type TeamIndex = 0 | 1 | 2 | 3

interface UnitClass {
	name: string
	focuses: Focus[]
	waterLevel?: 0 | 1 | 2 | 3
}

export const UnitClassInfo: {[id: number]: UnitClass | undefined} = {
	0: {
		name: 'Archer',
		focuses: [Focus.Archery],
	},
	2: {
		name: 'Trade cog',
		waterLevel: 3,
		focuses: [Focus.ResourceGold],
	},
	3: {
		name: 'Buildings',
		focuses: [],
	},
	4: {
		name: 'Villager',
		focuses: [Focus.Resources],
	},
	6: {
		name: 'Infantry',
		focuses: [Focus.Infantry],
	},
	12: {
		name: 'Cavalry',
		focuses: [Focus.Cavalry],
	},
	13: {
		name: 'Siege engines',
		focuses: [Focus.Siege],
	},
	18: {
		name: 'Monk',
		focuses: [Focus.Monk],
	},
	19: {
		name: 'Trade cart',
		focuses: [Focus.ResourceGold],
	},
	20: {
		name: 'Transport',
		waterLevel: 3,
		focuses: [Focus.Navy],
	},
	21: {
		name: 'Fishing ship',
		waterLevel: 2,
		focuses: [Focus.ResourceFood],
	},
	22: {
		name: 'Navy',
		waterLevel: 2,
		focuses: [Focus.Navy],
	},
	23: {
		name: 'Conquistador',
		focuses: [Focus.Gunpowder, Focus.InfantryAnti],
	},
	24: {
		name: 'Elephant',
		focuses: [Focus.Cavalry, Focus.Siege],
	},
	27: {
		name: 'Wall',
		focuses: [Focus.Wall, Focus.Defense],
	},
	35: {
		name: 'Petard',
		focuses: [Focus.Siege],
	},
	36: {
		name: 'Cavalry Archer',
		focuses: [Focus.Cavalry, Focus.Archery],
	},
	39: {
		name: 'Wall', // Gate
		focuses: [Focus.Wall, Focus.Defense],
	},
	43: {
		name: 'Monk',
		focuses: [Focus.Monk],
	},
	44: {
		name: 'Gunpowder', // Hand cannoneer
		focuses: [Focus.Gunpowder, Focus.InfantryAnti],
	},
	47: {
		name: 'Scout',
		focuses: [Focus.Vision],
	},
	49: {
		name: 'Farm',
		focuses: [Focus.ResourceFood],
	},
	51: {
		name: 'Trebuchet',
		focuses: [Focus.Siege],
	},
	52: {
		name: 'Tower',
		focuses: [Focus.Tower, Focus.Defense],
	},
	53: {
		name: 'Transport',
		waterLevel: 3,
		focuses: [Focus.Navy],
	},
	54: {
		name: 'Trebuchet',
		focuses: [Focus.Siege],
	},
	55: {
		name: 'Siege engines', //TODO
		focuses: [Focus.Siege],
	},
	61: {
		name: 'Herdable',
		focuses: [Focus.ResourceFood, Focus.Vision],
	},
}
