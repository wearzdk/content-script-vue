import fs from 'node:fs'
import path from 'node:path'
import pkg from '../package.json'
import manifest from '../src/manifest.json'
import type { UserScript } from './UserScript'
import { GmFunctions, RunAt } from './UserScript'
import buildHeader from './build'

let matches = manifest.content_scripts[0].matches
if (matches.length === 1 && matches[0] === '<all_urls>')
  matches = ['*://*/*']

const script: UserScript = {
  name: pkg.name,
  namespace: 'https://github.com/wearzdk',
  description: pkg.description ?? '',
  version: pkg.version,
  grants: [GmFunctions.unsafeWindow],
  matches,
  runAt: RunAt.document_end,
}

const header = buildHeader(script)
// 连接

const scriptPath = manifest.content_scripts[0].js[0].replace('ts', 'js')
const content = fs.readFileSync(path.resolve('dist', scriptPath), 'utf-8')

const result = `${header}\n${content}`

fs.writeFileSync(path.resolve('dist', 'main.js'), result)
