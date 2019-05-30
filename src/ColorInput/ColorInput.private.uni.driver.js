import { StylableUnidriverUtil } from 'wix-ui-test-utils/unidriver';
import { colorInputDriverFactory as publicDriverFactory } from './ColorInput.uni.driver';
import hashStyles from './components/Hash.st.css';
import viewerStyles from './components/ColorViewer.st.css';
import { swatchesPrivateDriverFactory } from '../Swatches/test/Swatches.private.uni.driver';

export const colorInputPrivateDriverFactory = base => {
  const viewerStylableUtil = new StylableUnidriverUtil(viewerStyles);
  const hashStylableUtil = new StylableUnidriverUtil(hashStyles);
  const swatchesHook = '[data-hook="color-picker-swatches"]';
  const swatchesDriver = swatchesPrivateDriverFactory(base.$(swatchesHook));

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
    getSwatch: async index => swatchesDriver.getSwatch(index),
    getSwatchCount: async () => swatchesDriver.getSwatchCount(),
    /** Private Swatches driver function to test if swatch is transparent at given index */
    isSwatchTransparentAt: async index =>
      swatchesDriver.isSwatchTransparentAt(index),
  };
};
