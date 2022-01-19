import React, { useEffect, useRef } from 'react';
import './PatientDet.css';
import profileIcon from '../../assets/profileblue.png';
import profile from '../../assets/profilepic.png';
import close from '../../assets/close.png';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios/axios';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../features/userSlice';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';

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

function PatientDet({ user, id }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const numRef = useRef();
  const nomRef = useRef();
  const prenomRef = useRef();
  const adresseRef = useRef();
  const sexeRef = useRef();
  const naissanceRef = useRef();
  const params = useParams();
  const Id = params.id ? parseInt(params.id) : id;
  const history = useHistory();
  const [patient, setPatient] = useState();
  const [appointement, setAppointement] = useState({});
  const [consultations, setConsultations] = useState([
    {
      date: '28-11-2021',
    },
    {
      date: '06-11-2021',
    },
  ]);
  const [date, setDate] = useState(patient?.naissance);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    axios
      .get('/utilisateur/read-single.php/?id=' + Id, config)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({
      utilisateur_id: Id,
    });

    axios
      .post('/rendez-vous/read-user.php', body, config)
      .then((res) => {
        setAppointement(res.data.data.slice(-1)[0]);
      })
      .catch((err) => alert(err.message));
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({
      utilisateur_id: Id,
    });

    axios
      .post('/consultation/read-user.php', body, config)
      .then((res) => {
        setConsultations(res.data.data);
      })
      .catch((err) => alert(err.message));
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function addPatient() {
    const id = patient.id;
    const email = emailRef.current.value
      ? emailRef.current.value
      : patient.email;
    const password = passwordRef.current.value;
    const gsm = numRef.current.value ? numRef.current.value : patient.gsm;
    const nom = nomRef.current.value ? nomRef.current.value : patient.nom;
    const prenom = prenomRef.current.value
      ? prenomRef.current.value
      : patient.prenom;
    const adresse = adresseRef.current.value
      ? adresseRef.current.value
      : patient.adresse;
    const sexe = sexeRef.current.value ? sexeRef.current.value : patient.sexe;
    const naissance = naissanceRef.current.value
      ? naissanceRef.current.value
      : patient.naissance;
    const role = 'patient';

    const body = JSON.stringify({
      id,
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .post('/utilisateur/update.php', body, config)
      .then((res) => {
        alert(res.data.message);
        window.location.reload(false);
        closeModal();
      })
      .catch((err) => alert(err.message));
  }

  function del() {
    const config = {
      headers: {
        'Content-Type': 'applcation/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    const body = {
      id: appointement.id,
    };

    axios
      .post('/rendez-vous/delete.php', body, config)
      .then((res) => {
        alert(res.data.message);
        window.location.reload(false);
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="patientDet_container">
      <div className="patientDet_topSide">
        <img src={profileIcon} alt="profileIcon" />
        <h1>{patient?.nom}</h1>
      </div>
      <div className="patientDet_middleSide">
        <div className="patientDet_section1">
          <img src={profile} alt="profile" />
          <h3>{patient?.nom}</h3>
          <p>{patient?.email}</p>
        </div>
        <div className="patientDet_section">
          <>
            <h4>Sexe</h4>
            <p>{patient?.sexe}</p>
          </>
          <>
            <h4>Adresse</h4>
            <p>{patient?.adresse}</p>
          </>
        </div>
        <div className="patientDet_sectionNaissance">
          <>
            <h4>Date de naissance</h4>
            <p>{patient?.naissance}</p>
          </>
        </div>
        <div className="patientDet_section2">
          <>
            <h4>Numero de tel</h4>
            <p>{patient?.gsm}</p>
          </>
          <button className="patientDet_button" onClick={openModal}>
            Modifier
          </button>
        </div>
      </div>
      <div className="patientDet_bottomSide">
        <div className="patientDet_appointement">
          <h2>Rendez-vous</h2>
          <p>{appointement?.rdv_date}</p>
          <p>{appointement?.rdv_time}</p>
          <img src={close} alt="close" onClick={del} />
        </div>
        <div className="patientDet_consultation">
          {consultations ? (
            <>
              <h2>Consultations</h2>
              <p>{consultations[0]?.consultation_date}</p>
              {consultations[1] && <p>{consultations[1]?.consultation_date}</p>}
              <button
                className="patientDet_plusButton"
                onClick={() => {
                  history.push('/consultations/' + Id);
                }}
              >
                plus
              </button>
            </>
          ) : (
            <>
              <h2>Consultations</h2>
              <p>Pas de consultation</p>
            </>
          )}
        </div>
        {user && (
          <button
            className="patientDet_buttonD"
            onClick={() => history.push('/dossier/'+Id)}
          >
            Dossier medical
          </button>
        )}
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
              <input
                type="email"
                ref={emailRef}
                className="addPatient_input"
                placeholder={patient?.email}
              />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="num" className="addPatient_label">
                Numero tel
              </label>
              <input
                type="text"
                ref={numRef}
                className="addPatient_input"
                placeholder={patient?.gsm}
              />
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
              <input
                type="text"
                ref={nomRef}
                className="addPatient_input"
                placeholder={patient?.nom}
              />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="prenom" className="addPatient_label">
                Prenom
              </label>
              <input
                type="text"
                ref={prenomRef}
                className="addPatient_input"
                placeholder={patient?.prenom}
              />
            </div>
            <div className="addPatient_input_container">
              <label htmlFor="adresse" className="addPatient_label">
                Adresse
              </label>
              <input
                type="text"
                ref={adresseRef}
                className="addPatient_input"
                placeholder={patient?.adresse}
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
                value={date}
                onChange={(e) => {
                  setDate(e.value);
                }}
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
                selected={patient?.sexe}
              >
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
          </div>
          <button className="addPatient_button" onClick={addPatient}>
            Modifier
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default PatientDet;
