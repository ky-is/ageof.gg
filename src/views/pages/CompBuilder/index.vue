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
import UIStack from '/@/views/ui/UIStack.vue'

import CivList from './CivList/index.vue'
import CivComp from './CivComp/index.vue'
import CivInspector from './CivInspector/index.vue'
export default { components: { CivInspector, CivList, CivComp, UIStack } }
</script>
