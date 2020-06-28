<template>
	<tr>
		<td class="text-sm font-medium text-right smallcaps" :class="color">{{ title }}</td>
		<td class="ml-1">
			<ul class="capitalize  flex">
				<li v-for="focus in focuses" :key="focus" class="ml-1">{{ focus }}</li>
			</ul>
		</td>
	</tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		title: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		focuses: {
			type: Array,
			required: true,
		},
	},
})
</script>
