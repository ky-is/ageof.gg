<template>
	<div class="w-64 h-full bg-gray-800">
		<h2>Civilizations</h2>
		<div v-for="civilization in civBonuses" :key="civilization.name" class="my-1 flex items-center">
			<img :src="`src/assets/images/civs/${civilization.name.toLowerCase()}.png`" class="w-12 mr-1">
			<div class="leading-tight">
				<h3 class="text-lg">{{ civilization.name }}</h3>
				<div class="text-sm">{{ civilization.focuses.join(' + ') }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import civBonuses from '../../models/civs/bonuses'

export default defineComponent({
	components: {
	},

	setup () {
		return { civBonuses }
	},
})
</script>
