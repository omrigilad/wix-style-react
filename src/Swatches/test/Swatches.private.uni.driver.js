import { swatchesDriverFactory as publicDriverFactory } from '../Swatches.uni.driver';
import { StylableUnidriverUtil } from '../../../test/utils/unidriver';
import { tooltipDriverFactory } from '../../Tooltip/TooltipNext/Tooltip.uni.driver';
import style from '../Swatches.st.css';

export const swatchesPrivateDriverFactory = (base, body) => {
  const publicDriver = publicDriverFactory(base);
  const stylableUtil = new StylableUnidriverUtil(style);
  const tooltipSelector = '[data-hook="color-swatches-swatch-tooltip"]';
  const tooltipTestkit = tooltipDriverFactory(base.$(tooltipSelector), body);

  return {
    ...publicDriver,

    /** Test if swatch is transparent at given index */
    isSwatchTransparentAt: async index => {
      const swatch = await publicDriver.getSwatch(index);
      return (
        (await stylableUtil.getStyleState(swatch, 'transparent')) === 'true'
      );
    },

    hasTooltip: async () => tooltipTestkit.exists(),

    getTooltipText: async () => tooltipTestkit.getTooltipText(),
  };
};
