<script setup lang="ts">
// import $ from 'jquery' // 你可以使用jquery来进行dom操作
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

onMounted(() => {
  useCrxDark()
  bootstrap()
  setInterval(loop, 300)
})
</script>

<template>
  <div class="lz-crx-container">
    <div id="crx-app" class="bg-canvas text-text1">
      <Window title="脚本标题" :width="300">
        <div>
          <button v-if="!isRunning" class="bg-primary py-1 px-2 text-white rounded-2" @click="ToggleRunning()">
            运行
          </button>
          <button v-else class="bg-primary py-1 px-2 text-white rounded-2" @click="ToggleRunning()">
            停止
          </button>
        </div>
        <!-- 日志 -->
        <Logs ref="logInst" class="mt-2" />
      </Window>
    </div>
  </div>
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
