import React from 'react';
import './Patients.css';
import search from '../../assets/search.png';
import { useState } from 'react';
import PatientCard from '../../components/PatientCard/PatientCard';
import { useHistory } from 'react-router-dom';
import ReactModal from 'react-modal';

const customStyle = {
  content: {
    width: '50%',
    position: 'absolute',
    left: '25%',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    boxShadow: "-2px 2px 5px 2px rgba(0, 0, 0, .24)",
  },
};

function Patients() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState([
    {
      id: 1,
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      id: 2,
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      id: 3,
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      id: 4,
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      id: 5,
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
    {
      id: 6,
      nom: 'nom et prenom',
      email: 'exemple@exemple.com',
    },
  ]);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="pateints_container">
      <div className="patients_topSide">
        <h1>Patients</h1>
      </div>
      <div className="patients_middleSide">
        <button className="patients_button" onClick={openModal}>
          Ajouter
        </button>
        <div className="patients_searchContainer">
          <input
            type="text"
            placeholder="rechercher par nom"
            className="patient_searchInput"
          />
          <img src={search} alt="search" />
        </div>
      </div>
      <div className="patients_bottomSide">
        {patients.map((patient) => (
          <PatientCard
            nom={patient.nom}
            email={patient.email}
            id={patient.id}
          />
        ))}
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyle}
      >
        <div className="addPatient_content">
          <div className="addPatient_inputs">
            <div className="addPatient_input_container">
              <label htmlFor="email" className="addPatient_label">
                Email
              </label>
              <input type="email" className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="num" className="addPatient_label">
                Numero tel
              </label>
              <input type="text" className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="password" className="addPatient_label">
                Mot de passe
              </label>
              <input type="password" className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="repass" className="addPatient_label">
                re-Mot de passe
              </label>
              <input type="password" className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="nom" className="addPatient_label">
                Nom
              </label>
              <input type="text" className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="prenom" className="addPatient_label">
                Prenom
              </label>
              <input type="text" className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="adresse" className="addPatient_label">
                Adresse
              </label>
              <input type="text" className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="birth" className="addPatient_label">
                Date de naissance
              </label>
              <input type="date" className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="" className="addPatient_label">
                Sexe
              </label>
              <select name="sexe" id="sexe" className="addPatient_input">
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
          </div>
          <button className='addPatient_button'>Ajouter</button>
        </div>
      </ReactModal>
    </div>
  );
}

export default Patients;
