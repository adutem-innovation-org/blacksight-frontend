import { useCallback, useEffect, useState } from "react";

export const useRetryTimeout = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const resetRetryTimeout = useCallback(() => {
    setMinutes(1);
    setSeconds(30);
  }, []);

  const clearRetryTimeout = useCallback(() => {
    setMinutes(0);
    setSeconds(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return { resetRetryTimeout, clearRetryTimeout, seconds, minutes };
};
