
export default function useLocalStorage(key, defaultValue) {
  const data = localStorage.getItem(key) && localStorage.getItem(key) !== 'null' ? JSON.parse(localStorage.getItem(key)) : defaultValue;
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  return data

}