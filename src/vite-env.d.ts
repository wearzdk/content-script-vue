/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare const __ROOT_ID__: string;
