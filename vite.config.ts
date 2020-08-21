import path from 'path'

import ViteComponentsImport from 'vite-plugin-components'

export default {
	alias: {
		'/@/': path.resolve(__dirname, 'src'),
	},
	define: {
		__VUE_OPTIONS_API__: false,
	},
	plugins: [
		ViteComponentsImport({
			dirs: ['src/views'],
		}),
	],
}
