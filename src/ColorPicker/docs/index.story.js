import ColorPicker from '..';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: ColorPicker,
  componentPath: '..',

  componentProps: setProps => ({
    value: '#3899eb',
    onChange: value => setProps({ value: value.hex() }),
    dataHook: storySettings.dataHook,
  }),

  exampleProps: {
    onChange: ev => ev.hex(),
    onCancel: () => 'Cancelled',
    onConfirm: () => 'Confirmed',
    preset: [
      {
        value: ['red', 'green', 'yellow', '#fff', 'rgb(0, 0, 0)', 'magenta'],
        label: "['red', 'green', 'yellow', '#fff', 'rgb(0, 0, 0)', 'magenta']",
      },
    ],
  },
};
