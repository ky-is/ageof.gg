<template>
	<UIStack direction="col" class="h-full">
		<UIStack tag="header" direction="row" alignment="center" class="h-12 px-4 bg-gray-900 text-white">
			<h1 class="-mt-1 text-2xl font-thin ">ageof.gg</h1>
		</UIStack>
		<UIStack tag="main" direction="col" class="flex-grow  text-gray-100">
			<CompBuilder class="flex-grow" />
		</UIStack>
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
