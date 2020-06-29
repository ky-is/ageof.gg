<template>
	<tr>
		<td class="text-sm font-medium text-right smallcaps" :class="color">{{ title }}</td>
		<td class="ml-1">
			<UIStack tag="ul" direction="row" class="capitalize">
				<li v-for="focus in focuses" :key="focus" class="ml-1">{{ focus }}</li>
			</UIStack>
		</td>
	</tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import UIStack from '/@/views/ui/Stack.vue'

export default defineComponent({
	components: {
		UIStack,
	},

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
