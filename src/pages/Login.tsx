import React, { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import useAuth from '../hooks/useAuth';
import { LOGIN } from '../requests/mutations';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const [error, setError] = useState({ status: false, message: '' });
  const [login, { loading }] = useMutation(LOGIN);
  const { authLogin } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    try {
      const mutationResponse = await login({
        variables: {
          email,
          password,
        },
      });
      if (mutationResponse?.data?.login?.user?.isAdmin) {
        authLogin(mutationResponse?.data?.login?.accessToken);
      } else {
        setError({ status: true, message: 'NOT_AUTHORIZED' });
      }
    } catch ({ message }) {
      setError({
        status: true,
        message: message as string | 'INCORRECT_CREDENTIALS',
      });
    }
  };

  return (
    <div className="main">
      <div className="modal">
        <Logo />
        <form onSubmit={handleLogin}>
          {error.status && (
            <span className="error">{t(`errors.${error.message}`)}</span>
          )}
          <div className="input-group">
            <input
              type="text"
              name="email"
              className="input-email"
              placeholder={`${t('login.EMAIL')}`}
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <div className="input-icon" />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              className="input-password"
              placeholder={`${t('login.PASSWORD')}`}
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <div className="input-icon" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '...' : t('login.LOGIN')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
