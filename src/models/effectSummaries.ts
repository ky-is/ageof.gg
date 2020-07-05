import type { EffectType } from '/@/assets/types'
import { CivAge } from '/@/models/types'

interface EffectSummary {
	type: EffectType
	ages?: CivAge[]
	a?: number[]
	b?: number
	c?: number
	skipA?: number[]
	replace?: string //RELEASE hardcoded strings must be validated every new patch
	replaceName?: string
	delete?: boolean
	stack?: number[]
}

const effectSummaries: {[effectID: number]: EffectSummary[]} = {
	2: [ // Indians
		{
			type: 4,
			replaceName: 'Camels',
		},
	],

	6: [ // Magyars
		{
			type: 4,
			replaceName: 'Archers (except skirmishers)',
		},
	],

	10: [ // Italians
		{
			type: 101,
			skipA: [CivAge.Feudal, CivAge.Castle, CivAge.Imperial],
			replace: 'Dock upgrades cost -50%',
		},
		{
			type: 101,
			a: [CivAge.Feudal, CivAge.Castle, CivAge.Imperial],
			replace: 'Advancing to the next age costs -15%',
		},
	],

	49: [ // Ethiopians
		{
			type: 4,
			replaceName: 'Tower/Outpost',
		},
	],

	258: [ // Franks
		{
			type: 103,
			replaceName: 'Farm upgrades',
		},
	],
	403: [ // Franks
		{
			type: 4,
			replaceName: 'Knights',
			// ages: [CivAge.Castle],
		},
	],

	263: [ // Turks
		{
			type: 101,
			replace: 'Gunpowder techs cost -50%',
			// ages: [CivAge.Castle],
		},
		{
			type: 103,
			a: [254],
			replaceName: 'Scout upgrades',
		},
		{
			type: 103,
			a: [428],
			delete: true,
		},
	],
	410: [ // Turks
		{
			type: 5,
			replaceName: 'Gunpowder units',
			ages: [CivAge.Castle],
		},
	],

	304: [ // Chinese
		{
			type: 1,
			delete: true,
		},
	],
	349: [ // Chinese
		{
			type: 1,
			stack: [350, 351], //TODO
			// ages: [CivAge.Feudal],
		},
	],

	342: [ // Goths
		{
			type: 5,
			stack: [765, 767], //TODO
		},
	],

	407: [ // Mongols
		{
			type: 4,
			replaceName: 'Scouts',
		},
	],

	411: [ // Vikings
		{
			type: 5,
			replaceName: 'Docks',
		},
	],

	446: [ // Spanish
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
	490: [ // Spanish
		{
			type: 5,
			replaceName: 'Trade units',
			ages: [CivAge.Feudal],
		},
	],

	447: [ // Aztecs
		{
			type: 5,
			replaceName: 'Military units',
		},
	],

	449: [ // Mayans
		{
			type: 5,
			c: 13,
			delete: true,
		},
		{
			type: 1,
			b: 0,
			replaceName: 'Resources last',
		},
		{
			type: 5,
			c: 100,
			replaceName: 'Archers',
			stack: [485, 486], //TODO
		},
	],

	649: [ // Malay
		{
			type: 5,
			replaceName: 'Dock',
		},
	],

	652: [ // Vietnamese
		{
			type: 101,
			replaceName: 'Economy upgrades',
		},
	],
}

export default effectSummaries
