<template>
	<UIStack direction="row">
		<CivList class="h-content" />
		<UIStack direction="col" class="flex-grow h-content">
			<CivInspector class="flex-grow" />
			<CivComp class="flex-grow" />
		</UIStack>
	</UIStack>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import UIStack from '/@/views/ui/Stack.vue'

import CivList from './CivList/index.vue'
import CivComp from './CivComp/index.vue'
import CivInspector from './CivInspector/index.vue'

export default defineComponent({
	components: {
		CivInspector,
		CivList,
		CivComp,
		UIStack,
	},
})
</script>
