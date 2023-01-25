import React from 'react';
import TomatoTrolleyLogo from '../../assets/images/TomatoTrolleyLogo';

function Logo() {
  return (
    <div className="logo">
      <i className="fa fa-bug" aria-hidden="true" />
      <TomatoTrolleyLogo className="logo-icon" />
    </div>
  );
}

export default Logo;
