import decode from 'jwt-decode';

interface IDecodedToken {
  exp: number;
  iat: number;
  userId: string;
  isAdmin: boolean;
}

export const authLogin = (token: string) => {
  localStorage.setItem('access-token', token);
};

export const logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('access-token');
  // this will reload the page and reset the state of the application
  window.location.assign('/login');
};

const isTokenExpired = (token: string) => {
  try {
    const decoded: IDecodedToken = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const getToken = () => localStorage.getItem('access-token') || '';

export const loggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};
