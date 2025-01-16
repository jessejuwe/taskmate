// localStorageHelper.ts

/**
 * Helper functions for performing CRUD operations on local storage.
 */

/**
 * Save an item to local storage
 * @param key The key to store the item under
 * @param value The value to store (must be serializable to JSON)
 */
export const saveToLocalStorage = (key: string, value: unknown): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

/**
 * Retrieve an item from local storage
 * @param key The key of the item to retrieve
 * @returns The parsed value from local storage, or null if the item doesn't exist
 */
export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (!serializedValue) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error("Error retrieving from local storage:", error);
    return null;
  }
};

/**
 * Update a specific item in local storage
 * @param key The key of the item to update
 * @param updateFn A function that takes the current value and returns the updated value
 */
export const updateLocalStorage = <T>(
  key: string,
  updateFn: (currentValue: T | null) => T
): void => {
  try {
    const currentValue = getFromLocalStorage<T>(key);
    const updatedValue = updateFn(currentValue);
    saveToLocalStorage(key, updatedValue);
  } catch (error) {
    console.error("Error updating local storage:", error);
  }
};

/**
 * Delete an item from local storage
 * @param key The key of the item to delete
 */
export const deleteFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error deleting from local storage:", error);
  }
};

/**
 * Clear all items from local storage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing local storage:", error);
  }
};
