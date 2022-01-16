import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectuser } from '../../features/userSlice';
import './Consultation.css';
import axios from '../../axios/axios';
import { useParams } from 'react-router-dom';

function Consultation() {
  const user = useSelector(selectuser);
  const Id = useParams().id;
  const [consultations, setConsultations] = useState([]);
  const [selectedConsult, setSelectedConsult] = useState(consultations[0]);

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
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="consultation_container">
      <div className="consultation_topSide">
        <h1>Consultations</h1>
      </div>
      <div className="consultation_bottomSide">
        <div className="consultation_leftSide">
          <h3>Consultations</h3>
          {consultations.map((consultation) => (
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
            readOnly={user.role === 'patient'}
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
