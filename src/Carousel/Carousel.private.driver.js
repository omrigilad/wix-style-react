import ReactTestUtils from 'react-dom/test-utils';
import { carouselDriverFactory as publicDriver } from './Carousel.driver';

export default ({ element }) => {
  return {
    ...publicDriver({ element }),
    getCurrentImageIndex: () => {
      const currentSlide = element.querySelector('.slick-current');
      return Number(currentSlide.dataset.index);
    },
    loadImages: () => {
      element
        .querySelectorAll('[data-hook="carousel-img"]')
        .forEach(img => ReactTestUtils.Simulate.load(img));
    },
    clickPrevious: () => {
      const prevButton = element.querySelector('[data-hook="prev-button"]');
      ReactTestUtils.Simulate.click(prevButton);
    },
    clickNext: () => {
      const nextButton = element.querySelector('[data-hook="next-button"]');
      ReactTestUtils.Simulate.click(nextButton);
    },
    mouseOver: () => {
      const imageContainer = element.querySelector('.slick-current');
      ReactTestUtils.Simulate.mouseOver(imageContainer);
    },
    mouseOut: () => {
      const imageContainer = element.querySelector('.slick-current');
      ReactTestUtils.Simulate.mouseOut(imageContainer);
    },
    clickPageNavigationDot: index => {
      const pageNavigator = element.querySelector(
        `[data-hook="page-navigation-${index}"]`,
      );
      ReactTestUtils.Simulate.click(pageNavigator);
    },
  };
};
