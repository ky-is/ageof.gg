<template>
	<div class="h-full  flex">
		<CivilizationsList />
		<TeamComposition />
	</div>
</template>

<script lang="ts">
import CivilizationsList from '../components/CivilizationsList.vue'
import TeamComposition from '../components/TeamComposition.vue'

export default {
	components: {
		CivilizationsList,
		TeamComposition,
	},
}
</script>
