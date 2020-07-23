export interface TreeEffect {
	EffectCommands: TreeCommand[]
}
export interface TreeCommand {
	Type: number
	A: number
	B: number
	C: number
	D: number
}

export interface TreeCiv {
	Name: string
	Units: TreeUnit[]
	TechTreeID: number
	TeamBonusID: number
}
export interface TreeUnit {
	Name: string
	Class: number
	IconID: number
	LanguageDLLName: number
}

export interface TreeTech {
	Name: string
	EffectID: number
	ResearchLocation: number
	ResearchTime: number
	Civ: number
	RequiredTechs: number[]
	IconID: number
	ResourceCosts: TreeCost[]
	LanguageDLLName: number
}
export interface TreeCost {
	Type: number
	Amount: number
	Flag: number
}
