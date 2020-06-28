<template>
	<div class="h-full  flex">
		<CivList />
		<div class="flex flex-col flex-grow">
			<CivInspector class="flex-1" />
			<TeamComposition class="flex-1" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CivList from './CivList/index.vue'
import TeamComposition from './TeamComposition.vue'
import CivInspector from './CivInspector/index.vue'

export default defineComponent({
	components: {
		CivInspector,
		CivList,
		TeamComposition,
	},
})
</script>
