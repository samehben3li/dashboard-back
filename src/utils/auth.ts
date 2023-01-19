const authLogin = (token: string) => {
  localStorage.setItem('access-token', token);
};

export default authLogin;
