import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from '../../assets/logoblue.png';
import dashboard from '../../assets/dashboard.svg';
import calendrier from '../../assets/calendrier.svg';
import user from '../../assets/user.svg';
import off from '../../assets/off.png';
import { useState } from 'react';
import PatientDet from '../PatientDet/PatientDet';
import Patients from '../Patients/Patients';
import Calendrier from '../Calendrier/Calendrier';
import Dashboard from '../Dashboard/Dashboard';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './Secretaire.css';
import { LogoutUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import Consultation from '../Consultation/Consultation'

function Secretaire() {
  const [dashboardState, setDashboardState] = useState(true);
  const [calendrierState, setCalendrierState] = useState(false);
  const [patientState, setPatientState] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const regex = new RegExp('patient', 'g');
    if (regex.test(path)) {
      setCalendrierState(false);
      setDashboardState(false);
      setPatientState(true);
    } else if (path === '/calendrier') {
      setPatientState(false);
      setDashboardState(false);
      setCalendrierState(true);
    } else {
      setPatientState(false);
      setCalendrierState(false);
      setDashboardState(true);
    }
  }, []);

  function DashboardF() {
    setCalendrierState(false);
    setPatientState(false);
    setDashboardState(true);

    history.push('/');
  }

  function CalendrierF() {
    setPatientState(false);
    setDashboardState(false);
    setCalendrierState(true);

    history.push('/calendrier');
  }

  function PatientsF() {
    setCalendrierState(false);
    setDashboardState(false);
    setPatientState(true);

    history.push('/patients');
  }

  function logout() {
    dispatch(LogoutUser());
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    history.push('/');
  }
  return (
    <div className="secretaire_dashboard">
      <div className="secretaire_leftSide">
        <div
          className="secretaire_logo_container"
          onClick={() => {
            setCalendrierState(false);
            setPatientState(false);
            setDashboardState(true);
            history.push('/');
          }}
        >
          <img src={logo} alt="logo" />
          <h2 className="secretaire_logo">MedApp</h2>
        </div>
        <div className="secretaire_leftSide_middle">
          <div
            className={`secretaire_list ${dashboardState && 'shown'}`}
            onClick={DashboardF}
          >
            <img src={dashboard} alt="dashboard" />
            <h3 className={dashboardState && 'white'}>Dashboard</h3>
          </div>
          <div
            className={`secretaire_list ${calendrierState && 'shown'}`}
            onClick={CalendrierF}
          >
            <img src={calendrier} alt="calendrier" />
            <h3 className={calendrierState && 'white'}>Calendrier</h3>
          </div>
          <div
            className={`secretaire_list ${patientState && 'shown'}`}
            onClick={PatientsF}
          >
            <img src={user} alt="patients" />
            <h3 className={patientState && 'white'}>Patients</h3>
          </div>
        </div>
        <div className="secretaire_leftSide_bottom">
          <div className="secretaire_name">
            <img src={user} alt="secretaire" />
            <h4>Nom</h4>
          </div>
          <img src={off} alt="off" onClick={logout} />
        </div>
      </div>
      <div className="secretaire_rightSide">
        <Switch>
          <Route path="/consultations/:id">
            <Consultation />
          </Route>
          <Route path="/patient/:id">
            <PatientDet />
          </Route>
          <Route path="/patients">
            <Patients />
          </Route>
          <Route path="/calendrier">
            <Calendrier />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Secretaire;
