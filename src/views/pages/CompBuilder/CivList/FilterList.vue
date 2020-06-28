<template>
	<div>
		<div v-for="civilization in civs" :key="civilization.name" class="my-2 flex items-center">
			<img :src="`src/assets/images/civs/${civilization.name.toLowerCase()}.png`" class="w-10 mr-1">
			<div class="leading-tight">
				<h3 class="text-lg">{{ civilization.name }}</h3>
				<div class="text-sm">{{ civilization.focuses.join(' + ') }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		civs: {
			type: Array,
			required: true,
		},
	},
})
</script>
