<script setup lang="ts">
// import $ from 'jquery' // 你可以使用jquery来进行dom操作
import Window from './components/Window.vue'

function bootstrap() {
  // 你的代码
}

// 主题
onMounted(() => {
  useCrxDark()
  bootstrap()
})
</script>

<template>
  <div id="app" class="lz-crx-app bg-canvas text-text1">
    <Window title="脚本标题" :width="200">
      <!--  -->
    </Window>
  </div>
</template>

<style lang="less">
.lz-crx-app {
  // 纠正样式
  text-align: left;
  // 通用样式
  font-family: -apple-system, Noto Sans, Helvetica Neue, Helvetica, Nimbus Sans L, Arial, Liberation Sans, PingFang SC, Hiragino Sans GB, Noto Sans CJK SC, Source Han Sans SC, Source Han Sans CN, Microsoft YaHei, Wenquanyi Micro Hei, WenQuanYi Zen Hei, ST Heiti, SimHei, WenQuanYi Zen Hei Sharp, sans-serif;
  @apply text-text1 bg-canvas;
  font-size: 14px;
  line-height: 1.5;
}
</style>
