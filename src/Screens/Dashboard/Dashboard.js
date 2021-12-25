import React from 'react';
import { useState } from 'react';
import './Dashboard.css';
import profile from '../../assets/profile.png';

function Dashboard() {
  const [patients, setPatients] = useState([
      {
          id: 1,
          nom: "nom",
          prenom: "prenom",
          heure: "10:15"
      },
      {
          id: 2,
          nom: "nom",
          prenom: "prenom",
          heure: "10:15"
      },
      {
          id: 3,
          nom: "nom",
          prenom: "prenom",
          heure: "10:15"
      },
      {
          id: 4,
          nom: "nom",
          prenom: "prenom",
          heure: "10:15"
      }
  ]);

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
