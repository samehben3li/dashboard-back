export const authLogin = (token: string) => {
  localStorage.setItem('access-token', token);
};

export const getToken = () => localStorage.getItem('access-token') || '';
