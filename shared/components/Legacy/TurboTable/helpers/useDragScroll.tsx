/* eslint-disable */
// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';

const useSwipeScroll = ({
  sliderRef,
  reliants = [],
  momentumVelocity = 0.5,
}: any): any => {
  const [hasSwiped, setHasSwiped] = useState(false);

  const init = useCallback(() => {
    let slider = sliderRef?.current?.container?.getElementsByClassName(
      'p-datatable-scrollable-body'
    );
    slider = slider?.length ? slider[slider?.length - 1] : null;
    if (slider) {
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      slider.addEventListener('mousedown', (e: MouseEvent) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelMomentumTracking();
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mouseup', () => {
        slider.classList.remove('mouse-grabbing');
        isDown = false;
        slider.classList.remove('active');
        beginMomentumTracking();
        setTimeout(() => setHasSwiped(false), 0);
      });

      slider.addEventListener('mousemove', (e: MouseEvent) => {
        if (!isDown) return;
        slider.classList.add('mouse-grabbing');
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; // scroll-fast
        const prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft = scrollLeft - walk;
        velX = slider.scrollLeft - prevScrollLeft;
        if (slider.scrollLeft - prevScrollLeft && !hasSwiped) {
          setHasSwiped(true);
        }
      });

      slider.addEventListener('wheel', () => {
        cancelMomentumTracking();
      });
    }
    // Momentum
    let velX = 0;
    let momentumID: number;
    function beginMomentumTracking() {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }
    function cancelMomentumTracking() {
      cancelAnimationFrame(momentumID);
    }
    function momentumLoop() {
      slider.scrollLeft += velX;
      velX *= momentumVelocity;
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }
  }, [hasSwiped, momentumVelocity, sliderRef]);

  useEffect(() => {
    init();
  }, [init]);

  return {
    hasSwiped,
  };
};

export default useSwipeScroll;
