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

interface EffectData {
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
