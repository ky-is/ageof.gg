<template>
	<header class="h-10 bg-gray-900 text-white">
		<h1>AgeOf</h1>
	</header>
	<main class="h-full text-gray-100">
		<CompBuilder />
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CompBuilder from '../views/pages/CompBuilder.vue'

export default defineComponent({
	components: {
		CompBuilder,
	},
})
</script>
