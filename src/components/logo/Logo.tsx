import logo from '../../assets/images/IUNU_tomato-trolley_Logo.svg';
import './style.css';

function Logo() {
  return (
    <div className="logo">
      <i className="fa fa-bug" aria-hidden="true" />
      <img src={logo} alt="logo" />
    </div>
  );
}

export default Logo;
