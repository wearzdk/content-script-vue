import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss';
import presetTheme from 'unocss-preset-theme';
import type { PresetThemeOptions } from 'unocss-preset-theme';

import type { Theme } from 'unocss/preset-uno';

const themes: PresetThemeOptions<Theme> = {
  theme: {
    dark: {
      colors: {
        canvas: '#252525',
        text1: '#FFFFFF',
        text2: '#BDBDBD',
        border: '#3A3A3A',
        fill1: '#1F1F1F',
        fill2: '#2B2B2B',
        fill3: '#3A3A3A',
      },
    },
    oneDark: {
      colors: {
        canvas: '#282C34',
        text1: '#ABB2BF',
        text2: '#5C6370',
        border: '#3E4451',
        fill1: '#21252B',
        fill2: '#2C323D',
        fill3: '#3E4451',
      },
    },
  },
};

export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    presetIcons({
      prefix: 'i-',
    }),
    // @ts-ignore
    presetTheme(themes),
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: '#7071F5',
      secondary: '#B8B9F5',
      canvas: '#FAFAFA',
      text1: '#333333',
      text2: '#818181',
      border: '#E0E0E0',
      error: '#FF6666',
      success: '#79C879',
      fill1: '#F7F7F7',
      fill2: '#F2F2F2',
      fill3: '#EDEDED',
    },
  },
  shortcuts: {
    input:
      'w-full h-8 px-2 border bg-fill2 border-border rounded focus:outline-none focus:ring-1 focus:ring-primary',
  },
});
