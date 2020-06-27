<template>
	<div class="h-full  flex">
		<CivilizationsList />
		<TeamComposition />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CivilizationsList from '/@/views/components/CivilizationsList.vue'
import TeamComposition from '/@/views/components/TeamComposition.vue'

export default defineComponent({
	components: {
		CivilizationsList,
		TeamComposition,
	},
})
</script>
