<template>
	<div class="h-content bg-gray-850">
		<UIStack direction="col" class="max-w-xl mx-auto px-4">
			<div class="my-4">
				<h2 class="text-3xl font-light">Games</h2>
				<p class="text-secondary">Test your AoE II knowledge!</p>
			</div>
			<div>
				<h3 class="text-xl font-light leading-loose"><RouterLink to="/games/civ-icons">Civ icon trainer</RouterLink></h3>
				<h3 class="text-xl font-light leading-loose text-secondary">(coming soon) Civ Sounds</h3><!-- <RouterLink to="/games/civ-sounds">Guess the civ sound effect</RouterLink> -->
				<h3 class="text-xl font-light leading-loose text-secondary">(coming soon) Taunts</h3><!-- <RouterLink to="/games/taunts">Guess the taunt</RouterLink> -->
			</div>
		</UIStack>
	</div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import UIStack from '@/views/components/UIStack.vue'
</script>
