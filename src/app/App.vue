<template>
	<UIStack direction="col" class="h-full text-primary">
		<UIStack tag="header" direction="row" alignment="center" class="h-header flex-shrink-0 px-4 bg-gray-900">
			<h1 class="-mt-1 text-2xl font-thin ">ageof.gg</h1>
		</UIStack>
		<UIStack tag="main" direction="col" class="text-primary">
			<CompBuilder class="flex-grow" />
		</UIStack>
	</UIStack>
</template>

<script setup lang="ts">
import CompBuilder from '/@/views/pages/CompBuilder/index.vue'
import UIStack from '/@/views/ui/Stack.vue'
export default { components: { CompBuilder, UIStack } }
</script>
