<script setup lang="ts">
import Window from './components/Window.vue'

// import 'uno.css'
// import '@unocss/reset/tailwind-compat.css'

// 主题
onMounted(() => {
  useCrxDark()
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
}
</style>
