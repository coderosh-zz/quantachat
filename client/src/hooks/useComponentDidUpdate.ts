import { useRef, useEffect } from 'react';
const useComponentDidUpdate = (
  effect: () => unknown,
  dependencies: any[] = []
) => {
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    effect();
  }, dependencies);
};

export default useComponentDidUpdate;
