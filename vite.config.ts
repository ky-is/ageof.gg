import path from 'path'

export default {
	alias: {
		'/@/': path.resolve(__dirname, 'src'),
	},
	define: {
		__VUE_OPTIONS_API__: false,
	},
}
