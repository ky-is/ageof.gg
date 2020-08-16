<template>
	<div class="h-content bg-gray-850">
		<UIStack direction="col" class="max-w-xl mx-auto px-4">
			<h2 class="my-4 text-3xl font-light">Games</h2>
			<h3 class="text-xl font-light"><RouterLink to="/games/civ-icons">Civ icon trainer</RouterLink></h3>
			<!-- <h3 class="text-xl font-light"><RouterLink to="/games/civ-sounds">Guess the civ sound effect</RouterLink></h3> -->
			<!-- <h3 class="text-xl font-light"><RouterLink to="/games/taunts">Guess the taunt</RouterLink></h3> -->
		</UIStack>
	</div>
</template>

<script setup lang="ts">
import UIStack from '/@/views/ui/Stack.vue'
export default { components: { UIStack } }
</script>
