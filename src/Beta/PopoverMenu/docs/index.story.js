/* eslint-disable no-console */
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
import allComponents from '../../../../stories/utils/allComponents';

import PopoverMenu from '..';
import IconButton from '../../../IconButton';
import TextButton from '../../../TextButton';
import More from '../../../new-icons/More';
import ChevronDown from '../../../new-icons/ChevronDown';
import Edit from '../../../new-icons/Edit';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'PopoverMenu',

  component: PopoverMenu,
  componentPath: '..',

  componentProps: {
    buttonText: 'Hello World!',
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/PopoverMenu/',
      component: (
        <PopoverMenu
          appendTo="window"
          // triggerElement={
          //   <TextButton suffixIcon={<ChevronDown />}>Actions</TextButton>
          // }
          triggerElement={
            <IconButton priority="secondary">
              <More />
            </IconButton>
          }
        >
          <PopoverMenu.MenuItem
            text="dark option"
            onClick={e => console.log(e)}
            skin="dark"
            prefixIcon={<Edit />}
          />
          <PopoverMenu.MenuItem
            text="destructive option"
            onClick={e => console.log(e)}
            skin="destructive"
          />
          <PopoverMenu.MenuItem
            text="small option"
            onClick={e => console.log(e)}
            size="small"
          />
          <PopoverMenu.MenuItem
            text="disabled option"
            onClick={e => console.log(e)}
            disabled
          />
        </PopoverMenu>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'This line here should briefly describe component in just a sentence or two. It should be short and easy to read.',
            }),
          ]),

          columns([
            importExample(
              "import PopoverMenu from 'wix-style-react/PopoverMenu';",
            ),
          ]),

          divider(),

          title('Examples'),

          columns([
            description({
              title: 'Simple Usagee',
              text: 'A simple example with compact preview',
            }),

            code({
              compact: true,
              source:
                '<PopoverMenuBeta triggerElement={<IconButton priority="secondary"><Icons.More /></IconButton>}>\n' +
                '          <PopoverMenuBeta.MenuItem\n' +
                '            text="dark option"\n' +
                '            onClick={e => console.log(e)}\n' +
                '            skin="dark"\n' +
                '            prefixIcon={<Icons.Email/>}\n' +
                '          />\n' +
                '          <PopoverMenuBeta.MenuItem\n' +
                '            text="destructive option"\n' +
                '            onClick={e => console.log(e)}\n' +
                '            skin="destructive"\n' +
                '          />\n' +
                '          <PopoverMenuBeta.MenuItem\n' +
                '            text="disabled option"\n' +
                '            onClick={e => console.log(e)}\n' +
                '            disabled={true}\n' +
                '          />\n' +
                '        </PopoverMenuBeta>',
            }),
          ]),
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
