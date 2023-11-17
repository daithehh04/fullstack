export const getLocalStorage = (key) => {
  try {
    if (localStorage.getItem(key)) {
      const data = JSON.parse(localStorage.getItem(key));
      return data;
    }
  } catch (e) {}
  return [];
};
export const setLocalStorage = (key, value) => {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
  return value;
};

export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};