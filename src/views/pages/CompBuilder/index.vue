<template>
	<UIStack direction="row">
		<CivList />
		<UIStack direction="col" class="flex-grow">
			<CivInspector class="flex-1" />
			<CivComp class="flex-1" />
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
