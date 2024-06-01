export const appElementId = __ROOT_ID__
export function useCrxDark() {
  return useDark({
    selector: `#${appElementId} .lz-crx-container`,
    storageKey: 'lz-crx-theme',
  })
}
