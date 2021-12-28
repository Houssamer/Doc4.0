import React from 'react';
import './PatientCard.css';
import profile from '../../assets/profilepic.png';

function PatientCard({nom, email}) {
    return (
        <div className='patientCard_container'>
            <img src={profile} alt="profile" className='patientCard_img' />
            <h4 className='patientCard_name'>{nom}</h4>
            <p className='patientCard_email'>{email}</p>
        </div>
    )
}

export default PatientCard
