import decode from 'jwt-decode';

interface IDecodedToken {
  exp: number;
  iat: number;
  userId: string;
  isAdmin: boolean;
}

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

export const getToken = () =>
  JSON.parse(localStorage.getItem('access-token') || '');

export const loggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};
