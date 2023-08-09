export const appElementId = ref('')
export function useCrxDark() {
  return useDark({
    selector: `#${appElementId.value} #crx-app`,
    storageKey: 'lz-crx-theme',
  })
}
