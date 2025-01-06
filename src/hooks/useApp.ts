export const appElementId = __ROOT_ID__;
export function useCrxDark() {
  return useDark({
    selector: `#${appElementId} .kf-crx-container`,
    storageKey: 'kf-crx-theme',
  });
}
