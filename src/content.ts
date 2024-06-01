import { createApp } from 'vue'

import 'uno.css'

// 清除样式
// import '@unocss/reset/tailwind-compat.css'
import App from './Content.vue'

const root = document.createElement('div')
root.id = __ROOT_ID__

document.body.appendChild(root)

createApp(App).mount(root)
