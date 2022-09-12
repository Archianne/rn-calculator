import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = <T>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);
  const [retrivedFromStorage, setRetrievedFromStorage] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const value: any = await AsyncStorage.getItem(key);
        setData(JSON.parse(value) || initialValue);
        setRetrievedFromStorage(true);
      } catch (error) {
        console.error("useAsyncStorage getItem error:", error);
      }
    })();
  }, [key, initialValue]);

  const setNewData = async (value: T | ((val: T) => T)) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setData(value);
    } catch (error) {
      console.error("useAsyncStorage setItem error:", error);
    }
  };

  return [data, setNewData, retrivedFromStorage] as const;
};
