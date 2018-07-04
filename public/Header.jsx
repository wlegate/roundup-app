import React from 'react';

const Header = props => {
  let welcomeBanner = [];
  let headerContainerClass = 'header-container';
  let logoImageClass = 'logo-img';
  if (props.currentUser) {
    welcomeBanner.push(<h1>Welcome {props.currentUser}</h1>);
    headerContainerClass = 'header-container-logged-in'
    logoImageClass = 'logo-img-logged-in'
  } else {
    welcomeBanner.push(<h1>Welcome to Pennies for Progress</h1>);
  }
  return (
    <div className={headerContainerClass}>
      <img className={logoImageClass} src="https://upload.wikimedia.org/wikipedia/commons/2/2e/US_One_Cent_Obv.png" alt="penny logo"/>
      {welcomeBanner}
    </div>
  )
};

export default Header;
