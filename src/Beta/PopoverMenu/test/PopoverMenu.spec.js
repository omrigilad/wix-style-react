import React from 'react';
import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../../test/utils/unit';

import PopoverMenu from '../PopoverMenu';
import { PopoverMenuPrivateDriverFactory } from './PopoverMenu.private.uni.driver';

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

        const { driver } = render(
          renderPopoverMenu({
            children: (
              <PopoverMenu.MenuItem
                text="dark option"
                onClick={onClick}
                skin="dark"
              />
            ),
          }),
        );

        await driver.clickAtChild(0);
        expect(onClick).toHaveBeenCalled();
      });
    });
  });
});
