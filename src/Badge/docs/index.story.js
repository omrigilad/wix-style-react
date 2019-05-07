import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleBadges from './ExampleBadges';
import ExampleBadgesRaw from '!raw-loader!./ExampleBadges';

import { SIZE, SKIN, TYPE, default as Badge } from '..';

import { storySettings } from './storySettings';

import Facebook from 'wix-ui-icons-common/Facebook';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';

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
    dataHook: storySettings.dataHook,
  },

  exampleProps: {
    skin: Object.keys(SKIN),
    type: Object.keys(TYPE),
    size: Object.keys(SIZE),
    prefixIcon: [<ChevronDown key="0" />, <Facebook key="1" />],
    suffixIcon: [<ChevronDown key="2" />, <Facebook key="3" />],
    onClick: () => alert('Badge Clicked'),
  },

  examples: (
    <div>
      <CodeExample title="Variations" code={ExampleBadgesRaw}>
        <ExampleBadges />
      </CodeExample>
    </div>
  ),
};
