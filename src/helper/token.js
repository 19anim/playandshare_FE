const ACCESS_TOKEN_STORAGE_KEY = "access_token";

const token = {
  setAccessToken: (accessToken) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  },
  getAccessToken: () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken) return accessToken;
    return "";
  },
  deleteAccessToken: () => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  },
};

export default token;
