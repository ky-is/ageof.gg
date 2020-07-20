import { CivAge, UnitAttribute } from '/@/models/types'
import { EffectType, TreeBranchData } from '/@/assets/types'

import trees from '/@/assets/generated/trees'

export const unitCategoryLines: [string, TreeBranchData[]][] = [
	[
		'archery range',
		[
			trees.archer,
			trees.skirmisher,
			trees.cavalryarcher,
		],
	],
	[
		'barracks',
		[
			trees.militia,
			trees.spear,
			trees.eagle,
		],
	],
	[
		'stable',
		[
			trees.scout,
			trees.knight,
			trees.camel,
			trees.elephant,
			trees.lancer,
		],
	],
	[
		'siege workshop',
		[
			trees.ram,
			trees.mangonel,
			trees.scorpion,
		],
	],
	[
		'dock',
		[
			trees.fireship,
			trees.galley,
			trees.demoship,
			trees.cannongalleon,
		],
	],
	[
		'misc.',
		[
			trees.tower,
			trees.bombardcannon,
			trees.bombardtower,
			trees.monk,
		],
	],
]

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

export const effectSummaries: {[effectID: number]: EffectSummary[] | undefined} = {
	// Aztecs
	[-447]: [
		{
			type: 5,
			replaceName: 'Military units',
		},
	],
	29: [
		{
			extension: 'per Monastery technology'
		},
	],
	460: [
		{
			replace: 'Skirmisher range +1 / building damage +1',
		},
	],

	// Berbers
	[-38]: [
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
			replaceName: 'Villagers / Ships',
		},
	],
	585: [
		{
			replaceName: 'Villagers / Ships',
		},
	],
	586: [
		{
			replaceName: 'Cavalry',
		},
	],
	613: [
		{
			replaceName: 'Cavalry',
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

	// Bulgarians
	685: [
		{
			replaceName: 'Cavalry',
		},
	],
	686: [
		{
			replaceName: 'Militia-line',
		},
	],
	693: [
		{
			replaceName: 'Militia-line upgrades',
		},
		{
			type: 101,
			delete: true,
		},
	],

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

	// Byzantines
	[-256]: [
		{
			type: 101,
			a: [ CivAge.Imperial ],
			replace: 'Imperial Age cost -33%',
		},
	],
	61: [
		{
			replace: 'Cataphracts deal 6 trample damage to infantry', //RELEASE
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
	[-257]: [
		// combine: true, //TODO
	],
	52: [
		{
			replace: 'Chu Ko Nu attack +2, Scorpion attack +4', //TODO
		},
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
			extension: 'per age',
		},
	],
	727: [
		{
			replaceName: 'Cavalry',
			extension: 'per age',
		},
	],
	728: [
		{
			replaceName: 'Cavalry',
			extension: 'per age',
		},
	],

	// Ethiopians
	[-49]: [
		{
			replaceName: 'Tower, Outpost',
		},
	],
	587: [
		{
			// combineNames: true, //TODO
			extension: 'per age',
			// stack: [588, 589], //TODO
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
	[-403]: [
		{
			replaceName: 'Knight',
		},
	],
	[-258]: [
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
	18: [
		{
			// title: 'Anarchy'
			// icon: 33, //TODO
			// replace: 'Huskarl can be trained from Barracks'
		},
	],
	327: [
		{
			extension: 'per age'
		},
	],
	331: [
		{
			delete: true, // Unused
		},
	],

	// Huns
	[-448]: [
		{
			type: 1,
			replace: 'Houses not needed, but starting Wood -100',
		},
		{
			type: 2,
			delete: true,
		},
	],
	21: [
		{
			replace: 'Spies/Treason cost -50%, Relic/Wonder victory +100 years',
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
	[-2]: [
		{
			skipA: [ 207, 329, 330 ],
			replaceName: 'Other camels',
		},
	],
	506: [
		{
			replace: 'Gold income +10%',
		},
	],

	// Italians
	[-10]: [
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

	// Japanese
	[-406]: [
		{
			replaceName: 'Galley',
		},
	],
	59: [
		{
			// combine: true, //TODO
		}
	],
	// 306: [
	// 	{
	// 		c: [0, 8],
	// 		combine: true, //TODO
	// 	}
	// ],
	340: [
		{
			// combineNames: true, //TODO
		}
	],
	484: [
		{
			replaceName: 'Tower',
		},
	],

	// Khmer
	622: [
		{
			replaceName: 'Elephant',
		},
	],
	623: [
		{
			// combineNames: true, //TODO
		},
	],

	// Koreans
	[-505]: [
		{
			replaceName: 'Mangonel-line',
		},
	],
	390: [
		{
			replaceName: 'Military (except siege)',
		},
	],
	442: [
		{
			replace: 'Tower upgrades free',
		},
	],
	443: [
		{
			replace: 'Tower upgrades free',
		},
	],
	444: [
		{
			replace: 'Tower upgrades free',
		},
	],
	445: [
		{
			replaceName: 'Mangonel-line',
		},
	],
	452: [
		{
			replaceName: 'Towers',
			extension: 'per age',
		},
	],
	453: [
		{
			replaceName: 'Towers',
			extension: 'per age',
		},
	],

	// Lithuanians
	692: [
		{
			replaceName: 'Spears, Skirmishers',
		},
	],
	699: [
		{
			replace: 'Knight, Leitis +1 attack per relic (+4 max)',
		},
	],
	700: [
		{
			replace: 'Knight, Leitis +1 attack per relic (+4 max)',
		},
	],
	701: [
		{
			replace: 'Knight, Leitis +1 attack per relic (+4 max)',
		},
	],
	702: [
		{
			replace: 'Knight, Leitis +1 attack per relic (+4 max)',
		},
	],
	710: [
		{
			replaceName: 'Spears, Skirmishers',
		},
	],

	// Magyars
	[-6]: [
		{
			replace: 'Archers (except Skirmishers) line of sight +2',
		},
	],
	[-5]: [
		{
			replaceName: 'Forging upgrade line',
		},
	],
	473: [
		{
			replaceName: 'Scout-line',
		},
	],
	515: [
		{
			a: [ 172, 437, 698, 731, 930, 943, 1010, 1012, 1034, 1036, 1106, 1166, 1267, 1269, 1275, 1276, 1297, 1303 ],
			delete: true,
		},
		{
			replaceName: 'Cavalry Archers',
		},
	],

	// Malay
	[-649]: [
		{
			replaceName: 'Dock',
		},
	],
	624: [
		{
			replace: 'Upgrade Docks to Harbors, which fire arrows',
		},
	],
	625: [
		{
			replace: 'Militia-line Gold cost replaced with Food',
		},
	],
	634: [
		{
			replace: 'Age advance speed +66%',
		},
	],

	// Malians
	577: [
		{
			replaceName: 'Cavalry',
			// removeSuffix: 'vs', //TODO
		},
	],
	591: [
		{
			a: [ 751, 752, 753 ],
			delete: true,
		},
		{
			replaceName: 'Barracks units',
			extension: 'per age',
		},
	],
	592: [
		{
			a: [ 751, 752, 753 ],
			delete: true,
		},
		{
			replaceName: 'Barracks units',
			extension: 'per age',
		},
	],
	593: [
		{
			a: [ 751, 752, 753 ],
			delete: true,
		},
		{
			replaceName: 'Barracks units',
			extension: 'per age',
		},
	],
	595: [
		{
			replaceName: 'Buildings',
		},
	],

	// Mayans
	[-449]: [
		{
			type: 5,
			c: 13,
			delete: true,
		},
		{
			type: 5,
			c: 100,
			replaceName: 'Archers',
			stack: [53, 56], //TODO
		},
		{
			type: 1,
			b: 0,
			replaceName: 'Resources last',
		},
	],
	4: [
		{
			replaceName: 'Eagles',
		},
	],
	485: [
		{
			replaceName: 'Archers',
		},
	],

	// Mongols
	[-407]: [
		{
			replaceName: 'Scouts',
		},
	],
	388: [
		{
			// combineNames: true, //TODO
		},
	],

	// Persians
	[-408]: [
		{
			replaceName: 'Knight-line',
		},
	],
	[-260]: [
		{
			// combineNames: true, //TODO
		},
	],
	7: [
		{
			replaceName: 'Elephants',
		},
	],
	342: [
		{
			ages: [CivAge.Dark],
		},
	],
	349: [
		{
			ages: [CivAge.Dark],
		},
	],
	409: [
		{
			// combineAmounts: true, //TODO
		},
	],
	412: [
		{
			// combineAmounts: true, //TODO
		},
	],
	488: [
		{
			replaceName: 'Archer',
		},
	],

	// Portuguese
	559: [
		{
			replaceName: 'All units',
		},
	],
	560: [
		{
			replaceName: 'Ships',
		},
	],
	572: [
		{
			replaceName: 'Ships',
		},
	],

	// Saracens
	9: [
		{
			replaceName: 'Camel units',
		},
	],
	312: [
		{
			skipA: [ -1 ],
			replaceName: 'Archers',
			extension: 'per age'
		},
	],
	725: [
		{
			skipA: [ -1 ],
			replaceName: 'Archers',
		},
	],
	726: [
		{
			skipA: [ -1 ],
			replaceName: 'Archers',
		},
	],
	404: [
		{
			replaceName: 'Galley-line',
		},
	],
	490: [
		{
			replace: 'Monks refund 50% of gold cost on death',
		},
	],

	// Spanish
	[-490]: [
		{
			type: 5,
			replaceName: 'Trade units',
			ages: [CivAge.Feudal], //TODO remove
		},
	],
	[-446]: [
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

	// Tartars
	687: [
		{
			replaceName: 'Scouts / Steppe Lancers',
		},
	],
	688: [
		{
			a: [ 729, 730 ],
			delete: true,
		},
		{
			// combine: true, //TODO
		},
	],

	// Teutons
	334: [
		{
			a: [ 751, 752, 753 ],
			delete: true,
		},
		{
			replaceName: 'Barracks/Stable units',
		},
	],
	335: [
		{
			a: [ 751, 752, 753 ],
			delete: true,
		},
		{
			replaceName: 'Barracks/Stable units',
		},
	],
	489: [
		{
			replaceName: 'Siege engines',
		},
	],

	// Turks
	[-410]: [
		{
			replaceName: 'Gunpowder units',
			ages: [CivAge.Castle],
		},
	],
	[-263]: [
		{
			type: 101,
			replace: 'Gunpowder techs cost -50%',
		},
		{
			type: 103,
			a: [ 254, 428 ],
			replaceName: 'Scout upgrades',
		},
	],

	// Vietnamese
	[-652]: [
		{
			type: 101,
			replaceName: 'Economy upgrades',
		},
	],
	628: [
		{
			replaceName: 'Elephants',
		},
	],
	632: [
		{
			replaceName: 'Archery range units',
		},
	],

	// Vikings
	[-411]: [
		{
			replaceName: 'Docks',
		},
	],
	[-276]: [
		{
			// combineNames: true, //TODO
		},
	],
	395: [
		{
			replaceName: 'Ships',
		},
	],
	501: [
		{
			replaceName: 'Ships',
		},
	],
	502: [
		{
			replaceName: 'Ships',
		},
	],
}
