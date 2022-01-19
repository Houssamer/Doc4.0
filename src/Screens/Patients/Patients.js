import React, { useEffect, useRef } from 'react';
import './Patients.css';
import search from '../../assets/search.png';
import { useState } from 'react';
import PatientCard from '../../components/PatientCard/PatientCard';
import ReactModal from 'react-modal';
import axios from '../../axios/axios';

const customStyle = {
  content: {
    width: '50%',
    position: 'absolute',
    left: '25%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    boxShadow: '-2px 2px 5px 2px rgba(0, 0, 0, .24)',
  },
};

function Patients() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const emailRef = useRef();
  const passwordRef = useRef();
  const numRef = useRef();
  const nomRef = useRef();
  const prenomRef = useRef();
  const adresseRef = useRef();
  const sexeRef = useRef();
  const naissanceRef = useRef();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .get('/utilisateur/read.php', config)
      .then((res) => {
        //setPatients(res.data);
        setPatients(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function addPatient() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const gsm = numRef.current.value;
    const nom = nomRef.current.value;
    const prenom = prenomRef.current.value;
    const adresse = adresseRef.current.value;
    const sexe = sexeRef.current.value;
    const naissance = naissanceRef.current.value;
    const role = 'patient';

    const body = JSON.stringify({
      nom,
      prenom,
      naissance,
      email,
      password,
      adresse,
      gsm,
      sexe,
      role,
    });

    const config = JSON.stringify({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axios
      .post('/utilisateur/create.php', body, config)
      .then((res) => {
        alert(res.data.message);
        closeModal();
      })
      .catch((err) => alert(err.message));
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
            nom={patient?.nom}
            prenom={patient?.prenom}
            email={patient?.email}
            id={patient?.id}
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
              <input type="email" ref={emailRef} className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="num" className="addPatient_label">
                Numero tel
              </label>
              <input type="text" ref={numRef} className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="password" className="addPatient_label">
                Mot de passe
              </label>
              <input
                type="password"
                ref={passwordRef}
                className="addPatient_input"
              />
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
              <input type="text" ref={nomRef} className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="prenom" className="addPatient_label">
                Prenom
              </label>
              <input type="text" ref={prenomRef} className="addPatient_input" />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="adresse" className="addPatient_label">
                Adresse
              </label>
              <input
                type="text"
                ref={adresseRef}
                className="addPatient_input"
              />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="birth" className="addPatient_label">
                Date de naissance
              </label>
              <input
                type="date"
                ref={naissanceRef}
                className="addPatient_input"
              />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="" className="addPatient_label">
                Sexe
              </label>
              <select
                name="sexe"
                ref={sexeRef}
                id="sexe"
                className="addPatient_input"
              >
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
          </div>
          <button className="addPatient_button" onClick={addPatient}>
            Ajouter
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default Patients;
