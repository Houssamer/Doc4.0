import React from 'react';
import './Patients.css';
import search from '../../assets/search.png';
import { useState } from 'react';
import PatientCard from '../../components/PatientCard/PatientCard';

function Patients() {
  const [patients, setPatients] = useState([
    {
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
  ]);

  return (
    <div className="pateints_container">
      <div className="patients_topSide">
        <h1>Patients</h1>
      </div>
      <div className="patients_middleSide">
        <button className="patients_button">Ajouter</button>
        <div className="patients_searchContainer">
          <input type="text" placeholder="rechercher par nom" className='patient_searchInput' />
          <img src={search} alt="search" />
        </div>
      </div>
      <div className="patients_bottomSide">
        {patients.map((patient) => (
          <PatientCard nom={patient.nom} email={patient.email} />
        ))}
      </div>
    </div>
  );
}

export default Patients;
