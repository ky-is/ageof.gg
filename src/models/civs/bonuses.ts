import { BonusType, Building, Focus, Strength, CivBonusesEntry } from '/@/models/types'

export const civsBonuses: CivBonusesEntry[] = [
	new CivBonusesEntry('Aztecs', [Focus.Monk, Focus.Infantry], [
		// Traits
		{
			team: true,
			building: Building.Monastery,
			description: 'Relic gold generation +33%',
			focuses: [Focus.Relic],
		},
		{
			description: 'Start with +50 gold',
			strengthByAge: [Strength.Strong, Strength.Normal, Strength.Weak, Strength.Weak],
			focuses: [Focus.Resources],
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
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Normal],
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
	]),

	new CivBonusesEntry('Berbers', [Focus.Cavalry, Focus.Navy], [
		// Traits
		{
			description: 'Villager move speed +10%',
			focuses: [Focus.Resources],
		},
		{
			building: Building.Dock,
			description: 'Ship move speed +10%',
			focuses: [Focus.Navy],
		},
		{
			building: Building.Stable,
			description: 'Stable unit cost -10% Castle, -20% Imperial',
			focuses: [Focus.Cavalry],
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Normal, Strength.Strong],
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
	]),

	new CivBonusesEntry('Britons', [Focus.Archery], [
		// Traits
		{
			description: 'Shepherds gathering speed +25%',
			strengthByAge: [Strength.Strong, Strength.Weak, Strength.Unavailable, Strength.Unavailable],
			focuses: [Focus.Resources, Focus.ResourceFood],
		},
		{
			team: true,
			building: Building.ArcheryRange,
			description: 'Archery Ranges production +20%',
			focuses: [Focus.Archery, Focus.ArcheryAnti],
		},
		{
			description: 'Town Centers wood cost -50%',
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Normal],
			focuses: [Focus.Resources],
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
	]),

	new CivBonusesEntry('Bulgarians', [Focus.Infantry, Focus.Cavalry], [
		// Traits
		{
			team: true,
			description: 'Blacksmith research speed +50%',
			focuses: [Focus.Military],
		},
		{
			description: 'Militia-line upgrades free',
			focuses: [Focus.Infantry],
			strengthByAge: [Strength.Unavailable, Strength.Strong, Strength.Normal, Strength.Normal],
		},
		{
			description: 'Town Center costs -50% stone',
			focuses: [Focus.Resources, Focus.ResourceStone],
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Normal],
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
	]),

	new CivBonusesEntry('Burmese', [Focus.Monk, Focus.Elephantry], [
		// Traits
		{
			team: true,
			description: 'Relics visible on the map from the game start',
			focuses: [Focus.Relic],
		},
		{
			description: 'Lumber Camp technologies are free',
			focuses: [Focus.Resources, Focus.ResourceWood],
			strengthByAge: [Strength.Unavailable, Strength.Strong, Strength.Normal, Strength.Normal],
		},
		{
			description: 'Infantry attack +1 Feudal/+2 Castle/+3 Imperial Age',
			focuses: [Focus.Infantry],
			strengthByAge: [Strength.Unavailable, Strength.Normal, Strength.Strong, Strength.Strong],
		},
		{
			building: Building.Monastery,
			description: 'Monastery technology cost -50%',
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Normal, Strength.Strong],
			focuses: [Focus.Monk],
		},
		// Uniques
		{
			type: BonusType.Unit,
			building: Building.Castle,
			name: 'Arambai',
			description: 'Cavalry archer with a small attack bonus against rams.',
			focuses: [Focus.Cavalry, Focus.Archery],
		},
		{
			type: BonusType.Tech,
			building: Building.Castle,
			name: 'Howdah',
			description: 'Battle Elephants +1 armor/pierce armor',
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Strong],
			focuses: [Focus.Elephantry],
		},
		{
			type: BonusType.Tech,
			building: Building.Castle,
			name: 'Manipur Cavalry',
			description: 'Arambai and cavalry +3 attack against buildings',
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Unavailable, Strength.Strong],
			focuses: [Focus.Cavalry],
		},
	]),

	new CivBonusesEntry('Byzantines', [Focus.Defense], [
		// Traits
		{
			team: true,
			description: 'Monks heal speed +50%',
			focuses: [Focus.Monk],
		},
		{
			description: 'Building HP +10% Dark/+20% Feudal/+30% Castle/+40% Imperial Age',
			focuses: [Focus.Defense],
			strengthByAge: [Strength.Weak, Strength.Normal, Strength.Normal, Strength.Strong],
		},
		{
			description: 'Camel Rider/Skirmisher/Spearman lines cost -25%',
			focuses: [Focus.Trash, Focus.ArcheryAnti, Focus.CavalryAnti],
			strengthByAge: [Strength.Unavailable, Strength.Strong, Strength.Strong, Strength.Strong],
		},
		{
			building: Building.Dock,
			description: 'Fire Ship attack speed +20%',
			strengthByAge: [Strength.Unavailable, Strength.Strong, Strength.Normal, Strength.Normal],
			focuses: [Focus.Navy],
		},
		{
			description: 'Town Watch research free',
			strengthByAge: [Strength.Unavailable, Strength.Strong, Strength.Unavailable, Strength.Unavailable],
			focuses: [Focus.Resources, Focus.Defense, Focus.ResourceFood],
		},
		{
			description: 'Imperial Age cost -33%',
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Unavailable],
			focuses: [Focus.Resources, Focus.ResourceGold, Focus.ResourceFood],
		},
		// Uniques
		{
			type: BonusType.Unit,
			building: Building.Castle,
			name: 'Cataphract',
			description: 'Heavy cavalry unit that excels at combat against infantry.',
			focuses: [Focus.Cavalry, Focus.InfantryAnti],
		},
		{
			type: BonusType.Tech,
			building: Building.Castle,
			name: 'Greek Fire',
			description: 'Fire Ship range +1',
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Strong],
			focuses: [Focus.Navy],
		},
		{
			type: BonusType.Tech,
			building: Building.Castle,
			name: 'Logistica',
			description: 'Cataphracts cause trample damage, +6 attack vs infantry',
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Unavailable, Strength.Strong],
			focuses: [Focus.Cavalry],
		},
	]),

	new CivBonusesEntry('Celts', [Focus.Infantry, Focus.Siege], [
		// Traits
		{
			team: true,
			description: 'Siege Workshops work speed +20%',
			focuses: [Focus.Siege],
		},
		{
			description: 'Infantry move 15% faster',
			focuses: [Focus.Infantry],
			strengthByAge: [Strength.Normal, Strength.Normal, Strength.Normal, Strength.Strong],
		},
		{
			description: 'Lumberjacks work speed +15%',
			focuses: [Focus.Resources, Focus.ResourceWood],
			strengthByAge: [Strength.Normal, Strength.Strong, Strength.Normal, Strength.Normal],
		},
		{
			description: 'Enemy herdables can be converted regardless of enemy units next to them',
			focuses: [Focus.Resources, Focus.ResourceFood],
			strengthByAge: [Strength.Normal, Strength.Weak, Strength.Weak, Strength.Weak],
		},
		{
			description: 'Siege weapon attack speed +20%',
			focuses: [Focus.Siege],
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Normal, Strength.Normal],
		},
		// Uniques
		{
			type: BonusType.Unit,
			building: Building.Castle,
			name: 'Woad Raider',
			description: 'Quick infantry unit with an attack bonus against standard buildings',
			focuses: [Focus.Infantry],
		},
		{
			type: BonusType.Tech,
			building: Building.Castle,
			name: 'Stronghold',
			description: 'Castles/towers attack speed +25%',
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Strong, Strength.Strong],
			focuses: [Focus.Defense],
		},
		{
			type: BonusType.Tech,
			building: Building.Castle,
			name: 'Furor Celtica',
			description: 'Siege Workshop units HP +40%',
			strengthByAge: [Strength.Unavailable, Strength.Unavailable, Strength.Unavailable, Strength.Strong],
			focuses: [Focus.Siege],
		},
	]),
]
