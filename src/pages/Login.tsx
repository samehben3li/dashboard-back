import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';

function Login() {
  const { t } = useTranslation();

  return (
    <div className="main">
      <div className="modal">
        <Logo />
        <form>
          <div className="input-group">
            <input
              type="text"
              name="email"
              className="input-email"
              placeholder={`${t('login.email')}`}
            />
            <div className="input-icon" />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              className="input-password"
              placeholder={`${t('login.password')}`}
            />
            <div className="input-icon" />
          </div>
          <button className="btn btn-primary" type="submit">
            {t('login.login')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
