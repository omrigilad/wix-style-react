import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const PopoverMenuDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () => base.$('[data-hook="PopoverMenu-count"]').text(),

    /** Click the button */
    clickButton: async () => base.$('[data-hook="PopoverMenu-button"]').click(),

    /** Get the button's text */
    getButtonText: async () =>
      base.$('[data-hook="PopoverMenu-button"]').text(),
  };
};
