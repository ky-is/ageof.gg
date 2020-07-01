export class CivBonusesEntry {
	name: string
	focuses: Focus[]
	bonuses: CivBonus[]

	constructor (name: string, focuses: Focus[], bonuses: CivBonusOptions[]) {
		this.name = name
		this.focuses = focuses
		this.bonuses = bonuses.map(options => new CivBonus(options))
	}

	getTeamFocuses () {
		return this.bonuses.filter(bonus => bonus.team).flatMap(bonus => bonus.focuses)
	}

	getMinorFocuses () {
		const majorFocuses = this.focuses
		const bonuses = this.bonuses
		return Array.from(new Set(bonuses.filter(bonus => !bonus.team).flatMap(bonus => bonus.focuses).filter(focus => !majorFocuses.includes(focus))))
	}

	getGroupedBonuses () {
		const groupedBonuses: [string, CivBonus[]][] = [['team', []], ['general', []], ['castle', []]]
		for (const bonus of this.bonuses) {
			let group
			if (bonus.team) {
				group = groupedBonuses[0]
			} else if (bonus.type !== undefined && bonus.type !== BonusType.Trait) {
				group = groupedBonuses[2]
			} else {
				group = groupedBonuses[1]
			}
			group[1].push(bonus)
		}
		return groupedBonuses
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

	getFirstAvailableAge (): CivAge {
		if (!this.strengthByAge) {
			return this.building?.age ?? CivAge.Dark
		}
		if (this.strengthByAge[0] !== Strength.Unavailable) {
			return CivAge.Dark
		}
		if (this.strengthByAge[1] !== Strength.Unavailable) {
			return CivAge.Feudal
		}
		if (this.strengthByAge[2] !== Strength.Unavailable) {
			return CivAge.Castle
		}
		return CivAge.Imperial
	}

	getBonusTechAge (): CivAge | null {
		if (!this.strengthByAge || this.type !== BonusType.Tech) {
			return null
		}
		return this.strengthByAge[2] === Strength.Unavailable ? CivAge.Imperial : CivAge.Castle
	}
}

export enum Focus {
	// NOTE: Should these be plural or singular?
	Archery = 'archery',
	ArcheryAnti = 'anti-archery',
	Cavalry = 'cavalry',
	CavalryAnti = 'anti-cavalry',
	Defense = 'defense',
	Elephantry = 'elephant',
	Infantry = 'infantry',
	InfantryAnti = 'anti-infantry',
	Military = 'military',
	Monk = 'monk',
	Navy = 'navy',
	Relic = 'relics',
	Resources = 'resources',
	ResourceFood = 'food',
	ResourceGold = 'gold',
	ResourceStone = 'stone',
	ResourceWood = 'wood',
	Siege = 'siege',
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
