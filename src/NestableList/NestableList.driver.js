import ReactTestUtils from 'react-dom/test-utils';
import {
  getInstanceOfDraggableProvider,
  getInstanceOfDraggableSource,
  getInstanceOfDraggableTarget,
} from './driverHelpers';

const nestableListFactory = ({ element, wrapper }) => {
  // in case if wrapper is coming from enzyme, we want to get it instance
  const vanillaWrapper = wrapper.instance ? wrapper.instance() : wrapper;
  const isCompositeComponent = ReactTestUtils.isCompositeComponent(
    vanillaWrapper,
  );

  if (!isCompositeComponent) {
    console.warn('NestableList factory expect to receive wrapper as composite component(react instance, and not a dom instance)'); // eslint-disable-line
  }

  const backend = isCompositeComponent
    ? getInstanceOfDraggableProvider(vanillaWrapper)
        .getManager()
        .getBackend()
    : null;

  return {
    exists: () => !!element,
    getItemsNodes: () => {
      return element.querySelectorAll('[data-hook="nestable-item"]');
    },
    reorder: ({ removedId, addedId }) => {
      if (backend) {
        backend.simulateBeginDrag([
          getInstanceOfDraggableSource(
            vanillaWrapper,
            removedId,
          ).getHandlerId(),
        ]);

        const targetInstance = getInstanceOfDraggableTarget(
          vanillaWrapper,
          addedId,
        ).getHandlerId();
        backend.simulateHover([targetInstance]);
        backend.simulateDrop();
        backend.simulateEndDrag();
      }
    },
  };
};

export default nestableListFactory;
