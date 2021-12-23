import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className='footer_container'>
            <div className='footer_topSide'>
                <div className='footer_leftSide'>
                    <p id='contact'>Contact</p>
                    <p>contact@exemple.com</p>
                    <p>+212 6484764874</p>
                </div>
                <div className='footer_rightSide'>
                    <button className='footer_button'>Prenez un rendez-vous</button>
                </div>
            </div>
            <div className='footer_bottomSide'>
                <h2>Copyrights@MedApp</h2>
            </div>
        </div>
    )
}

export default Footer
