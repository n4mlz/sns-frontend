"use client";

import { useSyncExternalStore } from "react";

import { LocalStorage } from "@/lib/localStorage";

const useLocalStorage = (key: string) => {
  const subscribe = (onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => undefined;

    const onStorageChange = (event: StorageEvent | Event) => {
      if (!(event instanceof StorageEvent) || event.key === key) onStoreChange();
    };

    window.addEventListener("storage", onStorageChange);
    window.addEventListener("local-storage-change", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("local-storage-change", onStorageChange);
    };
  };

  const value = useSyncExternalStore(
    subscribe,
    () => LocalStorage.getItem(key),
    () => undefined
  );

  const setValueAndStorage = (newValue: string) => {
    LocalStorage.setItem(key, newValue);
    window.dispatchEvent(new Event("local-storage-change"));
  };

  return { value: value ?? null, setValue: setValueAndStorage, isLoading: value === undefined };
};

export default useLocalStorage;
