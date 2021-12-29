import React from 'react';
import './PatientCard.css';
import profile from '../../assets/profilepic.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function PatientCard({ id, nom, email }) {
  const history = useHistory();
  function navigate() {
    history.push('/patient/'+id);
  }

  return (
    <div className="patientCard_container" onClick={navigate}>
      <img src={profile} alt="profile" className="patientCard_img" />
      <h4 className="patientCard_name">{nom}</h4>
      <p className="patientCard_email">{email}</p>
    </div>
  );
}

export default PatientCard;
