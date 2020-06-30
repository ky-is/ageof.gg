module.exports = {
	theme: {
		extend: {
			width: {
				'96': '24rem',
				'128': '32rem',
			},
			height: {
				'96': '24rem',
				'128': '32rem',
			},
		},
	},
	variants: {
		display: ['group-hover'],
		flex: ['responsive'],
	},
	plugins: [],
	purge: {
		content: [
			'./index.html',
			'./src/**/*.vue',
			'./src/**/*.ts',
		],
		options: {
			whitelist: ['flex-row', 'flex-col'],
			whitelistPatterns: [/^items-(start|center|baseline|end)$/, /^justify-(start|center|end)$/],
		},
	},
}
