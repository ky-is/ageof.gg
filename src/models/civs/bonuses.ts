import { BonusType, Building, Focus, Strength, CivilizationBonusesEntry } from '/@/models/types'

export const civsBonuses: CivilizationBonusesEntry[] = [
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
				strengthByAge: [Strength.Unavailable, Strength.Normal, Strength.Weak, Strength.Unavailable],
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
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Weak],
				focuses: [Focus.ArcheryAnti],
			},
			{
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Garland Wars',
				description: 'Infantry attack +4',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Unavailable, Strength.Strong],
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
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Normal, Strength.Strong],
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
				focuses: [Focus.Archery, Focus.Cavalry],
			},
			{
				team: true,
				type: BonusType.Unit,
				building: Building.Castle,
				name: 'Genitour',
				description: 'Mounted skirmisher',
				focuses: [Focus.Cavalry, Focus.ArcheryAnti],
			},
			{
				team: true,
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Kasbah',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Strong],
				description: 'Castle production +25%',
				focuses: [Focus.UniqueUnits],
			},
			{
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Maghrebi Camels',
				description: 'Camel units regenerate',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Unavailable, Strength.Strong],
				focuses: [Focus.Cavalry, Focus.UniqueUnits],
			},
		],
	},

	{
		name: 'Britons',
		focuses: [Focus.Archery],
		bonuses: [
			// Traits
			{
				team: true,
				building: Building.ArcheryRange,
				description: 'Archery Ranges production +20%',
				focuses: [Focus.Archery],
			},
			{
				description: 'Town Centers wood cost -50%',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Normal, Strength.Weak],
				focuses: [Focus.Resources],
			},
			{
				description: 'Shepherds gathering speed +25%',
				strengthByAge: [Strength.Strong, Strength.Weak, Strength.Unavailable, Strength.Unavailable],
				focuses: [Focus.Resources, Focus.ResourceFood],
			},
			{
				description: 'Foot archers range +1 Castle/+1 Imperial',
				clarification: 'except Skirmishers',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Strong],
				focuses: [Focus.Archery],
			},
			// Uniques
			{
				type: BonusType.Unit,
				building: Building.Castle,
				name: 'Longbowman',
				description: 'Long-ranged archer',
				focuses: [Focus.Archery],
			},
			{
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Yeoman',
				description: 'Foot archer range +1',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Weak],
				focuses: [Focus.Archery, Focus.ArcheryAnti],
			},
			{
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Warwolf',
				description: 'Trebuchets do blast damage',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Unavailable, Strength.Strong],
				focuses: [Focus.Siege],
			},
		],
	},

	{
		name: 'Bulgarians',
		focuses: [Focus.Infantry, Focus.Cavalry],
		bonuses: [
			// Traits
			{
				team: true,
				description: 'Blacksmith research speed +50%',
				focuses: [Focus.Military],
			},
			{
				description: 'Militia-line upgrades free',
				focuses: [Focus.Infantry],
			},
			{
				description: 'Town Center costs -50% stone',
				focuses: [Focus.Resources, Focus.ResourceStone],
			},
			{
				description: 'Krepost can be built',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Normal],
				focuses: [Focus.Defense],
			},
			// Uniques
			{
				type: BonusType.Unit,
				building: Building.Castle,
				name: 'Konnik',
				description: 'Cavalry that fights on as infantry when felled.',
				focuses: [Focus.Cavalry, Focus.Infantry],
			},
			{
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Stirrups',
				description: 'Cavalry attack speed +25%',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Strong],
				focuses: [Focus.Cavalry],
			},
			{
				type: BonusType.Tech,
				building: Building.Castle,
				name: 'Bagains',
				description: 'Militia-line armor +5',
				strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Unavailable, Strength.Strong],
				focuses: [Focus.Infantry],
			},
		],
	},
]
