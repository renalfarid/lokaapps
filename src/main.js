import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from "ant-design-vue"


import { registerPlugins } from '@/plugins'

import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
registerPlugins(app)

app.use(pinia)
app.use(Antd)
app.mount('#app')
