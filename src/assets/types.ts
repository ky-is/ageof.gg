export type CostData = [number, number, number]

export type EffectCommandData = [number, number, number, number, number]
export interface EffectData {
	name: string
	commands: EffectCommandData[]
}

export interface CivData {
	name: string
	remove: number[]
	modify: EffectCommandData[]
	uniqueTechs: number[]
	teamBonuses: EffectCommandData[]
}

export interface TechData {
	name: string
	building: number | null
	requires: number[]
	costs: CostData[]
	time: number
	icon: number | null
	commands: EffectCommandData[] | null
}

export interface UnitData {
	name: string
	class: number
	icon: number | null
}

export const enum EffectType {
	ResourceModifier = 1,
	UnitEnable = 2,
	UnitAvailable = 3,
	UnitModifier = 4,
	UnitMultiplier = 5,
	ResourceMultiplier = 6,
	ModifyTech = 101,
	DisableTech = 102,
	ModifyTechTime = 103,
}
