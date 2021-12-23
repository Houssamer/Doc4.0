import React from 'react';
import './Card.css';

function Card({logo, title, description}) {
    return (
        <div className='card_container'>
            <img src={logo} alt="icon" className='card_icon' />
            <h2 className='card_title'>{title}</h2>
            <p className='card_description'>{description}</p>
        </div>
    )
}

export default Card
