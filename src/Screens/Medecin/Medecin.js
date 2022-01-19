import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Medecin.css';
import logo from '../../assets/logoblue.png';
import dashboard from '../../assets/dashboard.svg';
import calendrier from '../../assets/calendrier.svg';
import user from '../../assets/user.svg';
import medecin from '../../assets/medecin.png';
import off from '../../assets/off.png';
import { useState } from 'react';
import PatientDet from '../PatientDet/PatientDet';
import Patients from '../Patients/Patients';
import Calendrier from '../Calendrier/Calendrier';
import Dashboard from '../Dashboard/Dashboard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser, selectuser } from '../../features/userSlice';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import Dossier from '../Dossier/Dossier';
import Consultation from '../Consultation/Consultation'

function Medecin() {
  const [dashboardState, setDashboardState] = useState(true);
  const [calendrierState, setCalendrierState] = useState(false);
  const [patientState, setPatientState] = useState(false);
  const med = useSelector(selectuser);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const regex = new RegExp('patient', 'g');
    const regex1 =  new RegExp('dossier', 'g');
    if (regex.test(path) || regex1.test(path)) {
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
    <div className="medecin_dashboard">
      <div className="medecin_leftSide">
        <div
          className="medecin_logo_container"
          onClick={() => {
            setCalendrierState(false);
            setPatientState(false);
            setDashboardState(true);
            history.push('/');
          }}
        >
          <img src={logo} alt="logo" />
          <h2 className="medecin_logo">MedApp</h2>
        </div>
        <div className="medecin_leftSide_middle">
          <div
            className={`medecin_list ${dashboardState && 'shown'}`}
            onClick={DashboardF}
          >
            <img src={dashboard} alt="dashboard" />
            <h3 className={dashboardState && 'white'}>Dashboard</h3>
          </div>
          <div
            className={`medecin_list ${calendrierState && 'shown'}`}
            onClick={CalendrierF}
          >
            <img src={calendrier} alt="calendrier" />
            <h3 className={calendrierState && 'white'}>Calendrier</h3>
          </div>
          <div
            className={`medecin_list ${patientState && 'shown'}`}
            onClick={PatientsF}
          >
            <img src={user} alt="patients" />
            <h3 className={patientState && 'white'}>Patients</h3>
          </div>
        </div>
        <div className="medecin_leftSide_bottom">
          <div className="medecin_name">
            <img src={medecin} alt="medecin" />
            <h4>Dr. {med.nom}</h4>
          </div>
          <img src={off} alt="off" onClick={logout} />
        </div>
      </div>
      <div className="medecin_rightSide">
        <Switch>
          <Route path="/dossier/:id">
            <Dossier />
          </Route>
          <Route path="/consultations/:id">
            <Consultation />
          </Route>
          <Route path="/patient/:id">
            <PatientDet user="medecin" />
          </Route>
          <Route path="/patients">
            <Patients user="medecin" />
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

export default Medecin;
