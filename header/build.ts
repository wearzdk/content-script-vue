import { GmFunctions } from './UserScript'
import type { UserScript } from './UserScript'

const padLen = 20

/**
 * 编译对象格式的脚本头
 * @param script 脚本对象
 * @returns 脚本头
 */
export default (script: UserScript) => {
  let result = '// ==UserScript==\n'
  if (script.name)
    result += `${'// @name'.padEnd(padLen, ' ') + script.name}\n`

  if (script.namespace)
    result += `${'// @namespace'.padEnd(padLen, ' ') + script.namespace}\n`

  if (script.version)
    result += `${'// @version'.padEnd(padLen, ' ') + script.version}\n`

  if (script.author)
    result += `${'// @author'.padEnd(padLen, ' ') + script.author}\n`

  if (script.description)
    result += `${'// @description '.padEnd(padLen, ' ') + script.description}\n`

  if (script.homepage)
    result += `${'// @homepage'.padEnd(padLen, ' ') + script.homepage}\n`

  if (script.icon)
    result += `${'// @icon'.padEnd(padLen, ' ') + script.icon}\n`

  if (script.icon64)
    result += `${'// @icon64'.padEnd(padLen, ' ') + script.icon64}\n`

  if (script.updateURL)
    result += `${'// @updateURL'.padEnd(padLen, ' ') + script.updateURL}\n`

  if (script.supportURL)
    result += `${'// @supportURL'.padEnd(padLen, ' ') + script.supportURL}\n`

  if (script.downloadURL)
    result += `${'// @downloadURL'.padEnd(padLen, ' ') + script.downloadURL}\n`

  if (script.includes) {
    script.includes.forEach((include) => {
      result += `${'// @include'.padEnd(padLen, ' ') + include}\n`
    })
  }
  if (script.matches) {
    script.matches.forEach((m) => {
      result += `${'// @match'.padEnd(padLen, ' ') + m}\n`
    })
  }
  if (script.excludes) {
    script.excludes.forEach((exclude) => {
      result += `${'// @exclude'.padEnd(padLen, ' ') + exclude}\n`
    })
  }
  if (script.requires) {
    script.requires.forEach((m) => {
      result += `${'// @require'.padEnd(padLen, ' ') + m}\n`
    })
  }
  if (script.resources) {
    script.resources.forEach((m) => {
      result += `${'// @resource '.padEnd(padLen, ' ') + m}\n`
    })
  }
  if (script.connect)
    result += `${'// @connect'.padEnd(padLen, ' ') + script.connect}\n`

  if (script.runAt)
    result += `${'// @run-at'.padEnd(padLen, ' ') + script.runAt}\n`

  if (script.grants) {
    if (typeof script.grants === 'string') {
      result += `${'// @grant'.padEnd(padLen, ' ') + script.grants}\n`
    }
    else {
      const arr = script.grants
      arr.forEach((item) => {
        if (typeof item === 'string')
          result += `${'// @grant'.padEnd(padLen, ' ') + item}\n`

        else
          result += `${'// @grant'.padEnd(padLen, ' ') + GmFunctions[item]}\n`
      })
    }
  }
  if (script.noframes)
    result += '// @noframes\n'

  if (script.nocompat)
    result += `${'// @nocompat'.padEnd(padLen, ' ') + script.nocompat}\n`

  result += '// ==/UserScript==\n'

  return result
}
