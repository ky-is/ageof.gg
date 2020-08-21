<template>
	<component :is="tag || 'div'" class="flex" :class="classString">
		<slot />
	</component>
</template>

<script setup="props" lang="ts">
declare const props: {
	tag?: string
	direction: 'row' | 'col'
	// reverse?: boolean
	switchAt?: 'sm' | 'md' | 'lg' | 'xl'
	alignment?: 'start' | 'center' | 'baseline' | 'end'
	justification?: 'start' | 'center' | 'baseline' | 'end'
	wrap: boolean
}

const classes = []
if (props.direction !== 'row') {
	classes.push("flex-col")
}
if (props.switchAt) {
	classes.push(`${props.switchAt}:flex-${props.direction === 'row' ? 'col' : 'row'}`)
}
if (props.alignment) {
	classes.push(`items-${props.alignment}`)
}
if (props.justification) {
	classes.push(`justify-${props.justification}`)
}
if (props.wrap) {
	classes.push('flex-wrap')
}
export const classString = classes.join(' ')
</script>
