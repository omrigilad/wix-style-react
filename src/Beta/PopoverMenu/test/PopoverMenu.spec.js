import React from 'react';
import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../../test/utils/unit';

import PopoverMenu from '../PopoverMenu';
import { PopoverMenuPrivateDriverFactory } from './PopoverMenu.private.uni.driver';
import IconButton from '../../../IconButton';
import More from '../../../new-icons/More';

import { iconButtonDriverFactory } from '../../../IconButton/IconButton.uni.driver';

describe('PopoverMenu', () => {
  const render = createRendererWithUniDriver(PopoverMenuPrivateDriverFactory);

  afterEach(() => {
    cleanup();
  });
  const renderPopoverMenu = (props = {}) => (
    <PopoverMenu dataHook="random" {...props} />
  );

  describe('PopoverMenu.Item', () => {
    describe('`onClick` prop', () => {
      it('[when] given should be called on item click', async () => {
        const onClick = jest.fn();

        const { driver, debug } = render(
          renderPopoverMenu({
            triggerElement: (
              <IconButton>
                <More />
              </IconButton>
            ),
            children: (
              <PopoverMenu.MenuItem
                text="dark option"
                onClick={onClick}
                skin="dark"
              />
            ),
          }),
        );

        // debug();

        const triggerElement = await driver.getTriggerElement();
        const iconButtonTestkit = iconButtonDriverFactory(triggerElement);
        await iconButtonTestkit.click();

        expect(await driver.isMenuOpen()).toBe(true);

        await driver.clickAtChild(0);
        expect(onClick).toHaveBeenCalled();
      });
    });
  });
});
