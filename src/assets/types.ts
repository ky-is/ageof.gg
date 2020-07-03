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
	UnitMultiplier = 5,
	ModifyCost = 101,
	Remove = 102,
	ModifyTime = 103,
}
