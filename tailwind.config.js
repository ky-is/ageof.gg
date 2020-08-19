const plugin = require('tailwindcss/plugin')

module.exports = {
	theme: {
		extend: {
			colors: {
				'gray-950': 'rgb(19, 23, 30)',
				'gray-850': 'rgb(34, 42, 56)',
				'gray-750': 'rgb(58, 68, 87)',
			},
			width: {
				'1/2': '50%',
				'96': '24rem',
				'128': '32rem',
			},
			height: {
				'1/2': '50%',
				'96': '24rem',
				'128': '32rem',
			},
			inset: {
				'full': '100%',
			},
		},
	},
	variants: ['responsive', 'group-hover', 'hover', 'hover-active', 'focus', 'disabled'],
	plugins: [
		require('@ky-is/tailwindcss-plugin-width-height')({ variants: [] }),
		plugin(({ addVariant, e }) => {
			addVariant('hover-active', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`hover-active${separator}${className}`)}:hover:active`
				})
			})
		}),
	],
	purge: {
		content: [
			'./index.html',
			'./src/**/*.vue',
			'./src/**/*.ts',
		],
		options: {
			whitelistPatterns: [
				/flex-(row|col)$/,
				/^items-(start|center|baseline|end)$/,
				/^justify-(start|center|end)$/,
			],
		},
	},
}
