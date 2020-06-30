export class CivBonusesEntry {
	name: string
	focuses: Focus[]
	bonuses: CivBonus[]

	constructor (name: string, focuses: Focus[], bonuses: CivBonusOptions[]) {
		this.name = name
		this.focuses = focuses
		this.bonuses = bonuses.map(options => new CivBonus(options))
	}
}

interface CivBonusOptions {
	team?: boolean
	type?: BonusType
	building?: Building
	name?: string
	description: string
	clarification?: string
	strengthByAge?: Strength[]
	focuses: Focus[]
}

export class CivBonus {
	team?: boolean
	type?: BonusType
	building?: Building
	name?: string
	description: string
	clarification?: string
	strengthByAge?: Strength[]
	focuses: Focus[]

	constructor ({ team, type, building, name, description, clarification, strengthByAge, focuses }: CivBonusOptions) {
		this.team = team
		this.type = type
		this.building = building
		this.name = name
		this.description = description
		this.clarification = clarification
		this.strengthByAge = strengthByAge
		this.focuses = focuses
	}
}

export enum Focus {
	Archery = 'archery',
	ArcheryAnti = 'anti-archery',
	Cavalry = 'cavalry',
	CavalryAnti = 'anti-cavalry',
	Defense = 'defense',
	Infantry = 'infantry',
	InfantryAnti = 'anti-infantry',
	Military = 'military',
	Monk = 'monk',
	Navy = 'navy',
	Resources = 'resources',
	ResourceFood = 'food',
	ResourceGold = 'gold',
	ResourceStone = 'stone',
	Siege = 'siege',
	UniqueUnits = 'unique unit',
}

export function getFocus(value: keyof typeof Focus): Focus {
	return Focus[value]
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

export const enum Building {
	ArcheryRange,
	Castle,
	Dock,
	Monastery,
	Stable,
}
