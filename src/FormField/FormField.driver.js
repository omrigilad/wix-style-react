import { tooltipDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.driver';
import { Simulate } from 'react-dom/test-utils';

const formFieldDriver = ({ element }) => {
  const byHook = hook => element.querySelector(`[data-hook*="${hook}"]`);
  const charactersCounter = () => byHook('formfield-counter');

  const tooltipTestkit = tooltipDriverFactory({
    element: byHook('formfield-infotooltip'),
    eventTrigger: Simulate,
  });

  return {
    exists: () => !!element,
    element: () => element,
    getChildren: () => byHook('formfield-children'),
    getLabel: () => byHook('formfield-label'),
    isRequired: () => !!byHook('formfield-asterisk'),
    getLengthLeft: () => {
      const counter = charactersCounter();
      return counter ? parseInt(counter.innerHTML, 10) : null;
    },
    isLengthExceeded: () => {
      const counter = charactersCounter();
      if (counter) {
        const length = parseInt(counter.innerHTML, 10);
        return length < 0;
      }
      return false;
    },
    getInfoContent: () => {
      tooltipTestkit.mouseEnter();
      return tooltipTestkit.getContentElement().textContent;
    },
  };
};

export default formFieldDriver;
