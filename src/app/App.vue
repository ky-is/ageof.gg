<template>
	<div class="h-full  flex flex-col">
		<header class="h-12 px-4 bg-gray-900 text-white  flex items-center">
			<h1 class="-mt-1 text-2xl font-thin ">ageof.gg</h1>
		</header>
		<main class="text-gray-100 flex-grow">
			<CompBuilder />
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CompBuilder from '/@/views/pages/CompBuilder/index.vue'

export default defineComponent({
	components: {
		CompBuilder,
	},
})
</script>
