import { TreeBranchData } from '/@/assets/types'

export default {
	"archer": {
		"name": "Archer",
		"units": [
			[ 4 ],
			[ 24, 100 ],
			[ 492, 237 ],
		],
		"upgrades": [ 47, 201, 212, 219, 437 ],
		"class": 0,
	},
	"skirmisher": {
		"name": "Skirmisher",
		"units": [
			[ 7 ],
			[ 6, 98 ],
		],
		"upgrades": [ 47, 201, 212, 219 ],
		"class": 0,
	},
	"cavalryarcher": {
		"name": "Cavalry Archer",
		"units": [
			[ 39, 192 ],
			[ 474, 218 ],
		],
		"upgrades": [ 39, 47, 201, 212, 219, 435, 436, 437 ],
		"class": 36,
	},
	"militia": {
		"name": "Militia",
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
	"spear": {
		"name": "Spear",
		"units": [
			[ 93 ],
			[ 358, 197 ],
			[ 359, 429 ],
		],
		"upgrades": [ 75, 76, 77, 215, 602 ],
		"class": 6,
	},
	"eagle": {
		"name": "Eagle",
		"units": [
			[ 751, 384 ],
			[ 752, 434 ],
			[ 753, 434 ],
		],
		"upgrades": [ 75, 76, 77, 215, 602 ],
		"class": 6,
	},
	"scout": {
		"name": "Scout",
		"units": [
			[ 448, 204 ],
			[ 546, 254 ],
			[ 441, 428 ],
		],
		"upgrades": [ 39, 75, 80, 81, 82, 435 ],
		"class": 12,
	},
	"knight": {
		"name": "Knight",
		"units": [
			[ 38, 166 ],
			[ 283, 209 ],
			[ 569, 265 ],
		],
		"upgrades": [ 39, 75, 80, 81, 82, 435 ],
		"class": 12,
	},
	"camel": {
		"name": "Camel",
		"units": [
			[ 329, 235 ],
			[ 330, 236 ],
		],
		"upgrades": [ 39, 75, 80, 81, 82, 435 ],
		"class": 12,
	},
	"elephant": {
		"name": "Elephant",
		"units": [
			[ 1132, 630 ],
			[ 1134, 631 ],
		],
		"upgrades": [ 39, 75, 80, 81, 82, 435 ],
		"class": 12,
	},
	"lancer": {
		"name": "Lancer",
		"units": [
			[ 1370, 714 ],
			[ 1372 ],
		],
		"upgrades": [ 39, 75, 80, 81, 82, 435 ],
		"class": 12,
	},
	"ram": {
		"name": "Ram",
		"units": [
			[ 35 ],
			[ 422 ],
			[ 548, 255 ],
		],
		"upgrades": [ 377 ],
		"class": 13,
	},
	"mangonel": {
		"name": "Mangonel",
		"units": [
			[ 280 ],
			[ 550, 257 ],
			[ 588, 320 ],
		],
		"upgrades": [ 47, 377 ],
		"class": 13,
	},
	"scorpion": {
		"name": "Scorpion",
		"units": [
			[ 279 ],
			[ 542, 239 ],
		],
		"upgrades": [ 47, 201, 377 ],
		"class": 55,
	},
	"fireship": {
		"name": "Fire ship",
		"units": [
			[ 1103, 604 ],
			[ 529, 243 ],
			[ 532, 246 ],
		],
		"upgrades": [ 373, 375 ],
		"class": 22,
	},
	"galley": {
		"name": "Galley",
		"units": [
			[ 539 ],
			[ 21 ],
			[ 442, 35 ],
		],
		"upgrades": [ 47, 201, 373, 375 ],
		"class": 22,
	},
	"demoship": {
		"name": "Demo ship",
		"units": [
			[ 1104, 605 ],
			[ 527, 242 ],
			[ 528, 244 ],
		],
		"upgrades": [ 373, 375 ],
		"class": 22,
	},
	"cannongalleon": {
		"name": "Cannon Galleon",
		"units": [
			[ 420, 37 ],
			[ 691, 376 ],
		],
		"upgrades": [ 373, 375 ],
		"class": 22,
	},
	"tower": {
		"name": "Tower",
		"units": [
			[ 79 ],
			[ 234, 140 ],
			[ 235, 63 ],
		],
		"upgrades": [ 47, 50, 51, 201, 380, 441, 608 ],
		"class": 52,
	},
	"bombardcannon": {
		"name": "Bombard Cannon",
		"units": [
			[ 36, 188 ],
		],
		"upgrades": [ 377 ],
		"class": 13,
	},
	"bombardtower": {
		"name": "Bombard Tower",
		"units": [
			[ 236, 64 ],
		],
		"upgrades": [ 47, 50, 51, 201, 380, 441 ],
		"class": 52,
	},
	"monk": {
		"name": "Monk",
		"units": [
			[ 125 ],
		],
		"upgrades": [ 230, 231, 233, 252, 316, 319, 438 ],
		"class": 18,
	},
} as {[key: string]: TreeBranchData}