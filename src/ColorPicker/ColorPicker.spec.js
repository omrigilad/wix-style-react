import React from 'react';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../test/utils/react';
import color from 'color';
import colorPickerDriverFactory from './ColorPicker.private.driver';
import { colorPickerUniDriverFactory } from './ColorPicker.uni.driver';

import ColorPicker from './ColorPicker';

describe('ColorPicker', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(colorPickerDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(colorPickerUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    it('should successfully render a component', async () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const { driver } = render(
        <ColorPicker
          {...{ value: '#000000', onChange, onCancel, onConfirm }}
        />,
      );
      expect(await driver.exists()).toBeTruthy();
      expect(await driver.historyPanelExists()).toBeFalsy();
    });

    describe('History', () => {
      it('should show history panel with current color selected as previous', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#000000';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        expect(await driver.historyPanelExists()).toBeTruthy();
        expect(color(await driver.historyCurrentColor()).hex()).toBe(value);
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
      });

      it('should not update previous color after current color change but not confirm', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#00FF00';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        await driver.selectBlackColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
      });

      it('should set previous color to be active color', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#00FF00';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        await driver.selectBlackColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
        await driver.clickOnPreviousColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe(value);
      });

      it('should update previous color after confirm click', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#00FF00';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        await driver.selectBlackColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
        await driver.confirm();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(
          '#000000',
        );
      });

      it('`onCancel` should be called when cancel icon is clicked', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#00FF00';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        await driver.selectBlackColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
        await driver.cancel();
        expect(onChange).toHaveBeenCalledTimes(1);
      });
    });
  }

  describe('preset', () => {
    const preset = ['red', 'green', 'blue'];
    const render = createRendererWithUniDriver(colorPickerUniDriverFactory);

    it('should render given colors as swatches', async () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '#00FF00';
      const { driver } = render(
        <ColorPicker {...{ value, onChange, onCancel, onConfirm, preset }} />,
      );
      expect(await (await driver.swatchesDriver()).getSwatchCount()).toBe(3);
    });
    it('should call onChange when clicked', async () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '#00FF00';
      const { driver } = render(
        <ColorPicker
          {...{
            value,
            onChange,
            onCancel,
            onConfirm,
            preset,
          }}
        />,
      );
      const swatch = await (await driver.swatchesDriver()).getSwatch(0);
      await swatch.click();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(color(preset[0]));
    });
  });

  //private driver test only
  it('should update the color after clicking Enter', async () => {
    const render = createRendererWithDriver(colorPickerDriverFactory);
    const onChange = jest.fn();
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const sampleColor = '#000000';
    const expectedColor = { color: [0, 0, 0], model: 'rgb', valpha: 1 };
    const { driver } = render(
      <ColorPicker
        {...{
          value: '',
          onChange,
          onCancel,
          onConfirm,
        }}
      />,
    );
    await driver.typeValueOnHexInput(sampleColor);
    await driver.keyDownOnHexInput('Enter');

    expect(onConfirm).toHaveBeenCalledWith(expectedColor);
  });
});
