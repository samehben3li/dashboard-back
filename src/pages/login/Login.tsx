import { useTranslation } from 'react-i18next';
import Logo from '../../components/logo/Logo';

function Login() {
  const { t } = useTranslation();

  return (
    <div className="login">
      <div className="modal">
        <Logo />
        <form className="form-login">
          <div className="input-group">
            <input
              type="text"
              name="email"
              placeholder={`${t('login.email')}`}
            />
            <div className="input-icon" />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder={`${t('login.password')}`}
            />
            <div className="input-icon" />
          </div>
          <button type="submit">{t('login.login')}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
