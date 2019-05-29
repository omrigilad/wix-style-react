import { baseUniDriverFactory, ReactBase } from '../../test/utils/unidriver';
import { swatchesDriverFactory } from '../Swatches/Swatches.uni.driver';

export const colorPickerUniDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    confirm: async () =>
      base.$('[data-hook="color-picker-confirm-button"]').click(),
    cancel: async () =>
      base.$('[data-hook="color-picker-cancel-button"]').click(),
    clickOnPreviousColor: async () =>
      base.$('[data-hook="color-picker-history-previous"]').click(),
    historyPanelExists: async () =>
      base.$('[data-hook="color-picker-history"]').exists(),
    historyCurrentColor: async () =>
      (await ReactBase(
        base.$('[data-hook="color-picker-history-current"]'),
      ).getStyle()).background,
    historyPreviousColor: async () =>
      (await ReactBase(
        base.$('[data-hook="color-picker-history-previous"]'),
      ).getStyle()).background,
    swatchesDriver: async () =>
      swatchesDriverFactory(base.$('[data-hook="color-picker-swatches"]')),

    //private
    selectBlackColor: async () =>
      ReactBase(base.$('[data-hook="color-picker-hsb"]')).mouseDown({
        clientX: 1,
        clientY: 1,
      }),
  };
};
