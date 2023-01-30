import { useNavigate } from 'react-router-dom';
import { loggedIn } from '../utils/auth';
import useLocalStorage from './useLocalStorage';

const useAuth = () => {
  const [token, setToken] = useLocalStorage('access-token', null);
  const navigate = useNavigate();

  const authLogin = async (newToken: string) => {
    setToken(newToken);
    navigate('/');
  };

  const isLoggedIn = loggedIn();

  const logout = () => {
    setToken(null);
    navigate('/login', { replace: true });
  };
  return { token, authLogin, isLoggedIn, logout };
};

export default useAuth;
