import TomatoTrolleyLogo from '../../assets/images/TomatoTrolleyLogo';
import './style.css';

function Logo() {
  return (
    <div className="logo">
      <i className="fa fa-bug" aria-hidden="true" />
      <TomatoTrolleyLogo />
    </div>
  );
}

export default Logo;
