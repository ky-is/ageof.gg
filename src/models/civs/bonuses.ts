import { BonusType, Building, Focus, Strength } from '../types'

export default [
	{
		name: 'Aztecs',
		focuses: [Focus.Monk, Focus.Infantry],
		bonuses: [
			// Traits
			{
				team: true,
				building: Building.Monastery,
				description: 'Relic gold generation +33%',
				focuses: [Focus.Resources, Focus.ResourceGold],
			},
			{
				description: 'Villager carry capacity +5',
				focuses: [Focus.Resources],
			},
			{
				description: 'Military creation speed +10%',
				focuses: [Focus.Military],
			},
			{
				building: Building.Monastery,
				description: 'Monk hitpoints +5 _per_ Monastery technology',
				focuses: [Focus.Monk],
			},
			{
				description: 'Start with +50 gold',
				strengthByAge: [Strength.Unavailable, Strength.Medium, Strength.Weak, Strength.Unavailable],
				focuses: [Focus.Resources],
			},
			// Uniques
			{
				type: BonusType.Unit,
				building: Building.Castle,
				name: 'Jaguar Warrior',
				description: '',
				focuses: [Focus.Infantry],
			},
			{
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Atlatl',
				description: 'Skirmisher attack/range +1',
				focuses: [Focus.ArcherAnti],
			},
			{
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Garland Wars',
				description: 'Infantry attack +4',
				focuses: [Focus.Infantry],

			},
		],
	},

	{
		name: 'Berbers',
		focuses: [Focus.Cavalry, Focus.Navy],
		bonuses: [
			// Traits
			{
				description: 'Villager move speed +10%',
				focuses: [Focus.Resources],
			},
			{
				building: Building.Stable,
				description: 'Stable unit cost -10% Castle, -20% Imperial',
				focuses: [Focus.Cavalry],
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Medium, Strength.Strong],
			},
			{
				building: Building.Dock,
				description: 'Ship move speed +10%',
				focuses: [Focus.Navy],
			},
			// Uniques
			{
				type: BonusType.Unit,
				building: Building.Castle,
				name: 'Camel Archer',
				description: 'Cavalry archer',
				focuses: [Focus.Archer, Focus.Cavalry],
			},
			{
				team: true,
				type: BonusType.Unit,
				building: Building.Castle,
				name: 'Genitour',
				description: 'Mounted skirmisher',
				focuses: [Focus.Cavalry, Focus.ArcherAnti],
			},
			{
				team: true,
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Kasbah',
				description: 'Castle production +25%',
				focuses: [Focus.UniqueUnits],
			},
		],
	},
]
