import React from 'react';
import TomatoTrolleyLogo from '../../assets/images/TomatoTrolleyLogo';

function Logo() {
  return (
    <div className="logo">
      <i className="fa fa-bug" aria-hidden="true" />
      <div className="logo-container">
        <TomatoTrolleyLogo className="iunu-logo" />
      </div>
    </div>
  );
}

export default Logo;
