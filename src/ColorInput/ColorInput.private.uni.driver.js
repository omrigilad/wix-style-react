import { StylableUnidriverUtil } from 'wix-ui-test-utils/unidriver';
import { colorInputDriverFactory as publicDriverFactory } from './ColorInput.uni.driver';
import hashStyles from './components/Hash.st.css';
import viewerStyles from './components/ColorViewer.st.css';
import { swatchesPrivateDriverFactory } from '../Swatches/test/Swatches.private.uni.driver';

export const colorInputPrivateDriverFactory = base => {
  const viewerStylableUtil = new StylableUnidriverUtil(viewerStyles);
  const hashStylableUtil = new StylableUnidriverUtil(hashStyles);
  const swatchesHook = '[data-hook="color-picker-swatches"]';

  const isHashDisabled = async () =>
    (await hashStylableUtil.getStyleState(
      base.$('[data-hook="colorinput-hash"]'),
      'disabled',
    )) === 'true';

  const getViewerSize = async () =>
    await viewerStylableUtil.getStyleState(
      base.$('[data-hook="colorinput-viewer"]'),
      'size',
    );
  return {
    ...publicDriverFactory(base),
    isHashDisabled,
    isViewerNull: async () =>
      await base.$('[data-hook="colorinput-viewer-line"]').exists(),
    getViewerSize,
    /** Return Swatches's component testkit methods */
    swatchesDriver: async () =>
      swatchesPrivateDriverFactory(base.$(swatchesHook)), // eslint-disable-line no-restricted-properties
  };
};
