import React from 'react';
import PropTypes from 'prop-types';
import { listItemActionBuilder } from '../../ListItemAction';
import DropdownBase from '../../DropdownBase';

/** PopoverMenu */
class PopoverMenu extends React.PureComponent {
  static displayName = 'PopoverMenu';

  static propTypes = {
    /** The maximum width applied to the list */
    maxWidth: PropTypes.number,

    /** Callback to be called when the popover is shown */
    onShow: PropTypes.func,

    /** Callback to be called when the popover is hidden */
    onHide: PropTypes.func,

    /** Popover content z-index */
    zIndex: PropTypes.number,

    /** Moves popover content relative to the parent by x or y */
    moveBy: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),

    /** Element to trigger the popover */
    triggerElement: PropTypes.element.isRequired,

    /**
     * Menu items
     *  * <PopoverMenu.MenuItem>
     *  * `text` - Item text
     *  * `onClick` - Callback to be triggered on item click
     *  * `skin` - Item theme (dark, destructive)
     *  * `prefixIcon` - Prefix icon
     *  * `textSize` - Text size (small, medium)
     *  * `disabled` - Disabled
     *  * />
     */
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {
    maxWidth: 204,
  };

  _onSelect = e => {
    this.itemsOnClick.find(({ id }) => id === e.id).onClick();
  };

  _buildOptions = () => {
    const { children } = this.props;
    const options = React.Children.map(children, (item, idx) => {
      const {
        text,
        onClick,
        skin = 'dark',
        textSize,
        prefixIcon,
        disabled,
      } = item.props;
      return {
        id: idx,
        title: text,
        onClick,
        skin,
        size: textSize,
        prefixIcon,
        disabled,
      };
    });

    this.itemsOnClick = options.map(({ id, onClick }) => ({ id, onClick }));

    return options.map(option =>
      listItemActionBuilder({ ...option, paddingSize: 'small' }),
    );
  };

  render() {
    const { appendTo, placement, triggerElement } = this.props;
    return (
      <DropdownBase
        showArrow
        options={this._buildOptions()}
        onSelect={this._onSelect}
        appendTo={appendTo}
        placement={placement}
      >
        {({ open }) => {
          return React.cloneElement(triggerElement, {
            onClick: open,
            dataHook: 'popovermenu-trigger',
          });
        }}
      </DropdownBase>
    );
  }
}

PopoverMenu.MenuItem = () => ({});

export default PopoverMenu;
