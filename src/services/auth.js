export const TOKEN_KEY = '@Marvel:token';
export const USER_KEY = '@Marvel:user';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const setUser = (user) => {
  localStorage.setItem(USER_KEY, user);
};
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
