import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import webExtension, { readJsonFile } from 'vite-plugin-web-extension';

import prefixer from 'postcss-prefix-selector';

function generateManifest() {
  const manifest = readJsonFile('src/manifest.json');
  const pkg = readJsonFile('package.json');
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// 为避免插件冲突，生成随机id
const ROOT_ID = `crx-root${Math.floor(Math.random() * 10000)}`;

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __ROOT_ID__: JSON.stringify(ROOT_ID),
  },
  plugins: [
    vue(),
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ['package.json', 'manifest.json'],
      scriptViteConfig: {
        build: {
          minify: true, // 是否压缩
        },
        plugins: [
          cssInjectedByJsPlugin(), // css-in-js
        ],
      },
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dirs: ['./src/hooks'],
      dts: './src/auto-imports.d.ts',
      vueTemplate: true,
    }),
    UnoCSS(),
  ],
  css: {
    postcss: {
      plugins: [
        // 尽可能将样式限制在当前脚本内
        prefixer({
          prefix: `#${ROOT_ID}`,
          // 忽略的选择器
          exclude: ['*', ':root', ':host', ':host-context', ':slotted'],
          transform(prefix, selector, prefixedSelector, filePath, _rule) {
            // console.log(selector, 'filePath', filePath)
            // 你也可以在此处进行更精细的筛选
            // 不处理包含scoped
            if (filePath.includes('scoped')) return String(selector) || '';
            return prefixedSelector;
          },
        }),
      ],
    },
  },
});
