import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  code as baseCode,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import Swatches from '..';

const code = config => baseCode({ components: allComponents, ...config });
const colors3 = ['cyan', 'yellow', 'pink'];
const colors6 = ['cyan', 'yellow', 'pink', '#fff', 'rgb(0, 0, 0)', '#aeaeae'];

export default {
  category: storySettings.category,
  storyName: 'Swatches',

  component: Swatches,
  componentPath: '..',

  componentProps: setProps => ({
    onClick: value => setProps({ selected: value }),
    colors: colors3,
  }),

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
    colors: [
      { label: colors3.toString(), value: colors3 },
      { label: colors6.toString(), value: colors6 },
    ],
    size: [
      { label: 'small', value: 'small' },
      { label: 'medium', value: 'medium' },
    ],
    showClear: [
      { label: 'true', value: true },
      { label: 'false', value: false },
    ],
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Swatches/',
      component: <Swatches colors={colors6} />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: 'Displays given colors with clickable swatches.',
            }),
          ]),

          importExample("import Swatches from 'wix-style-react/Swatches';"),

          divider(),

          title('Examples'),

          columns([
            description({
              title: 'Simple Usage',
              text: 'Pass color string array in `colors` prop.',
            }),

            code({
              compact: true,
              source: "<Swatches colors={['red', '#fff', 'magenta']}/>",
            }),
          ]),

          columns([
            description({
              title: 'No color support',
              text: 'Pass `showClear` prop to get no color option.',
            }),

            code({
              compact: true,
              source: "<Swatches showClear colors={['#fff', 'magenta']}/>",
            }),
          ]),

          columns([
            description({
              title: 'Sizes',
              text:
                'Swatches support two sizes - `small` and `medium`. Pass one to `size` prop. `small` is default.',
            }),

            code({
              compact: true,
              source: `
                <div>
                  <Swatches size='small' colors={['turquoise', '#fff', 'magenta']}/>
                  <br />
                  <Swatches size='medium' colors={['turquoise', '#fff', 'magenta']}/>
                </div>
              `,
            }),
          ]),

          columns([
            description({
              title: 'Grid',
              text:
                'Swatches uses `grid` layout with pre-defined `12px` gap. Takes all available space. Here the container is `100px` width.',
            }),

            code({
              compact: true,
              source:
                "<div style={{width: '100px'}}><Swatches colors={['#000', '#fff', 'magenta', 'turquoise', 'beige']}/></div>",
            }),
          ]),

          code({
            title: 'Full Interactive Preview',
            description: 'Here you have all available props',
            source: `
              class SwatchesExamples extends React.Component {
                state = {
                  color: null,
                }
                render() {
                  return (
                    <Swatches
                      showClear
                      showClearMessage='No Color Tooltip'
                      size='medium'
                      selected={this.state.color}
                      onClick={color => this.setState({color})}
                      colors={['red', 'cyan', '#f9f9f9']} />
                  );
                }
              }`,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
