type CostData = [number, number, number]
type EffectData = [number, number, number, number, number]

export interface CivData {
	name: string
	remove: number[]
	modify: number[][]
	uniques: number[]
	teamBonusEffects: EffectData[] | null
}

export interface TechData {
	name: string
	building: number | null
	requires: number[]
	costs: CostData[]
	time: number
	icon: number | null
	effects: EffectData[] | null
}

export interface UnitData {
	name: string
	icon: number | null
}

// const EffectType = {
// 	UnitMultiplier: 5,
// 	ModifyCost: 101,
// 	ModifyTime: 103,
// 	Remove: 102,
// }
// const EffectResources = [ 'Food', 'Wood', 'stone', 'gold' ]
