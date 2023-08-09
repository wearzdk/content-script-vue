import { createApp } from 'vue'

import 'uno.css'
import App from './Content.vue'

const root = document.createElement('div')
root.id = `crx-root${Math.floor(Math.random() * 10000)}`
root.className = 'lz-crx-app'
appElementId.value = root.id

document.body.appendChild(root)

createApp(App).mount(root)
