<script lang="ts" setup>
import type { CSSProperties } from 'vue'

const props = defineProps<{
  title: string
  width?: number
  height?: number
  top?: number
  left?: number
  resizable?: boolean
  closeable?: boolean
  draggable?: boolean
  zIndex?: number
  showSetting?: boolean
}>()

const emits = defineEmits<{
  (event: 'close'): void
}>()

// dark
let dark: Ref<boolean> = ref(false)
onMounted(() => {
  dark = useCrxDark()
})

function toggleDark() {
  dark.value = !dark.value
}

// setting
const isOnSetting = ref(false)
function setting() {
  isOnSetting.value = true
}

const [isOnPinned, pinToggle] = useToggle(false)

// 拖拽
const dragStyle = ref<string>('')
const dragHead = ref<HTMLElement | null>(null)
const contentBox = ref<HTMLElement | null>(null)
onMounted(() => {
  const contentBoxRect = computed(() => {
    return contentBox.value?.getBoundingClientRect() || { height: 0, width: 0 }
  })

  let initX = Number(localStorage.getItem('initX') || innerWidth / 4.2)
  let initY = Number(localStorage.getItem('initY') || 80)
  // props 覆盖
  if (props.top)
    initY = props.top

  if (props.left)
    initX = props.left

  // 修正负数
  if (initX < 0)
    initX = 0
  if (initY < 0)
    initY = 0

  // 修正超出屏幕
  if (initX > innerWidth - contentBoxRect.value.width)
    initX = innerWidth - contentBoxRect.value.width
  if (initY > innerHeight - contentBoxRect.value.height)
    initY = innerHeight - contentBoxRect.value.height

  const { style } = useDraggable(dragHead, {
    initialValue: { x: initX, y: initY },
    preventDefault: true,
    onStart: () => {
      if (isOnPinned.value)
        return false
    },
    onMove: (e) => {
      // 边界检测
      const { x, y } = e
      if (x < 0)
        e.x = 0

      if (y < 0)
        e.y = 0

      if (x > innerWidth - contentBoxRect.value.width)
        e.x = innerWidth - contentBoxRect.value.width

      if (y > innerHeight - contentBoxRect.value.height)
        e.y = innerHeight - contentBoxRect.value.height
    },
    onEnd: (e) => {
      const { x, y } = e
      localStorage.setItem('initX', x.toString())
      localStorage.setItem('initY', y.toString())
    },
  })
  watchEffect(() => {
    dragStyle.value = style.value
  })
})

// 宽高设置
const contentBodyStyle = reactive<CSSProperties>({
  width: props.width ? `${props.width}px` : '460px',
  height: props.height ? `${props.height}px` : 'auto',
  resize: props.resizable ? 'both' : 'none',
})

const contentRoot = ref<HTMLDivElement>()

if (props.resizable) {
  useResizeObserver(contentRoot, (entries) => {
    const { width, height } = entries[0].contentRect
    contentBodyStyle.width = `${width}px`
    contentBodyStyle.height = `${height}px`
  })

  watchDebounced(
    () => [contentBodyStyle.width, contentBodyStyle.height],
    () => {
    },
    {
      debounce: 500,
    },
  )
}
</script>

<template>
  <div ref="contentBox" class="lz-crx-content-box" :style="dragStyle">
    <section
      ref="dragHead"
      class="lz-panel-title"
      :style="{
        cursor: isOnPinned ? 'default' : 'move',
      }"
    >
      <span class="indent-0">{{ title }}</span>
      <div class="lz-ctrl-bar">
        <!-- setting -->
        <span v-if="showSetting" class="i-mdi-cog" @click="setting" />
        <!-- dark -->
        <span v-if="dark" class="i-mdi-weather-night" @click="toggleDark" />
        <span v-else class="i-mdi-weather-sunny" @click="toggleDark" />
        <!-- pin -->
        <span v-if="!isOnPinned" class="i-ic-outline-push-pin" @click="pinToggle()" />
        <span v-else class="i-ic-round-push-pin" @click="pinToggle()" />
        <!-- close -->
        <span v-if="closeable" @click="emits('close')"><span class="i-mdi-close-thick" /></span>
      </div>
    </section>
    <div ref="contentRoot" :style="contentBodyStyle" class="lz-panel-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="less">
.lz-crx-content-box {
  position: fixed;
  z-index: 9999;
  display: flex;
  min-width: 200px;
  min-height: 70px;
  @apply bg-canvas;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
  flex-direction: column;
  border-radius: 12px;
  .lz-panel-title {
    position: relative;
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
    font-size: 15px;
    width: 100%;
    @apply text-white bg-primary;
    border-radius: 12px 12px 0 0;
    .lz-ctrl-bar {
      position: absolute;
      top: 0;
      right: 20px;
      display: flex;
      align-items: center;
      height: 100%;
      @apply text-white;
      font-size: 18px;
      span {
        cursor: pointer;
        margin-left: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
.lz-panel-content {
    padding: 15px 20px;
    overflow: auto;
    min-height: 40px;
    min-width: 200px;
    border-radius: 0 0 12px 12px;
    @apply border-border;
  }
}
</style>
