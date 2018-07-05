import React from 'react';
import CONFIG from './../../config';

const Header = props => {
  const welcomeBanner = [];
  const headerContainerClass = props.currentUser
    ? 'header-container-logged-in'
    : 'header-container';
  const logoImageClass = props.currentUser ? 'logo-img-logged-in' : 'logo-img';

  if (props.currentUser) {
    welcomeBanner.push(<h1>Welcome {props.currentUser}</h1>);
  } else {
    welcomeBanner.push(<h1>{`Welcome to ${CONFIG.APP_NAME}!`}</h1>);
  }
  return (
    <div className={headerContainerClass}>
      <img
        className={logoImageClass}
        src="https://upload.wikimedia.org/wikipedia/commons/2/2e/US_One_Cent_Obv.png"
      />
      {welcomeBanner}
    </div>
  );
};

export default Header;
