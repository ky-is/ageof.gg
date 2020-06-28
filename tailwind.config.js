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
	},
	plugins: [],
	purge: [
		'./index.html',
		'./src/**/*.vue',
		'./src/**/*.ts',
	],
}
