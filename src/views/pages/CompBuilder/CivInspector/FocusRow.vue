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

<script setup lang="ts">
import { defineProps } from 'vue'

import UIStack from '@/views/components/UIStack.vue'

const props = defineProps<{
	title: string
	color: string
	focuses: Focus[]
}>()

import type { Focus } from '@/assets/types'
</script>
