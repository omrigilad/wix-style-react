import React from 'react';
import { array, func, string, oneOf, bool, node } from 'prop-types';
import resolveColor from 'color';
import styles from './Swatches.st.css';
import Swatch from './Swatch';

/** Color swatches */
const Swatches = props => {
  const {
    colors,
    onClick,
    selected,
    size,
    dataHook,
    showClear,
    showClearMessage,
  } = props;

  const hexColors = colors.map(color => resolveColor(color).hex());
  const uniqueColors = Array.from(new Set(hexColors));

  return (
    <div {...styles('root', { size }, props)} data-hook={dataHook}>
      {showClear && (
        <Swatch
          color=""
          tooltipContent={showClearMessage}
          onClick={onClick}
          selected={selected === ''}
          size={size}
        />
      )}

      {uniqueColors.map((color, index) => (
        <Swatch
          key={`${color}-${index}`}
          color={color}
          onClick={onClick}
          selected={selected === color}
          size={size}
        />
      ))}
    </div>
  );
};

Swatches.propTypes = {
  /** Array of colors to be shown as swatches */
  colors: array,

  /** Selected color */
  selected: string,

  /** Data-hook for testing */
  dataHook: string,

  /** Callback function when user clicks on a swatch. Returns color HEX string representation. */
  onClick: func,

  /** Size of swatches */
  size: oneOf(['small', 'medium']),

  /** If true shows no color option */
  showClear: bool,

  /** optional message to display in tooltip when showClear is true */
  showClearMessage: node,
};

Swatches.defaultProps = {
  colors: [],
  size: 'small',
  selected: '',
  showClearMessage: '',
};

export default Swatches;
