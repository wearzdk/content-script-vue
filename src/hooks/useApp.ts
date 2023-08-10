export const appElementId = '__ROOT_ID__'
export function useCrxDark() {
  return useDark({
    selector: `#${appElementId} #crx-app`,
    storageKey: 'lz-crx-theme',
  })
}
