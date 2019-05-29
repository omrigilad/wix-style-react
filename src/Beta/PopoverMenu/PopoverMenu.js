import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '../../IconButton';
import More from '../../new-icons/More';
import { listItemActionBuilder } from '../../ListItemAction';
import DropdownBase from '../../DropdownBase';

/*
todo:
1. support icons
2. divider
3. set button and icon openers to spec's design
4. onClick & onSelect support
5. popoverMenu icon on top header of storybook - overflow issue - remove from header or fix header - advice with Arijus
 */
/** PopoverMenu */
class PopoverMenu extends React.PureComponent {
  static displayName = 'PopoverMenu';

  static propTypes = {
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    dataHook: 'tempHook',
  };

  _toListItemActions = () => {
    const { children } = this.props;

    return React.Children.map(children, item => {
      return listItemActionBuilder({
        title: item.props.text,
        onClick: e => {
          item.props.onClick(e.target);
          this._handleClose();
        },
        skin: item.props.skin,
        disabled: item.props.disabled,
      });
    });
  };

  render() {
    return (
      <DropdownBase showArrow options={this._toListItemActions()}>
        {({ open, close }) => {
          return (
            <IconButton
              priority="secondary"
              onClick={e => {
                open(e);
              }}
            >
              <More />
            </IconButton>
          );
        }}
      </DropdownBase>
    );
  }
}

export default PopoverMenu;
