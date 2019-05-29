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

  it('should render', async () => {
    const { driver } = render(<PopoverMenu />);

    expect(await driver.exists()).toBeTruthy();
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const { driver } = render(<PopoverMenu />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button even number (2) of times',
    );
  });

  it('should allow changing the button text', async () => {
    const { driver } = render(<PopoverMenu buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
