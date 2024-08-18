"use client"

import { useState } from "react";

type SetValue<T> = T | ((val: T) => T);

const useLocalStorage = <T,>(key: string, defaultValue: T): [T, (value: SetValue<T>) => void] => {
  // Create state variable to store localStorage value in state
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);

      // If value is already present in localStorage, return it
      // Else set default value in localStorage and return it
      if (value) {
        return JSON.parse(value) as T;
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  // This method updates our localStorage and our state
  // const setLocalStorageStateValue = (valueOrFn: SetValue<T>) => {
  //   let newValue: T;

  //   if (typeof valueOrFn === "function") {
  //     newValue = (valueOrFn as (val: T) => T)(localStorageValue);
  //   } else {
  //     newValue = valueOrFn;
  //   }

  //   localStorage.setItem(key, JSON.stringify(newValue));
  //   setLocalStorageValue(newValue);
  // };

  return [localStorageValue, setLocalStorageValue];
};

export default useLocalStorage;
