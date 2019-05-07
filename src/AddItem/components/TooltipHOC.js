import React, { Component } from 'react';
import Tooltip from '../../Tooltip/TooltipNext';

import style from './TooltipHOC.st.css';

class TooltipHOC extends Component {
  static defaultProps = {
    tooltipPlacement: 'top',
    tooltipAppendTo: 'window',
  };
  render() {
    const {
      tooltipProps,
      tooltipContent,
      children,
      enabled,
      tooltipPlacement,
      tooltipFlip,
      tooltipFixed,
      tooltipAppendTo,
    } = this.props;
    return enabled ? (
      <Tooltip
        placement={tooltipPlacement}
        flip={tooltipFlip}
        fixed={tooltipFixed}
        content={tooltipContent}
        appendTo={tooltipAppendTo}
        {...tooltipProps}
        {...style('tooltip', {}, this.props)}
        upgrade
        dataHook="additem-tooltip"
      >
        {children}
      </Tooltip>
    ) : (
      children
    );
  }
}
export default TooltipHOC;
