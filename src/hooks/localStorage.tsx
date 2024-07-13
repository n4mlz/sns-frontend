import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setValue(window.localStorage.getItem(key));
    setIsLoading(false);
  }, []);

  const setValueAndStorage = (newValue: string) => {
    window.localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return { value, setValue: setValueAndStorage, isLoading };
};

export default useLocalStorage;
