import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import Logo from '../../components/logo/Logo';
import './style.css';
import LOGIN from '../../requests/mutation';
import authLogin from '../../utils/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ status: false, message: '' });
  const [login, { loading }] = useMutation(LOGIN);

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
        window.location.assign('/');
      } else {
        setError({ status: true, message: 'Your Not Admin !' });
      }
    } catch (err) {
      setError({
        status: true,
        message: 'Wrong credentials !',
      });
    }
  };

  return (
    <div className="login">
      <div className="modal">
        <Logo />
        <form className="form-login" onSubmit={handleLogin}>
          {error.status && <span className="error">{error.message}</span>}
          <div className="input-group">
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <div className="input-icon" />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <div className="input-icon" />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? '...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
