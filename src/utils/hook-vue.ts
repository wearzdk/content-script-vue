// Hook Vue for vue3
// 对于 Vue3 的 web 应用，引入此脚本，实现挂载__VUE__属性到组件Dom上，实现类似 Vue2 的效果，便于逆向

// Adapted from https://github.com/Night-stars-1/LiteLoaderQQNT-Plugin-LLAPI/blob/main/src/renderer/vue.js
// Usage:
//   1. Load this script
//   2. Listen to "vue-hooked" event to know when Vue is hooked
//   3. Use window.__VUE_MOUNT__ and window.__VUE_UNMOUNT__ to listen to component mount and unmount

declare global {
  interface Window {
    __VUE_ELEMENTS__: WeakMap<HTMLElement, any[]>;
    __VUE_MOUNT__: ((component: any) => void)[];
    __VUE_UNMOUNT__: ((component: any) => void)[];
  }
  interface HTMLElement {
    __VUE__?: any[];
  }
  interface Element {
    __VUE__?: any[];
  }
}

export {};

(() => {
  if (window.__VUE_ELEMENTS__) {
    if (!window.__VUE_MOUNT__ || !window.__VUE_UNMOUNT__) {
      const tip =
        'hook-vue.js: __VUE_ELEMENTS__ is already defined, but __VUE_MOUNT__ or __VUE_UNMOUNT__ is not defined. This is likely to be a conflict with another script.';
      console.error(tip);
    }
    return;
  }
  const elements = new WeakMap<HTMLElement, any[]>();
  window.__VUE_ELEMENTS__ = elements;
  window.__VUE_MOUNT__ = []; // Functions to call when component found ((component) => {})
  window.__VUE_UNMOUNT__ = []; // Functions to call when component unmounts ((component) => {})

  function watchComponentUnmount(component: any) {
    if (!component.bum) component.bum = [];
    component.bum.push(() => {
      const element = component.vnode.el;
      if (element) {
        const components = elements.get(element);
        if (components?.length === 1) {
          elements.delete(element);
        } else {
          components?.splice(components.indexOf(component));
        }
        if (element.__VUE__?.length === 1) {
          element.__VUE__ = undefined;
        } else {
          element.__VUE__?.splice(element.__VUE__.indexOf(component));
        }
      }
      // Call functions in __VUE_UNMOUNT__ when component unmounts
      for (const func of window.__VUE_UNMOUNT__) {
        try {
          func(component);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  function watchComponentMount(component: any) {
    let value: any;
    Object.defineProperty(component.vnode, 'el', {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
        if (value) {
          recordComponent(component);
        }
      },
    });
  }

  function recordComponent(component: any) {
    let element = component.vnode.el;
    while (!(element instanceof HTMLElement)) {
      element = element.parentElement;
    }

    // Expose component to element's __VUE__ property
    if (element.__VUE__) element.__VUE__.push(component);
    else element.__VUE__ = [component];

    // Add class to element
    element.classList.add('vue-component');

    // Map element to components
    const components = elements.get(element);
    if (components) components.push(component);
    else elements.set(element, [component]);

    watchComponentUnmount(component);

    // Call functions in __VUE_MOUNT__ when component found
    for (const func of window.__VUE_MOUNT__) {
      try {
        func(component);
      } catch (e) {
        console.error(e);
      }
    }
  }

  function hookVue() {
    window.Proxy = new Proxy(window.Proxy, {
      construct(target, [proxyTarget, proxyHandler]) {
        const component = proxyTarget?._;
        if (component?.uid >= 0) {
          const element = component.vnode.el;
          if (element) {
            recordComponent(component);
          } else {
            watchComponentMount(component);
          }
        }
        return new target(proxyTarget, proxyHandler);
      },
    });
    window.dispatchEvent(new CustomEvent('vue-hooked'));
    console.log('vue-hooked');
  }

  hookVue();
})();
