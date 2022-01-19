import React, { useState } from 'react';
import { useRef } from 'react';
import './Update.css';
import axios from '../../axios/axios';
import Swal from 'sweetalert2';

function Update({ id }) {
  const [document, setDocument] = useState(true);
  const [examen, setExamen] = useState(false);
  const [etat, setEtat] = useState(false);

  //document ref
  const documentNom = useRef();
  const documentDescription = useRef();
  const documentType = useRef();
  //examen ref
  const examenPoids = useRef();
  const examenTaille = useRef();
  const examenImc = useRef();
  const examenTemperature = useRef();
  //etats ref
  const aF = useRef();
  const aM = useRef();
  const aC = useRef();
  const aT = useRef();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  //fonctions pour documents
  function addDocument() {
    const nom = documentNom.current.value;
    const description = documentDescription.current.value;
    const type = documentType.current.value;

    const body = JSON.stringify({
      nom,
      description,
      type,
      dossier_id: id,
    });

    axios
      .post('/document/create.php', body, config)
      .then((res) => {
        Swal.fire(
          'Bien',
          'document cree',
          'success'
        );
        setTimeout(() => {
          window.location.reload(false);
        }, 2000)
      })
      .catch((err) => console.log(err));
  }

  //fonctions pour examen
  function addExamen() {
    const poids = examenPoids.current.value;
    const taille = examenTaille.current.value;
    const IMC = examenImc.current.value;
    const temperature = examenTemperature.current.value;

    const body = JSON.stringify({
      poids,
      taille,
      IMC,
      temperature,
      dossier_id: id,
    });

    axios
      .post('/examen-clinique/create.php', body, config)
      .then((res) => {
        Swal.fire(
          'Bien',
          'Examen clinique cree',
          'success'
        );
        setTimeout(() => {
          window.location.reload(false);
        }, 2000)
      })
      .catch((err) => console.log(err));
  }

  //fonctions pour etat
  function addEtat() {
    const antecedentsFamiliaux = aF.current.value;
    const antecedentsMedicaux = aM.current.value;
    const antecedentsChirurgicaux = aC.current.value;
    const habitudesAlcoloTabagiques = aT.current.value;

    const body = JSON.stringify({
      antecedentsFamiliaux,
      antecedentsMedicaux,
      antecedentsChirurgicaux,
      habitudesAlcoloTabagiques,
      dossier_id: id,
    });

    axios
      .post('/etat-general/create.php', body, config)
      .then((res) => {
        Swal.fire(
          'Bien',
          'etat general cree',
          'success'
        );
        setTimeout(() => {
          window.location.reload(false);
        }, 2000)
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="update_container">
      <div className="update_buttons">
        <button
          className={`update_button ${document && 'active'}`}
          onClick={() => {
            setDocument(true);
            setExamen(false);
            setEtat(false);
          }}
        >
          Document
        </button>
        <button
          className={`update_button ${examen && 'active'}`}
          onClick={() => {
            setExamen(true);
            setDocument(false);
            setEtat(false);
          }}
        >
          Examen
        </button>
        <button
          className={`update_button ${etat && 'active'}`}
          onClick={() => {
            setEtat(true);
            setExamen(false);
            setDocument(false);
          }}
        >
          Etat
        </button>
      </div>
      <div className="update_content">
        {document ? (
          <div className="update_inputs">
            <label htmlFor="nom">Nom</label>
            <input type="text" className="update_input" ref={documentNom} />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="update_input"
              ref={documentDescription}
            />
            <label htmlFor="type">Type</label>
            <input type="text" className="update_input" ref={documentType} />
            <button className="update_add" onClick={addDocument}>
              Ajouter
            </button>
          </div>
        ) : examen ? (
          <div className="update_inputs">
            <label htmlFor="poids">Poids</label>
            <input type="text" className="update_input" ref={examenPoids} />
            <label htmlFor="taille">Taille</label>
            <input type="text" className="update_input" ref={examenTaille} />
            <label htmlFor="imc">IMC</label>
            <input type="text" className="update_input" ref={examenImc} />
            <label htmlFor="temperature">Temperature</label>
            <input
              type="text"
              className="update_input"
              ref={examenTemperature}
            />
            <button className="update_add" onClick={addExamen}>
              Ajouter
            </button>
          </div>
        ) : (
          etat && (
            <div className="update_inputs">
              <label htmlFor="af">antecedents Familiaux</label>
              <input type="text" className="update_input" ref={aF} />
              <label htmlFor="am">antecedents Medicaux</label>
              <input type="text" className="update_input" ref={aM} />
              <label htmlFor="ac">antecedents Chirurgicaux</label>
              <input type="text" className="update_input" ref={aC} />
              <label htmlFor="at">habitudes AlcoloTabagiques</label>
              <input type="text" className="update_input" ref={aT} />
              <button className="update_add" onClick={addEtat}>
                Ajouter
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Update;
