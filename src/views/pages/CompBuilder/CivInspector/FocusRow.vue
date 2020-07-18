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

<script setup="props" lang="ts">
import { Focus } from '/@/models/types'

import UIStack from '/@/views/ui/Stack.vue'
export default { components: { UIStack } }

declare const props: {
	title: string
	color: string
	focuses: Focus[]
}
</script>
