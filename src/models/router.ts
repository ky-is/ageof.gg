import { createRouter, createWebHistory } from 'vue-router'

import RouterParent from '@/views/components/RouterParent.vue'

import CompBuilder from '@/views/pages/CompBuilder/index.vue'
import GamesPage from '@/views/pages/Games/index.vue'
import GameCivIcons from '@/views/pages/Games/CivIcons.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: CompBuilder,
		},
		{
			path: '/team-comp',
			component: CompBuilder,
		},

		{
			path: '/games',
			component: RouterParent,
			children: [
				{
					path: '',
					component: GamesPage,
				},
				{
					path: 'civ-icons',
					component: GameCivIcons,
				},
				// {
				// 	path: '/games/civ-sounds',
				// 	component: GamesPage,
				// },
				// {
				// 	path: '/games/taunts',
				// 	component: GamesPage,
				// },
			],
		},
	],
})

export default router
