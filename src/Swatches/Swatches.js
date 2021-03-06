import React from 'react';
import { array, func, string, oneOf, bool } from 'prop-types';
import resolveColor from 'color';
import styles from './Swatches.st.css';
import Swatch from './Swatch';

/** Color swatches */
const Swatches = props => {
  const { colors, onClick, selected, size, dataHook, showClear } = props;

  const hexColors = colors.map(color => resolveColor(color).hex());
  const uniqueColors = Array.from(new Set(hexColors));

  return (
    <div {...styles('root', { size }, props)} data-hook={dataHook}>
      {showClear && (
        <Swatch
          color=""
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
};

Swatches.defaultProps = {
  colors: [],
  size: 'small',
  selected: '',
};

export default Swatches;
