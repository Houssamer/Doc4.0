import React from 'react';
import './Bande.css';
import instagram from '../../assets/instagram.png';
import linkedin from '../../assets/linkedin.png';
import facebook from '../../assets/facebook.png';

function Bande() {
  return (
    <div className="bande_container">
      <div className="bande_leftSide">
        <p>contact@cabinet.com</p>
      </div>
      <div className="bande_rightSide">
        <img src={linkedin} alt="linkedin" className="bande_icon" />
        <img src={instagram} alt="instagram" className="bande_icon" />
        <img src={facebook} alt="facebook" className="bande_icon" />
      </div>
    </div>
  );
}

export default Bande;
