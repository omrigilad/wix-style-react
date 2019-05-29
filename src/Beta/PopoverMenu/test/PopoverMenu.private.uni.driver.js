import { PopoverMenuDriverFactory as publicDriverFactory } from '../PopoverMenu.uni.driver';

export const PopoverMenuPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
