import { createApp } from 'vue'

import './index.postcss'

import App from './App.vue'

import router from '@/models/router'

createApp(App)
	.use(router)
	.mount('#app')
