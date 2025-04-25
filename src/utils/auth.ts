const tokenKet = "v-admin-token";

export const getToken = (): string | null => {
  return localStorage.getItem(tokenKet);
};

export const setToken = (token: string): void => {
  localStorage.setItem(tokenKet, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(tokenKet);
};
