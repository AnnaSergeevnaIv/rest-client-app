/* eslint-disable react-compiler/react-compiler */
import type { Dispatch, Ref, RefCallback, RefObject, SetStateAction } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type PropsWithRef<RefType extends HTMLElement, P = unknown> = P & {
  ref?: Ref<RefType>;
};

type UseRefHackResult<T extends HTMLElement> = {
  refCallback: RefCallback<T>;
  refObject: RefObject<T | null>;
};

export const useRefHack = <T extends HTMLElement>({
  ref,
}: PropsWithRef<T>): UseRefHackResult<T> => {
  const refObject = useRef<T>(null);

  const refCallback: RefCallback<T> = useCallback(
    (node: T) => {
      refObject.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  return {
    refCallback,
    refObject,
  };
};

type UseShowClearOnFocusResult = UseRefHackResult<HTMLInputElement> & {
  showClear: boolean;
  setShowClear: Dispatch<SetStateAction<boolean>>;
};

export const useShowClearOnFocus = ({
  ref,
}: PropsWithRef<HTMLInputElement>): UseShowClearOnFocusResult => {
  const [showClear, setShowClear] = useState(false);
  const { refObject, refCallback } = useRefHack<HTMLInputElement>({ ref });

  const handleFocus = useCallback((): void => {
    setShowClear(!!refObject.current?.value.length);
  }, [refObject, setShowClear]);

  useEffect(() => {
    const node = refObject.current;
    setShowClear(!!node?.value.length);
    node?.addEventListener('focus', handleFocus);

    return (): void => {
      node?.removeEventListener('focus', handleFocus);
    };
  }, [refObject, handleFocus, setShowClear]);

  return {
    refCallback,
    refObject,
    showClear,
    setShowClear,
  };
};
