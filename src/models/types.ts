export interface CivilizationBonusesEntry {
	name: string
	focuses: Focus[]
	bonuses: CivilizationBonus[]
}

export interface CivilizationBonus {
	team?: boolean
	type?: BonusType
	building?: Building
	name?: string
	description: string
	strengthByAge?: Strength[]
	focuses: Focus[]
}

export enum Focus {
	Archery = "archery",
	ArcheryAnti = "anti-archery",
	Cavalry = "cavalry",
	CavalryAnti = "anti-cavalry",
	Defense = "defense",
	Infantry = "infantry",
	InfantryAnti = "anti-infantry",
	Military = "military",
	Monk = "monk",
	Navy = "navy",
	Resources = "resources",
	ResourceFood = "food",
	ResourceGold = "gold",
	ResourceStone = "stone",
	Siege = "siege",
	UniqueUnits = "unique unit",
}

export function getFocus(value: string): Focus {
	const focusKey = <keyof typeof Focus>value
	return Focus[focusKey]
}

export const enum Strength {
	Unavailable,
	Weak,
	Medium,
	Strong,
}

export const enum BonusType {
	Trait,
	Unit,
	Tech,
}

export const enum Building {
	ArcheryRange,
	Castle,
	Dock,
	Monastery,
	Stable,
}
