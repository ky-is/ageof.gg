import path from 'path'

import ViteComponentsImport from 'vite-plugin-components'

const alias = {
	'/@/': path.resolve(__dirname, 'src'),
}

export default {
	alias,
	define: {
		__VUE_OPTIONS_API__: false,
	},
	plugins: [
		ViteComponentsImport({
			dirs: ['src/views'],
			alias,
		}),
	],
}
