<script lang="ts" setup>
interface LogItem {
  id: number
  time: number
  type: string
  content: string
}
const maxHeight = ref('200px')
const allLogs = ref<LogItem[]>([
  {
    id: 0,
    time: Date.now(),
    type: 'info',
    content: '日志初始化',
  },
])
const logContent = ref<HTMLElement>()
function dayFormat(time: number) {
  const date = new Date(time)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  // 补零
  const formatNumber = (n: number) => {
    const r = n.toString()
    return r[1] ? r : `0${r}`
  }
  return [hour, minute, second].map(formatNumber).join(':')
}

function addLog(type: string, content: string) {
  allLogs.value.push({
    id: allLogs.value.length,
    time: Date.now(),
    type,
    content,
  })
  // 滚动到底部
  nextTick(() => {
    if (!logContent.value)
      return
    logContent.value.scrollTop = logContent.value.scrollHeight
  })
}

// 定时清理日志
setInterval(() => {
  if (allLogs.value.length > 100)
    allLogs.value = allLogs.value.slice(50)
}, 1000 * 60 * 5)

defineExpose({
  addLog,
})
</script>

<template>
  <div class="crx-log">
    <div ref="logContent" class="crx-log-content">
      <div v-for="item in allLogs" :key="item.id" class="crx-log-item">
        <div class="crx-log-item">
          <span class="crx-log-item-time">{{ dayFormat(item.time) }}</span>
          <span class="crx-log-item-content">{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.crx-log {
  width: 100%;
  height: v-bind(maxHeight);
  border-radius: 12px;
  &-content {
    flex: 1;
    overflow-y: auto;
    background-color: #181818;
    height: calc(v-bind(maxHeight) - 40px);
    padding: 10px 20px;
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #181818;
    }
    &::-webkit-scrollbar-track {
      border-radius: 3px;
      background-color: #181818;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #555;
    }
    .crx-log-item {
      margin-bottom: 6px;
      color: #fff;
      font-size: 14px;
      line-height: 1.5;
      .crx-log-item-time {
        color: #999;
        margin-right: 20px;
      }
    }
  }
}
</style>
