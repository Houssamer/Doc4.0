import React, { useEffect } from 'react';
import { useState } from 'react';
import './Dashboard.css';
import profile from '../../assets/profile.png';
import axios from '../../axios/axios';
import moment from 'moment';

function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        'COntent-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }

    const body = JSON.stringify({
      //date: moment(new Date()).format('YYYY-MM-DD'),
      date: '2022-01-20'
    })

    console.log(body)

    axios
      .post('/rendez-vous/read.php', body, config)
      .then((res) => {
        if (res.data.data) {
          res.data.data.map((rdv) => {
            const user = JSON.stringify({
              id:  rdv.utilisateur_id,
            })
            axios 
              .post('/utilisateur/read-single.php', user, config)
              .then((res) => {
                setPatients([
                  ...patients,
                  {
                    id: res.data.data[0].id,
                    nom: res.data.data[0].nom,
                    prenom: res.data.data[0].prenom,
                    heure: rdv.rdv_time
                  }
                ])
              })
              .catch((err) => alert(err.message))
          })
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => alert(err.message))
  }, [])

  return (
    <div className="dashboard_container">
      <div className="dashboard_topSide">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard_bottomSide">
        <div className="dashboard_top">
          <h4>Bonjour</h4>
        </div>
        <div className="dashboard_bottom">
          <div className="dashboard_leftSide">
            <div className="dashboard_stats rect0">
              <h4>Total</h4>
              <h3>45</h3>
            </div>
            <div className="dashboard_rect rect1" />
            <div className="dashboard_rect rect2" />
            <div className="dashboard_rect rect3" />
            <div className="dashboard_rect rect4" />
            <div className="dashboard_rect rect5" />
            <div className="dashboard_stats rect6">
              <h4>Aujourd'hui</h4>
              <h3>20</h3>
            </div>
          </div>
          <div className="dashboard_rightSide">
            <h3>Patients pour ajourd'hui</h3>
            <div className="dashboard_patients">
                {patients.map((patient) => (
                    <div className="dashboard_patient">
                        <img src={profile} alt="profile" />
                        <p>{patient.nom} {patient.prenom}</p>
                        <p>{patient.heure}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
