import { useCallback, useState, useEffect } from 'react';

const useScroll = () => {
  const [isUp, setIsUp] = useState(true);
  const [yOffset, setYOffset] = useState(0);

  const handleScroll = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (yOffset > window.scrollY) {
        if (!isUp) setIsUp(true);
      } else if (yOffset < window.scrollY) {
        if (isUp) setIsUp(false);
      }
      setYOffset(window.scrollY);
    },
    [isUp, yOffset]
  );

  useEffect(() => {
    setYOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isUp, yOffset };
};

export default useScroll;
