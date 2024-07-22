"use client";

import { useEffect, useState } from "react";
import { LocalStorage } from "@/lib/localStorage";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setValue(LocalStorage.getItem(key) ?? null);
    setIsLoading(false);
  }, []);

  const setValueAndStorage = (newValue: string) => {
    LocalStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return { value, setValue: setValueAndStorage, isLoading };
};

export default useLocalStorage;
