<script setup lang="ts">
// import $ from 'jquery' // 你可以使用jquery来进行dom操作
import { NButton, NConfigProvider, darkTheme } from 'naive-ui'
import Logs from './components/Logs.vue'
import Window from './components/Window.vue'

// useExtStorage 自动选择chrome.storage.local或GM.getValue/GM.setValue
// 可用于配置存储
const isRunning = useExtStorage('isRunning', false)
const ToggleRunning = useToggle(isRunning)

const logInst = ref<InstanceType<typeof Logs>>()
function addLog(content: string, type: string = 'info') {
  logInst.value?.addLog(type, content)
}

function bootstrap() {
  // 你的代码
}
function loop() {
  if (!isRunning.value)
    return
  // 循环执行，可用于自动流程类 如不需要可删除
  addLog('循环执行')
  // 你的代码
  const location = window.location.href
  if (location.includes('xxx'))
    addLog('xxx')

  else if (location.includes('yyy'))
    addLog('yyy')
}

const dark = useCrxDark()

onMounted(() => {
  bootstrap()
  setInterval(loop, 300)
})
const naiveUiTheme = computed(() => {
  return dark.value ? darkTheme : undefined
})
</script>

<template>
  <NConfigProvider class="lz-crx-container" :theme="naiveUiTheme">
    <div id="crx-app" class="bg-canvas text-text1">
      <Window title="脚本标题" :width="300">
        <div>
          <NButton v-if="!isRunning" @click="ToggleRunning()">
            运行
          </NButton>
          <NButton v-else @click="ToggleRunning()">
            停止
          </NButton>
        </div>
        <!-- 日志 -->
        <Logs ref="logInst" class="mt-2" />
      </Window>
    </div>
  </NConfigProvider>
</template>

<style lang="less">
.lz-crx-container {
  // 纠正样式
  text-align: left;
  // 通用样式
  font-family: -apple-system, Noto Sans, Helvetica Neue, Helvetica, Nimbus Sans L, Arial, Liberation Sans, PingFang SC, Hiragino Sans GB, Noto Sans CJK SC, Source Han Sans SC, Source Han Sans CN, Microsoft YaHei, Wenquanyi Micro Hei, WenQuanYi Zen Hei, ST Heiti, SimHei, WenQuanYi Zen Hei Sharp, sans-serif;
  @apply text-text1 bg-canvas;
  font-size: 14px;
  line-height: 1.5;
}
</style>
