<template>
	<UIStack direction="col" class="h-full">
		<UIStack tag="header" direction="row" alignment="center" class="h-12 px-4 bg-gray-900 text-white">
			<h1 class="-mt-1 text-2xl font-thin ">ageof.gg</h1>
		</UIStack>
		<main class="text-gray-100 flex-grow">
			<CompBuilder />
		</main>
	</UIStack>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import UIStack from '/@/views/ui/Stack.vue'

import CompBuilder from '/@/views/pages/CompBuilder/index.vue'

export default defineComponent({
	components: {
		CompBuilder,
		UIStack,
	},
})
</script>
