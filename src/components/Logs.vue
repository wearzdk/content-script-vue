<script lang="ts" setup>
import { formatDate } from '@vueuse/core';

const props = defineProps<{
  height?: string;
}>();

interface LogItem {
  id: number;
  time: number;
  type: string;
  content: string;
}
const maxHeight = ref(props.height || '150px');
const allLogs = ref<LogItem[]>([
  {
    id: 0,
    time: Date.now(),
    type: 'info',
    content: '日志初始化',
  },
]);
const logContent = ref<HTMLElement>();

let id = 0;

function addLog(type: string, content: string) {
  allLogs.value.push({
    id: id++,
    time: Date.now(),
    type,
    content,
  });
  // 滚动到底部
  nextTick(() => {
    if (!logContent.value) return;
    logContent.value.scrollTop = logContent.value.scrollHeight;
  });
}

// 定时清理日志
whenever(
  () => allLogs.value.length > 100,
  () => {
    allLogs.value = allLogs.value.slice(-50);
  },
);

defineExpose({
  addLog,
});
</script>

<template>
  <div class="crx-log">
    <div ref="logContent" class="crx-log-content">
      <div v-for="item in allLogs" :key="item.id" class="crx-log-item">
        <div class="crx-log-item">
          <span class="crx-log-item-time">{{ formatDate(new Date(item.time), "HH:mm:ss") }}</span>
          <span class="crx-log-item-content">{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.crx-log {
  width: 100%;
  border-radius: 12px;

  &-content {
    flex: 1;
    overflow-y: auto;
    @apply bg-dark-1 dark:bg-dark-3;
    height: v-bind(maxHeight);
    padding: 8px 10px;

    &::-webkit-scrollbar {
      width: 8px;
      @apply bg-dark-1;
    }

    &::-webkit-scrollbar-track {
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      @apply bg-dark-4;
    }

    .crx-log-item {
      @apply text-light-1;
      font-size: 13px;
      line-height: 20px;
      height: 20px;

      .crx-log-item-time {
        @apply text-light-2;
        margin-right: 10px;
      }
    }
  }
}
</style>
