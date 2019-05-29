import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '../../IconButton';
import More from '../../new-icons/More';
import { listItemActionBuilder } from '../../ListItemAction';
import DropdownBase from '../../DropdownBase';

/*
todo:
1. support icons - Moshe
2. divider - Mykolas
3. set button and icon openers to spec's design - Moshe
4. align design to spec - Moshe
6. testing -
  * - options - unit test - Mykolas
7. storybook
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

  _onSelect = e => {
    this.itemsOnClick.find(({ id }) => id === e.id).onClick();
  };

  _buildOptions = () => {
    const { children } = this.props;
    const options = React.Children.map(children, (item, idx) => ({
      id: idx,
      title: item.props.text,
      onClick: item.props.onClick,
      prefixIcon: item.props.prefixIcon,
      skin: item.props.skin,
      disabled: item.props.disabled,
    }));
    this.itemsOnClick = options.map(({ id, onClick }) => ({ id, onClick }));
    return options.map(option => listItemActionBuilder({ ...option }));
  };

  render() {
    return (
      <DropdownBase
        showArrow
        options={this._buildOptions()}
        onSelect={this._onSelect}
        appendTo={'window'}
      >
        {({ open }) => {
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
