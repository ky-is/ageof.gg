<template>
	<div class="h-full  flex">
		<CivList />
		<TeamComposition />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CivList from './CivList/index.vue'
import TeamComposition from './TeamComposition.vue'

export default defineComponent({
	components: {
		CivList,
		TeamComposition,
	},
})
</script>
