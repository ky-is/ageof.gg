<template>
	<UIStack direction="row">
		<CivList class="h-content" />
		<UIStack direction="col" class="flex-grow h-content">
			<CivInspector class="h-1/2" />
			<CivComp class="h-1/2" />
		</UIStack>
	</UIStack>
</template>

<script setup lang="ts">
import UIStack from '@/views/components/UIStack.vue'

import CivComp from '@/views/pages/CompBuilder/CivComp/CivComp.vue'
import CivList from '@/views/pages/CompBuilder/CivList/CivList.vue'
import CivInspector from '@/views/pages/CompBuilder/CivInspector/CivInspector.vue'
</script>
