export interface EffectDescription {
	id: number
	title: string | null
	description: string
	modifyAge?: boolean
	names: string[]
	ages: CivAge[]
	icon?: number
	team: boolean
	castle: boolean

	type: number
	a: number
	b: number
	c: number
	d: number
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
}

export const enum Strength {
	Unavailable,
	Weak,
	Normal,
	Strong,
}

export const enum BonusType {
	Trait,
	Unit,
	Tech,
}

export const enum CivAge {
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

export const ResourceTypeInfo: {[id: string]: {name: string, requires: TechID[], focuses: Focus[]}} = {
	0: {
		name: 'Food',
		requires: [],
		focuses: [Focus.ResourceFood],
	},
	1: {
		name: 'Wood',
		requires: [],
		focuses: [Focus.ResourceWood],
	},
	2: {
		name: 'Stone',
		requires: [],
		focuses: [Focus.ResourceStone],
	},
	3: {
		name: 'Gold',
		requires: [],
		focuses: [Focus.ResourceGold],
	},
	4: {
		name: 'Population space',
		requires: [],
		focuses: [],
	},
	32: {
		name: 'Population max cap',
		requires: [],
		focuses: [Focus.Military],
	},
	36: {
		name: 'Farm food',
		requires: [],
		focuses: [Focus.ResourceFood],
	},
	47: {
		name: 'Gold mining',
		requires: [],
		focuses: [Focus.ResourceGold],
	},
	77: {
		name: 'Conversion resistance',
		requires: [],
		focuses: [Focus.MonkAnti],
	},
	79: {
		name: 'Stone mining',
		requires: [],
		focuses: [Focus.ResourceStone],
	},
	85: {
		name: 'Research cost',
		requires: [],
		focuses: [Focus.Resources],
	},
	89: {
		name: 'Monk healing rate',
		requires: [],
		focuses: [Focus.Monk, Focus.Defense],
	},
	91: {
		name: 'Starting Food',
		requires: [],
		focuses: [Focus.ResourceFood],
	},
	92: {
		name: 'Starting Wood',
		requires: [],
		focuses: [Focus.ResourceWood],
	},
	94: {
		name: 'Starting Gold',
		requires: [],
		focuses: [Focus.ResourceGold],
	},
	96: {
		name: 'Berserker heal delay',
		requires: [],
		focuses: [],
	},
	189: {
		name: 'Wood chopping',
		requires: [],
		focuses: [Focus.ResourceWood],
	},
	190: {
		name: 'Food gathering',
		requires: [],
		focuses: [Focus.ResourceFood],
	},
	191: {
		name: 'Relic gold income',
		requires: [TechID.CastleAge],
		focuses: [Focus.Relic, Focus.ResourceGold],
	},
	195: {
		name: 'Construction rate',
		requires: [],
		focuses: [Focus.Defense],
	},
	210: {
		name: 'Relics visible on map',
		requires: [],
		focuses: [Focus.Relic],
	},
}

export const enum UnitAttribute {
	HP = 0,
	LineOfSight = 1,
	Speed = 5,
	Attack = 9,
	ReloadTime = 10,
	AccuracyPercent = 11,
	MaxRange = 12,
	WorkRate = 13,
	CarryCapacity = 14,
	MinRange = 20,
	SearchRadius = 23,
	Cost = 100,
	BuildTime = 101,
	CostFood = 103,
	CostWood = 104,
	CostGold = 105,
	CostStone = 106,
}

export const UnitAttributeInfo: {[id: number]: string} = {
	[UnitAttribute.HP]: 'HP',
	[UnitAttribute.LineOfSight]: 'line of sight',
	[UnitAttribute.Speed]: 'Speed',
	[UnitAttribute.Attack]: 'attack',
	[UnitAttribute.ReloadTime]: 'reload time',
	[UnitAttribute.AccuracyPercent]: 'accuracy',
	[UnitAttribute.MaxRange]: 'max range',
	[UnitAttribute.MinRange]: 'min range',
	[UnitAttribute.WorkRate]: 'work rate',
	[UnitAttribute.CarryCapacity]: 'carry capacity',
	[UnitAttribute.SearchRadius]: 'line of sight', // 'search radius'
	[UnitAttribute.Cost]: 'cost',
	[UnitAttribute.BuildTime]: 'build time',
	[UnitAttribute.CostFood]: 'food cost',
	[UnitAttribute.CostWood]: 'wood cost',
	[UnitAttribute.CostGold]: 'gold cost',
	[UnitAttribute.CostStone]: 'stone cost',
}

export const UnitClass: {[id: number]: {name: string, focuses: Focus[]}} = {
	0: {
		name: 'Archer',
		focuses: [Focus.Archery],
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
		name: 'Siege',
		focuses: [Focus.Siege],
	},
	21: {
		name: 'Standard Buildings',
		focuses: [Focus.Defense],
	},
	22: {
		name: 'Navy',
		focuses: [Focus.Navy],
	},
	23: {
		name: 'Conquistador',
		focuses: [Focus.Gunpowder, Focus.InfantryAnti],
	},
	27: {
		name: 'Wall',
		focuses: [Focus.Defense],
	},
	36: {
		name: 'Cavalry Archer',
		focuses: [Focus.Cavalry, Focus.Archery],
	},
	39: {
		name: 'Wall', // Gate
		focuses: [Focus.Defense],
	},
	44: {
		name: 'Gunpowder', // Hand cannoneer
		focuses: [Focus.Gunpowder, Focus.InfantryAnti],
	},
	52: {
		name: 'Tower',
		focuses: [Focus.Tower, Focus.Defense],
	},
}
