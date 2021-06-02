<template>
	<component :is="tag || 'div'" class="flex" :class="classString">
		<slot />
	</component>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
	tag?: string
	direction: 'row' | 'col'
	// reverse?: boolean
	switchAt?: 'sm' | 'md' | 'lg' | 'xl'
	alignment?: 'start' | 'center' | 'baseline' | 'end'
	justification?: 'start' | 'center' | 'baseline' | 'end'
	wrap?: boolean
}>()

const classString = computed(() => {
	const classes: string[] = []
	if (props.direction !== 'row') {
		classes.push("flex-col")
	}
	if (props.switchAt) {
		// Safelist: flex-row flex-col
		classes.push(`${props.switchAt}:flex-${props.direction === 'row' ? 'col' : 'row'}`)
	}
	if (props.alignment) {
		// Safelist: items-start items-center items-baseline items-end
		classes.push(`items-${props.alignment}`)
	}
	if (props.justification) {
		// Safelist: justify-start justify-center justify-end
		classes.push(`justify-${props.justification}`)
	}
	if (props.wrap) {
		classes.push('flex-wrap')
	}
	return classes.join(' ')
})
</script>
