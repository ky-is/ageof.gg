export interface EffectDescription {
	text: string
	modifyAge?: CivAge
	groupBy?: string
	age: CivAge | null
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
	Dark = 'dark',
	Feudal = 'feudal',
	Castle = 'castle',
	Imperial = 'imperial',
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

export const ResourceType: {[id: number]: string} = {
	0: 'Food',
	1: 'Wood',
	2: 'Stone',
	3: 'Gold',
	4: 'Population space',
	191: 'Relic Gold',
}

export const ResourceFocus: {[id: string]: {name: string, requires: TechID[], focuses: Focus[]}} = {
	4: {
		name: 'Population space',
		requires: [],
		focuses: [],
	},
	36: {
		name: 'Farm food',
		requires: [],
		focuses: [Focus.ResourceFood],
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
	92: {
		name: 'Starting Wood',
		requires: [],
		focuses: [],
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
}

export const UnitAttribute: {[id: number]: string} = {
	0: 'HP',
	1: 'line of sight',
	9: 'attack',
	13: 'work rate',
	23: 'line of sight', // search radius
	100: 'costs',
	101: 'build time',
}


export const UnitClass: {[id: number]: {name: string, focuses: Focus[]}} = {
	0: {
		name: 'Archery',
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
