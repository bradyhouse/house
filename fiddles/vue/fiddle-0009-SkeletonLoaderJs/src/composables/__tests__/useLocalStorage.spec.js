import { describe, it, expect, beforeEach } from 'vitest';
import useLocalStorage from '../useLocalStorage';
import { nextTick } from 'vue';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

beforeEach(() => {
  localStorage.clear();
});

describe('useLocalStorage', () => {
  it('initializes with a default value', () => {
    const key = 'testKey';
    const defaultValue = 'testValue';
    const { data } = useLocalStorage(key, defaultValue);
    expect(data.value).toBe(defaultValue);
  });

  it('reads existing value from localStorage', () => {
    const key = 'existingKey';
    const storedValue = 'storedValue';
    localStorage.setItem(key, JSON.stringify(storedValue));
    const { data } = useLocalStorage(key, 'defaultValue');
    expect(data.value).toBe(storedValue);
  });

  it('updates localStorage when value changes', async () => {
    const key = 'updateKey';
    const { data } = useLocalStorage(key, 'initialValue');
    const newValue = 'newValue';
    data.value = newValue;
    await nextTick();
    expect(JSON.parse(localStorage.getItem(key))).toBe(newValue);
  });
});
