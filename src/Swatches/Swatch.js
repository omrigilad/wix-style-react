import React from 'react';
import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable/FocusableHOC';
import styles from './Swatches.st.css';
import Tooltip from '../Tooltip';

class Swatch extends React.PureComponent {
  static propTypes = {};

  addTooltip = element => {
    const { tooltipContent } = this.props;

    return tooltipContent ? (
      <Tooltip
        appendTo="window"
        upgrade
        size="small"
        dataHook="color-swatches-swatch-tooltip"
        content={tooltipContent}
      >
        {element}
      </Tooltip>
    ) : (
      element
    );
  };

  render() {
    const {
      color,
      focusableOnBlur,
      focusableOnFocus,
      onClick,
      selected,
      size,
    } = this.props;
    const button = (
      <button
        type="button"
        data-hook="color-swatches-swatch"
        onFocus={focusableOnFocus}
        onBlur={focusableOnBlur}
        onClick={() => onClick(color)}
        {...styles(
          'swatch',
          { selected, size, transparent: !color },
          this.props,
        )}
        style={{ backgroundColor: color }}
      />
    );
    return color ? button : this.addTooltip(button);
  }
}
export default withFocusable(Swatch);
