import Logo from '../../components/logo/Logo';
import './style.scss';

function Login() {
  return (
    <div className="login">
      <div className="modal">
        <Logo />
        <form className="form-login">
          <div className="input-group">
            <input type="text" name="email" placeholder="email" />
            <div className="input-icon" />
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="password" />
            <div className="input-icon" />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
