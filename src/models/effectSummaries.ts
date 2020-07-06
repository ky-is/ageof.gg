import type { EffectType } from '/@/assets/types'
import { CivAge, UnitAttribute } from '/@/models/types'

export interface EffectSummary {
	type?: EffectType
	ages?: CivAge[]
	a?: number[]
	b?: number
	c?: number
	skipA?: number[]
	replace?: string //RELEASE hardcoded strings must be validated every new patch
	replaceName?: string
	extension?: string
	delete?: boolean
	stack?: number[]
}

export const effectSummaries: {[effectID: number]: EffectSummary[]} = {
	// Aztecs
	447: [
		{
			type: 5,
			replaceName: 'Military units',
		},
	],
	460: [
		{
			replace: 'Skirmisher range +1 / building damage +1',
		},
	],

	// Berbers
	38: [
		{
			ages: [CivAge.Castle],
		},
	],
	579: [
		{
			replaceName: 'Camels',
		},
	],
	584: [
		{
			replaceName: 'Villager / Navy',
		},
	],
	585: [
		{
			replaceName: 'Villager / Navy',
		},
	],

	// Bulgarians
	// 686: [
	// 	{
	// 		replaceName: 'Militia-line',
	// 	},
	// ],
	// 693: [
	// 	{
	// 		replaceName: 'Militia-line',
	// 	},
	// ],

	// Burmese
	626: [
		{
			replaceName: 'Elephant',
			// removeEnd: true, //TODO
		},
	],
	627: [
		{
			replaceName: 'Cavalry / Arambai',
		},
	],
	645: [
		{
			replaceName: 'Lumber camp upgrades',
		},
	],
	646: [
		{
			// removeEnd: true, //TODO
		},
	],
	649: [
		{
			replace: 'Monastery upgrades cost -50%',
		},
	],
	651: [
		{
			// removeEnd: true, //TODO
		},
	],

	// Britons
	3: [
		{
			replace: 'Archers range +1, Towers damage +2',
		},
	],
	382: [
		{
			replace: 'Archers (except skirmishers) range +1 Castle/+1 Imperial Age',
		},
	],
	403: [
		{
			replace: 'Archers (except skirmishers) range +1 Castle/+1 Imperial Age',
			//TODO not .castle
		},
	],
	461: [
		{
			// combine: true, //TODO
		},
	],

	// Byzantines
	256: [
		{
			type: 101,
			a: [CivAge.Imperial],
			replace: 'Imperial Age cost -33%',
		},
	],
	283: [
		{
			replaceName: 'Buildings',
		},
	],
	284: [
		{
			replaceName: 'Trash units',
		},
	],
	397: [
		{
			c: UnitAttribute.Attack,
			delete: true,
		},
		{
			replaceName: 'Fire ships',
		},
	],
	417: [
		{
			replaceName: 'Buildings',
		},
	],
	418: [
		{
			replaceName: 'Buildings',
		},
	],
	419: [
		{
			replaceName: 'Buildings',
		},
	],
	464: [
		{
			replaceName: 'Fire ships',
		},
	],

	// Celts
	5: [
		{
			replaceName: 'Siege units'
		},
	],
	386: [
		{
			replaceName: 'Siege'
		},
	],
	482: [
		{
			replaceName: 'Towers / Castles'
		},
	],

	// Chinese
	52: [
		{
			replace: 'Chu Ko Nu attack +2, Scorpion attack +4', //TODO
		},
	],
	257: [
		// combine: true, //TODO
	],
	304: [
		{
			stack: [350, 351], //TODO
			ages: [CivAge.Feudal],
		},
	],
	396: [
		{
			replaceName: 'Demolition ships',
		},
	],
	425: [
		{
			replace: 'Town Center population space +5, line of sight +5',
		},
	],
	462: [
		{
			replaceName: 'Wall / Tower',
		},
	],

	// Cumans
	689: [
		{
			replaceName: 'Scout Cavalry / Steppe Lancer',
		},
	],
	690: [
		{
			replace: 'Teammates can create 10 free Kipchak',
		},
	],
	705: [
		{
			replace: 'Battering Ram / Capped Ram available',
		},
	],
	706: [
		{
			replace: 'Battering Ram / Capped Ram available',
		},
	],
	709: [
		{
			replaceName: 'Town Center, Siege Workshop',
		},
	],
	723: [
		{
			delete: true,
		},
	],
	724: [
		{
			delete: true,
		},
	],
	711: [
		{
			replaceName: 'Cavalry',
			extension: ' per age',
		},
	],
	727: [
		{
			replaceName: 'Cavalry',
			extension: ' per age',
		},
	],
	728: [
		{
			replaceName: 'Cavalry',
			extension: ' per age',
		},
	],

	// Ethiopians
	49: [
		{
			replaceName: 'Tower, Outpost',
		},
	],
	587: [
		{
			// combineNames: true, //TODO
			extension: ' per age',
			// stack: [588, 589], //TODO
		},
	],
	588: [
		{
			// combineNames: true, //TODO
			extension: ' per age',
		},
	],
	589: [
		{
			// combineNames: true, //TODO
			extension: ' per age',
		},
	],
	607: [
		{
			replaceName: 'Archer',
		},
	],
	575: [
		{
			replace: 'Siege engines blast radius increased',
		},
	],

	// Franks
	258: [
		{
			replaceName: 'Farm upgrades', //TODO
		},
	],
	290: [
		{
			replaceName: 'Cavalry',
		},
	],

	// Goths
	// 342: [
	// 	{
	// 		type: 5,
	// 		stack: [765, 767], //TODO
	// 	},
	// ],

	// Huns
	21: [
		{
			replace: 'Spies/Treason cost -50%, Relic/Wonder victory +100 years',
		},
		{
			type: 2,
			delete: true,
		},
	],
	448: [
		{
			type: 1,
			replace: 'Houses not needed, but starting Wood -100',
		},
		{
			type: 2,
			delete: true,
		},
	],
	483: [
		{
			replace: 'Tarkan can be trained from Stables',
		},
	],

	// Incas
	495: [
		{
			replaceName: 'House',
		},
	],
	474: [
		{
			replace: 'Villagers affected by Blacksmith upgrades',
		},
	],
	475: [
		{
			replace: 'Villagers affected by Blacksmith upgrades',
		},
	],
	476: [
		{
			replace: 'Villagers affected by Blacksmith upgrades',
		},
	],
	477: [
		{
			replace: 'Villagers affected by Blacksmith upgrades',
		},
	],
	478: [
		{
			replace: 'Villagers affected by Blacksmith upgrades',
		},
	],
	479: [
		{
			replace: 'Villagers affected by Blacksmith upgrades',
		},
	],
	516: [
		{
			replaceName: 'Skirmishers / Slingers',
		},
	],
	517: [
		{
			replace: 'Kamayuks, Slingers, Eagles +1/+2P armor',
		},
	],
	519: [
		{
			replaceName: 'Buildings',
		},
	],

	// Indians
	2: [
		{
			skipA: [207, 329, 330],
			replaceName: 'Other camels',
		},
	],
	506: [
		{
			replace: 'Gold income +10%',
		},
	],

	// Italians
	10: [
		{
			type: 101,
			replace: 'Dock upgrades cost -15%',
		},
	],
	494: [
		{
			replace: 'Foot archer armor +1/+1P',
		},
	],
	499: [
		{
			replaceName: 'Trade units',
		},
	],
	500: [
		{
			replaceName: 'Gunpowder units',
		},
	],

	// Malay
	// 649: [
	// 	{
	// 		type: 5,
	// 		replaceName: 'Dock',
	// 	},
	// ],

	// Mayans
	449: [
		{
			type: 5,
			c: 13,
			delete: true,
		},
		{
			type: 5,
			c: 100,
			replaceName: 'Archers',
			stack: [485, 486], //TODO
		},
		{
			type: 1,
			b: 0,
			replaceName: 'Resources last',
		},
	],

	// Mongols
	388: [
		{
			// combineNames: true, //TODO
		},
	],
	407: [
		{
			replaceName: 'Scouts',
		},
	],

	// Spanish
	446: [
		{
			type: 5,
			replaceName: 'Gunpowder',
			ages: [CivAge.Imperial],
		},
		{
			type: 101,
			replaceName: 'Blacksmith upgrades',
		},
	],
	490: [
		{
			type: 5,
			replaceName: 'Trade units',
			ages: [CivAge.Feudal], //TODO remove
		},
	],

	// Turks
	263: [
		{
			type: 101,
			replace: 'Gunpowder techs cost -50%',
		},
		{
			type: 103,
			a: [254, 428],
			replaceName: 'Scout upgrades',
		},
	],
	410: [
		{
			replaceName: 'Gunpowder units',
			ages: [CivAge.Castle],
		},
	],

	// Vietnamese
	652: [
		{
			type: 101,
			replaceName: 'Economy upgrades',
		},
	],

	// Vikings
	411: [
		{
			replaceName: 'Docks',
		},
	],
}
