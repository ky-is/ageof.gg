import { TreeBranchData } from '/@/assets/types'

export default [
	[
		"archery range",
		[
			{
				"name": "Archer",
				"resources": [],
				"units": [
					[ 4 ],
					[ 24, 100 ],
					[ 492, 237 ],
				],
				"upgrades": [ 47, 201, 212, 219, 437 ],
				"class": 0,
			},
			{
				"name": "Skirmisher",
				"resources": [],
				"units": [
					[ 7 ],
					[ 6, 98 ],
				],
				"upgrades": [ 47, 201, 212, 219 ],
				"class": 0,
			},
			{
				"name": "Cavalry Archer",
				"resources": [],
				"units": [
					[ 39, 192 ],
					[ 474, 218 ],
				],
				"upgrades": [ 39, 47, 201, 212, 219, 435, 436, 437 ],
				"class": 36,
			},
		],
	],
	[
		"barracks",
		[
			{
				"name": "Militia",
				"resources": [],
				"units": [
					[ 74 ],
					[ 75 ],
					[ 77 ],
					[ 473, 217 ],
					[ 567, 264 ],
				],
				"upgrades": [ 75, 76, 77, 215, 602, 716 ],
				"class": 6,
			},
			{
				"name": "Spear",
				"resources": [],
				"units": [
					[ 93 ],
					[ 358, 197 ],
					[ 359, 429 ],
				],
				"upgrades": [ 75, 76, 77, 215, 602 ],
				"class": 6,
			},
			{
				"name": "Eagle",
				"resources": [],
				"units": [
					[ 751, 384 ],
					[ 752, 434 ],
					[ 753, 434 ],
				],
				"upgrades": [ 75, 76, 77, 215, 602 ],
				"class": 6,
			},
		],
	],
	[
		"stable",
		[
			{
				"name": "Scout",
				"resources": [],
				"units": [
					[ 448, 204 ],
					[ 546, 254 ],
					[ 441, 428 ],
				],
				"upgrades": [ 39, 75, 80, 81, 82, 435 ],
				"class": 12,
			},
			{
				"name": "Knight",
				"resources": [],
				"units": [
					[ 38, 166 ],
					[ 283, 209 ],
					[ 569, 265 ],
				],
				"upgrades": [ 39, 75, 80, 81, 82, 435 ],
				"class": 12,
			},
			{
				"name": "Camel",
				"resources": [],
				"units": [
					[ 329, 235 ],
					[ 330, 236 ],
				],
				"upgrades": [ 39, 75, 80, 81, 82, 435 ],
				"class": 12,
			},
			{
				"name": "Elephant",
				"resources": [],
				"units": [
					[ 1132, 630 ],
					[ 1134, 631 ],
				],
				"upgrades": [ 39, 75, 80, 81, 82, 435 ],
				"class": 12,
			},
			{
				"name": "Lancer",
				"resources": [],
				"units": [
					[ 1370, 714 ],
					[ 1372 ],
				],
				"upgrades": [ 39, 75, 80, 81, 82, 435 ],
				"class": 12,
			},
		],
	],
	[
		"siege workshop",
		[
			{
				"name": "Ram",
				"resources": [],
				"units": [
					[ 35 ],
					[ 422 ],
					[ 548, 255 ],
				],
				"upgrades": [ 377 ],
				"class": 13,
			},
			{
				"name": "Mangonel",
				"resources": [],
				"units": [
					[ 280 ],
					[ 550, 257 ],
					[ 588, 320 ],
				],
				"upgrades": [ 47, 377 ],
				"class": 13,
			},
			{
				"name": "Scorpion",
				"resources": [],
				"units": [
					[ 279 ],
					[ 542, 239 ],
				],
				"upgrades": [ 47, 201, 377 ],
				"class": 55,
			},
		],
	],
	[
		"dock",
		[
			{
				"name": "Fire ship",
				"resources": [],
				"units": [
					[ 1103, 604 ],
					[ 529, 243 ],
					[ 532, 246 ],
				],
				"upgrades": [ 373, 375 ],
				"class": 22,
			},
			{
				"name": "Galley",
				"resources": [],
				"units": [
					[ 539 ],
					[ 21 ],
					[ 442, 35 ],
				],
				"upgrades": [ 47, 201, 373, 375 ],
				"class": 22,
			},
			{
				"name": "Demo ship",
				"resources": [],
				"units": [
					[ 1104, 605 ],
					[ 527, 242 ],
					[ 528, 244 ],
				],
				"upgrades": [ 373, 375 ],
				"class": 22,
			},
			{
				"name": "Cannon Galleon",
				"resources": [],
				"units": [
					[ 420, 37 ],
					[ 691, 376 ],
				],
				"upgrades": [ 373, 375 ],
				"class": 22,
			},
		],
	],
	[
		"misc.",
		[
			{
				"name": "Tower",
				"resources": [],
				"units": [
					[ 79 ],
					[ 234, 140 ],
					[ 235, 63 ],
				],
				"upgrades": [ 47, 50, 51, 201, 380, 441, 608 ],
				"class": 52,
			},
			{
				"name": "Bombard Cannon",
				"resources": [],
				"units": [
					[ 36, 188 ],
				],
				"upgrades": [ 377 ],
				"class": 13,
			},
			{
				"name": "Bombard Tower",
				"resources": [],
				"units": [
					[ 236, 64 ],
				],
				"upgrades": [ 47, 50, 51, 201, 380, 441 ],
				"class": 52,
			},
			{
				"name": "Monk",
				"resources": [ 27, 28, 35, 193 ],
				"units": [
					[ 125 ],
				],
				"upgrades": [ 230, 231, 233, 252, 316, 319, 438 ],
				"class": 18,
			},
		],
	],
] as [string, TreeBranchData[]][]