import React from 'react';
import './Header.css';
import logo from '../../assets/logo.png';
import { useHistory } from 'react-router-dom';

function Header({ col }) {
  const history = useHistory();

  return (
    <div className="header_container">
      <div className="header_leftSide">
        <img src={logo} alt="logo" className="header_logo_img" />
        <h2 className="header_logo">MedApp</h2>
      </div>
      <div className="header_rightSide">
        <h3 className={`header_link ${col === 'accueil' && 'click'}`}>
          Accueil
        </h3>
        <h3
          className={`header_link ${col === 'contact' && 'click'}`}
          onClick={() => history.push('/contact')}
        >
          Contact
        </h3>
        <button className="header_button" onClick={() => history.push('/login')}>
          Connectez-vous
        </button>
      </div>
    </div>
  );
}

export default Header;
