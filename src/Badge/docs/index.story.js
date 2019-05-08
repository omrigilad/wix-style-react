import React from 'react';

import { default as Badge, SIZE, SKIN, TYPE } from '..';

import { storySettings } from './storySettings';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';
import ChevronDownSmall from 'wix-ui-icons-common/ChevronDownSmall';
import ExampleBadgesRaw from '!raw-loader!./ExampleBadges';
import {
  api,
  code as baseCode,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  testkit,
  title,
} from 'wix-storybook-utils/dist/src/Sections';
import allComponents from '../../../stories/utils/allComponents';
import styles from './ExampleBadges.scss';
import * as examples from './examples';

const examplesComponents = {
  SIZE,
  SKIN,
  TYPE,
  styles,
};
Object.assign(examplesComponents, allComponents);

const exampleAffixesIcons = [
  {
    label: 'small icon',
    value: <ChevronDownSmall />,
  },
  {
    label: 'regular icon',
    value: <ChevronDown />,
  },
];

const code = config =>
  baseCode({
    components: examplesComponents,
    compact: true,
    ...config,
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Badge,
  componentPath: '..',

  componentProps: {
    children: "I'm a badge!",
    skin: 'general',
    type: 'solid',
    size: 'medium',
    uppercase: true,
  },

  exampleProps: {
    skin: Object.keys(SKIN),
    type: Object.keys(TYPE),
    size: Object.keys(SIZE),
    prefixIcon: exampleAffixesIcons,
    suffixIcon: exampleAffixesIcons,
    onClick: () => alert('Badge Clicked'),
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          importExample("import Badge from 'wix-style-react/Badge';"),

          divider(),

          title('Examples'),

          ...[
            {
              title: 'With icon',
              description:
                'Badge can contain icon as a prefix/suffix Icon size should match badge size. For a medium sized badge use normal icons. For a small badge use small icons which end with the prefix Small',
              source: examples.withIcon,
            },
            {
              title: 'Variations',
              source: ExampleBadgesRaw,
              autoRender: false,
            },
          ].map(code),
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
