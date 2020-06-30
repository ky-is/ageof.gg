<template>
	<component :is="tag" class="flex" :class="classString">
		<slot />
	</component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	name: 'UIStack',

	props: {
		tag: {
			type: String,
			default: 'div',
		},
		direction: {
			type: String as PropType<'row' | 'col'>,
			required: true,
		},
		// reverse: {
		// 	type: Boolean,
		// 	default: false,
		// },
		switchAt: {
			type: String as PropType<'sm' | 'md' | 'lg' | 'xl' | null>,
			default: null,
		},
		alignment: {
			type: String as PropType<'start' | 'center' | 'baseline' | 'end' | null>,
			default: null,
		},
		justification: {
			type: String as PropType<'start' | 'center' | 'baseline' | 'end' | null>,
			default: null,
		},
		wrap: {
			type: Boolean,
			default: false,
		},
	},

	setup (props) {
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
		return {
			classString: classes.join(' '),
		}
	},
})
</script>
