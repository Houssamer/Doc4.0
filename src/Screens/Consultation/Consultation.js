import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectuser } from '../../features/userSlice';
import './Consultation.css';
import axios from '../../axios/axios';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';

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

function Consultation() {
  const user = useSelector(selectuser);
  const Id = useParams().id;
  const [consultations, setConsultations] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedConsult, setSelectedConsult] = useState(
    consultations ? consultations[0] : []
  );
  const dateRef = useRef();
  const descriptionRef = useRef();

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
        setSelectedConsult(res.data.data[0]);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function addConsultation() {
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({
      date,
      remarque: description,
      utilisateur_id: Id,
    });

    axios
      .post('/consultation/create.php', body, config)
      .then((res) => {
        Swal.fire('Bien', 'consultation cree', 'success');
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="consultation_container">
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyle}
      >
        <div className="consultation_add_content">
          <div className="consultation_add_inputs">
            <div className="consultation_add_input_container">
              <label htmlFor="email" className="consultation_add_label">
                Date
              </label>
              <input
                type="date"
                ref={dateRef}
                className="consultation_add_input"
                placeholder="date"
              />
            </div>
            <div className="consultation_add_input_description">
              <label htmlFor="num" className="consultation_add_label">
                Description
              </label>
              <textarea
                ref={descriptionRef}
                className="consultation_add_description"
                placeholder="description"
                cols="60"
                rows="20"
              />
            </div>
          </div>
          <button className="consultation_add_button" onClick={addConsultation}>
            ajouter
          </button>
        </div>
      </ReactModal>
      <div className="consultation_topSide">
        <h1>Consultations</h1>
        <button className="consultation_top_button" onClick={openModal}>
          Ajouter
        </button>
      </div>
      <div className="consultation_bottomSide">
        <div className="consultation_leftSide">
          <h3>Consultations</h3>
          {consultations?.map((consultation) => (
            <p
              onClick={() => {
                setSelectedConsult(consultation);
              }}
              className={`${
                consultation?.id === selectedConsult?.id && 'clicked'
              }`}
            >
              {consultation?.consultation_date}
            </p>
          ))}
        </div>
        <div className="consultation_rightSide">
          <p>Date {selectedConsult?.consultation_date}</p>
          <textarea
            className="consultation_remarque"
            readOnly={user.role === 'patient' || user.role === 'secretaire'}
            value={selectedConsult?.consultation_remarque}
            onChange={(e) => {
              setSelectedConsult({
                ...selectedConsult,
                consultation_remarque: e.target.value,
              });
            }}
          />
          <button
            hidden={user.role === 'patient' || user.role === 'secretaire'}
            className="consultation_button"
          >
            modifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default Consultation;
