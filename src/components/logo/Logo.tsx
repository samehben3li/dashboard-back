import TomatoTrolleyLogo from '../../assets/images/TomatoTrolleyLogo';
import './style.scss';

function Logo() {
  return (
    <div className="logo">
      <i className="fa fa-bug" aria-hidden="true" />
      <TomatoTrolleyLogo />
    </div>
  );
}

export default Logo;
