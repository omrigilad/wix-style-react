import React from 'react';
import PropTypes from 'prop-types';

import Popover from '../../Popover';
import IconButton from '../../IconButton';
import More from '../../new-icons/More';
import { listItemActionBuilder } from '../../ListItemAction';

/*
todo:
1. divider
2. options => compound component
3. rounded border - add overflow through stylable
 */

/** PopoverMenu */
class PopoverMenu extends React.PureComponent {
  static displayName = 'PopoverMenu';

  static propTypes = {
    dataHook: PropTypes.string,

    /** Text for the button */
    buttonText: PropTypes.string,
  };

  static defaultProps = {
    dataHook: 'tempHook',
    triggerElement: (
      <IconButton skin="inverted">
        <More />
      </IconButton>
    ),
  };

  state = {
    open: false,
  };

  _handleClose = () => {
    if (this.state.open) {
      this.setState({ open: false });
    }
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

  _renderOption({ option, idx }) {
    const { value, disabled } = option;
    return <div key={idx}>{value({ disabled })}</div>;
  }

  render() {
    const { dataHook, triggerElement, children } = this.props;
    const { open } = this.state;

    let itemActions = [];
    if (children) {
      // todo: handle issue - second render form playground children is empty!
      itemActions = this._toListItemActions(children);
    }
    return (
      <Popover
        dataHook={dataHook}
        shown={open}
        placement={'bottom'}
        appendTo={'window'}
        showArrow
        fixed
        flip={false}
        onClick={() => this.setState({ open: true })}
        onClickOutside={this._handleClose}
      >
        <Popover.Element>{triggerElement}</Popover.Element>
        <Popover.Content>
          <div>
            {itemActions.map((option, idx) =>
              this._renderOption({ option, idx }),
            )}
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}

export default PopoverMenu;
