export const appElementId = ref('')
export function useCrxDark() {
  return useDark({
    selector: `#${appElementId.value}`,
    storageKey: 'lz-crx-theme',
  })
}
