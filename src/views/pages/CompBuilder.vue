<template>
	<div class="flex">
		<CivilizationsList />
		<TeamComposition />
	</div>
</template>

<script>
import CivilizationsList from '../components/CivilizationsList.vue'
import TeamComposition from '../components/TeamComposition.vue'

export default {
	components: {
		CivilizationsList,
		TeamComposition,
	},
}
</script>
