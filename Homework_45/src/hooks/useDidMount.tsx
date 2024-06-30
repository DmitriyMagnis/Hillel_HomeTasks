import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from 'react';

export const useDidMountEffect = (
  func: EffectCallback,
  deps: DependencyList
) => {
  const didMount = useRef<boolean>(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
