const plugin = require('tailwindcss/plugin')

module.exports = {
	mode: 'jit',
	theme: {
		extend: {
			colors: { // sqrt(a^2/2+b^2/2)
				// background-color:rgb(0, 0, 0);
				'gray-950': 'rgb(16, 21, 33)',
				// background-color:rgb(22, 30, 46);
				'gray-850': 'rgb(30, 39, 55)',
				// background-color:rgb(37, 47, 63);
				'gray-750': 'rgb(47, 57, 73)',
				// background-color:rgb(55, 65, 81);
			},
			inset: {
				'full': '100%',
			},
		},
	},
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
			safelistPatterns: [
				/flex-(row|col)$/,
				/^items-(start|center|baseline|end)$/,
				/^justify-(start|center|end)$/,
			],
		},
	},
}
