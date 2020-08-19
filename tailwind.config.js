const plugin = require('tailwindcss/plugin')

module.exports = {
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
	experimental: {
		applyComplexClasses: true,
		uniformColorPalette: true,
		extendedSpacingScale: true,
		defaultLineHeights: true,
		extendedFontSizeScale: true,
	},
	future: {
		removeDeprecatedGapUtilities: true,
	},
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
