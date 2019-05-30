import { dropdownBaseDriverFactory } from '../../DropdownBase/DropdownBase.uni.driver';

export const PopoverMenuDriverFactory = base => {
  const dropdownBaseTestkit = dropdownBaseDriverFactory(base);

  return {
    getTriggerElement: () => base.$('[data-hook="popovermenu-trigger"]'),
    clickAtChild: option => dropdownBaseTestkit.selectOption(option),
    isMenuOpen: () => dropdownBaseTestkit.isDropdownShown(),
  };
};
