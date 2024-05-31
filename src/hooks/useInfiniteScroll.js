import { useCallback, useEffect, useRef, useState } from 'react';

const useInfiniteScroll = (targetEl) => {
  const observerRef = useRef(null);
  const [intersecting, setIntersecting] = useState(false);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
        // entries[0] -> some 말고 0번 인덱스에 접근
      observerRef.current = new IntersectionObserver((entries) =>
        setIntersecting(entries[0].isIntersecting)
      );
    }
    return observerRef.current;
  }, []);

  useEffect(() => {
    const observer = getObserver();
    const currentEl = targetEl.current;

    if (currentEl) observer.observe(currentEl);

    return () => {
      if (currentEl) observer.unobserve(currentEl);
      observer.disconnect();
    };
  }, [getObserver, targetEl]);

  return intersecting;
};

export default useInfiniteScroll;
