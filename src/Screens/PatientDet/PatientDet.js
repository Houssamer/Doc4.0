import React from 'react';
import './PatientDet.css';
import profileIcon from '../../assets/profileblue.png';
import profile from '../../assets/profilepic.png';
import close from '../../assets/close.png';
import { useState } from 'react';

function PatientDet({ user }) {
  const [patient, setPatient] = useState({
    nom: 'nom et prenom',
    email: 'exemple@exemple.com',
    sexe: 'Femme',
    naissance: '23-05-1999',
    num: '+212 6549884562',
    adresse: 'n7 reu eljadida',
    date_inscription: '21-12-2021',
  });
  const [appointement, setAppointement] = useState({
    date: '28-12-2021',
    time: '9h30min',
  });
  const [consultaions, setConsultations] = useState([
    {
      date: '28-11-2021',
    },
    {
      date: '06-11-2021',
    },
  ]);

  return (
    <div className="patientDet_container">
      <div className="patientDet_topSide">
        <img src={profileIcon} alt="profileIcon" />
        <h1>{patient.nom}</h1>
      </div>
      <div className="patientDet_middleSide">
        <div className="patientDet_section1">
          <img src={profile} alt="profile" />
          <h3>{patient.nom}</h3>
          <p>{patient.email}</p>
        </div>
        <div className="patientDet_section">
          <>
            <h4>Sexe</h4>
            <p>{patient.sexe}</p>
          </>
          <>
            <h4>Adresse</h4>
            <p>{patient.adresse}</p>
          </>
        </div>
        <div className="patientDet_section">
          <>
            <h4>Date de naissance</h4>
            <p>{patient.naissance}</p>
          </>
          <>
            <h4>Date d'inscription</h4>
            <p>{patient.date_inscription}</p>
          </>
        </div>
        <div className="patientDet_section2">
          <>
            <h4>Numero de tel</h4>
            <p>{patient.num}</p>
          </>
          <button className='patientDet_button'>Modifier</button>
        </div>
      </div>
      <div className="patientDet_bottomSide">
        <div className="patientDet_appointement">
            <h2>Rendez-vous</h2>
            <p>{appointement.date}</p>
            <p>{appointement.time}</p>
            <img src={close} alt="close" />
        </div>
        <div className="patientDet_consultation">
            <h2>Consultations</h2>
            <p>{consultaions[0].date}</p>
            <p>{consultaions[1].date}</p>
            <button className='patientDet_plusButton'>plus</button>
        </div>
        {user && (
          <button className="patientDet_buttonD">Dossier medical</button>
        )}
      </div>
    </div>
  );
}

export default PatientDet;
