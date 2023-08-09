import { createApp } from 'vue'

import 'uno.css'

import unoReset from '@unocss/reset/tailwind-compat.css?inline'
import App from './Content.vue'

const root = document.createElement('div')
root.id = `crx-root${Math.floor(Math.random() * 10000)}`
appElementId.value = root.id

const scopedCss = `
  #${root.id} {
    ${unoReset}
  }
`

const style = document.createElement('style')
style.textContent = scopedCss
document.body.appendChild(root)

createApp(App).mount(root)

document.body.appendChild(style)
