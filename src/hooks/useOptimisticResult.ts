import { useRef, useState } from "react";

const useOptimisticResult = <T>(
  prevValue: T,
  errorThrowingFunc: (status: T) => Promise<{ err?: Error }> | void
): [T, (expectedNewValue: T) => void] => {
  const prevValueRef = useRef<T>(prevValue);
  const [value, setValue] = useState(prevValue);

  const setNewValue = (expectedNewValue: T) => {
    prevValueRef.current = value;
    setValue(expectedNewValue);

    errorThrowingFunc(expectedNewValue)?.then(({ err }) => {
      if (err) {
        setValue(prevValueRef.current);
      }
    });
  };

  return [value, setNewValue];
};

export default useOptimisticResult;
