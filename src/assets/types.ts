export const enum ResourceType {
	MonkConversionEnabled = 27,
	BuildingConversionEnabled = 28,
	FaithRechargeRate = 35,
	Theocracy = 193,
}

export const enum CostType {
	RelicsCaptured = 7
}

export type CostData = [number, number, number]

export type EffectCommandData = [number, number, number, number, number]
export interface EffectData {
	id: number
	commands: EffectCommandData[]
}

export interface CivData {
	name: string
	remove: number[]
	modify: EffectData
	uniqueTechIDs: number[]
	teamBonuses: EffectData | null
}

export interface TechData {
	id: number
	name: string
	team?: boolean
	building: number | null
	requires: number[]
	costs: CostData[]
	time: number
	icon: number | null
	effect: EffectData | null
}

export interface UnitData {
	name: string
	class: number
	icon: number | null
}

export interface TreeBranchData {
	name: string
	class: number
	resources?: ResourceType[]
	units: number[][]
	upgrades: number[]
}
