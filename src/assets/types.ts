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
	techIDs: number[]
	teamBonuses: EffectData | null
}

export interface TechData {
	id: number
	name: string
	team: boolean
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

export const enum EffectType {
	UnitSetModifier = 0,
	ResourceModifier = 1,
	UnitEnable = 2,
	UnitUpgrade = 3,
	UnitModifier = 4,
	UnitMultiplier = 5,
	ResourceMultiplier = 6,
	ModifyTechCost = 101,
	DisableTech = 102,
	ModifyTechTime = 103,
}
