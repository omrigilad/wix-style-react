import { dropdownBaseDriverFactory } from '../../DropdownBase/DropdownBase.uni.driver';

export const PopoverMenuDriverFactory = base => {
  const dropdownBaseTestkit = dropdownBaseDriverFactory(base);
  return {
    clickAtChild: option => dropdownBaseTestkit.selectOption(option),
  };
};
