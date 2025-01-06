import type { ComponentInternalInstance } from '@vue/runtime-core';
import type { App } from 'vue';

/**
 * 获取 Vue 实例指定名称的组件
 * @param instance
 * @param name 组件名称
 * @returns 组件实例
 */
export function findComponentByName<T = any>(
  instance: any,
  name: string,
): T | null {
  if (!instance) return null;

  if (instance.$options.name === name) {
    return instance;
  }
  for (let i = 0; i < instance.$children.length; i++) {
    const found = findComponentByName(instance.$children[i], name);
    if (found) {
      return found;
    }
  }

  return null;
}

/**
 * 获取 App Vue 实例
 * @returns Vue 实例
 */
export function getAppVueInstance() {
  const app = document.querySelector('#app');
  if (!app) return null;
  const instance = (app as any).__vue_app__;
  if (!instance) return null;
  return instance as App;
}

/**
 * 获取 store 实例
 * @returns store 实例
 */
export function getStoreInstance() {
  const app = getAppVueInstance();
  if (!app) return null;
  return app.config.globalProperties.$store;
}

/**
 * 获取 Vue 实例
 * @description 必须引入 hook-vue.ts 脚本
 * @param element 元素
 * @returns Vue 实例
 */
export function getVueInstance(element: HTMLElement) {
  if (!element.__VUE__) return null;
  /// https://github.com/vuejs/core/blob/main/packages/runtime-core/src/component.ts
  return element.__VUE__[0] as ComponentInternalInstance & {
    provides: Record<string, any>;
    propsDefaults: Record<string, any>;
    emitted: Record<string, any>;
    setupState: Record<string, any>;
    [key: string]: any;
  };
}
