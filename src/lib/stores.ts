import { writable } from 'svelte/store';

// Define the type for our user data
export interface UserData {
    birthday: string;
    lifeExpectancy: number;
}

// Helper function to safely access localStorage
const getLocalStorage = (key: string): string | null => {
    if (typeof window === 'undefined') return null; // SSR check
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.error('Error accessing localStorage:', e);
        return null;
    }
};

// Helper function to safely set localStorage
const setLocalStorage = (key: string, value: string): void => {
    if (typeof window === 'undefined') return; // SSR check
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.error('Error setting localStorage:', e);
    }
};

// Create a custom store with localStorage persistence
function createPersistedStore<T>(key: string, initialValue: T | null = null) {
    // Try to load initial value from localStorage
    const storedValue = getLocalStorage(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    // Create the writable store
    const { subscribe, set, update } = writable<T | null>(initial);

    // Return a custom store with persistence
    return {
        subscribe,
        set: (value: T | null) => {
            if (value === null) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem(key);
                }
            } else {
                setLocalStorage(key, JSON.stringify(value));
            }
            set(value);
        },
        update: (callback: (value: T | null) => T | null) => {
            update((value) => {
                const newValue = callback(value);
                if (newValue === null) {
                    if (typeof window !== 'undefined') {
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

// Create and export the userData store
export const userData = createPersistedStore<UserData>('userData'); 