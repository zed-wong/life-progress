import { w as writable } from "./index2.js";
const getLocalStorage = (key) => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error("Error accessing localStorage:", e);
    return null;
  }
};
const setLocalStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error("Error setting localStorage:", e);
  }
};
function createPersistedStore(key, initialValue = null) {
  const storedValue = getLocalStorage(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  const { subscribe, set, update } = writable(initial);
  return {
    subscribe,
    set: (value) => {
      if (value === null) {
        if (typeof window !== "undefined") {
          localStorage.removeItem(key);
        }
      } else {
        setLocalStorage(key, JSON.stringify(value));
      }
      set(value);
    },
    update: (callback) => {
      update((value) => {
        const newValue = callback(value);
        if (newValue === null) {
          if (typeof window !== "undefined") {
            localStorage.removeItem(key);
          }
        } else {
          setLocalStorage(key, JSON.stringify(newValue));
        }
        return newValue;
      });
    }
  };
}
const userDataStore = createPersistedStore("user-data");
export {
  userDataStore as u
};
