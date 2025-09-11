/* eslint-disable react-compiler/react-compiler */
import type { Dispatch, Ref, RefCallback, RefObject, SetStateAction } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type PropsWithRef<P = unknown> = P & {
  ref?: Ref<HTMLInputElement>;
};

type UseRefHackResult = {
  refCallback: RefCallback<HTMLInputElement>;
  refObject: RefObject<HTMLInputElement | null>;
};

const useRefHack = ({ ref }: PropsWithRef): UseRefHackResult => {
  const refObject = useRef<HTMLInputElement>(null);

  const refCallback: RefCallback<HTMLInputElement> = useCallback(
    (node: HTMLInputElement) => {
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

type UseShowClearOnMountResult = UseRefHackResult & {
  showClear: boolean;
  setShowClear: Dispatch<SetStateAction<boolean>>;
};

export const useShowClearOnMount = ({ ref }: PropsWithRef): UseShowClearOnMountResult => {
  const [showClear, setShowClear] = useState(false);
  const { refObject, refCallback } = useRefHack({ ref });

  useEffect(() => {
    if (refObject.current) {
      setShowClear(refObject.current.value.length > 0);
    }
  }, [refObject]);

  return {
    refCallback,
    refObject,
    showClear,
    setShowClear,
  };
};
