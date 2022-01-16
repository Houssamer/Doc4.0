import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from '../../assets/logoblue.png';
import dashboard from '../../assets/dashboard.svg';
import calendrier from '../../assets/calendrier.svg';
import user from '../../assets/user.svg';
import off from '../../assets/off.png';
import { useState } from 'react';
import PatientDet from '../PatientDet/PatientDet';
import Calendrier from '../Calendrier/Calendrier';
import { useHistory } from 'react-router-dom';
import './Patient.css';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser, selectuser } from '../../features/userSlice';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Consultation from '../Consultation/Consultation';

function Patient() {
  const [dashboardState, setDashboardState] = useState(true);
  const [calendrierState, setCalendrierState] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const patient = useSelector(selectuser);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/calendrier') {
      setDashboardState(false);
      setCalendrierState(true);
    } else {
      setCalendrierState(false);
      setDashboardState(true);
    }
  }, []);

  function DashboardF() {
    setCalendrierState(false);
    setDashboardState(true);

    history.push('/');
  }

  function CalendrierF() {
    setDashboardState(false);
    setCalendrierState(true);

    history.push('/calendrier');
  }

  function logout() {
    dispatch(LogoutUser());
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    history.push("/");
  }

  return (
    <div className="patient_dashboard">
      <div className="patient_leftSide">
        <div
          className="patient_logo_container"
          onClick={() => {
            setCalendrierState(false);
            setDashboardState(true);
            history.push('/');
          }}
        >
          <img src={logo} alt="logo" />
          <h2 className="patient_logo">MedApp</h2>
        </div>
        <div className="patient_leftSide_middle">
          <div
            className={`patient_list ${dashboardState && 'shown'}`}
            onClick={DashboardF}
          >
            <img src={dashboard} alt="dashboard" />
            <h3 className={dashboardState && 'white'}>Dashboard</h3>
          </div>
          <div
            className={`patient_list ${calendrierState && 'shown'}`}
            onClick={CalendrierF}
          >
            <img src={calendrier} alt="calendrier" />
            <h3 className={calendrierState && 'white'}>Calendrier</h3>
          </div>
        </div>
        <div className="patient_leftSide_bottom">
          <div className="patient_name">
            <img src={user} alt="patient" />
            <h4>{patient?.nom} {patient?.prenom}</h4>
          </div>
          <img src={off} alt="off" onClick={logout} />
        </div>
      </div>
      <div className="patient_rightSide">
        <Switch>
          <Route path="/calendrier">
            <Calendrier />
          </Route>
          <Route path="/consultations/:id">
            <Consultation />
          </Route>
          <Route path="/">
            <PatientDet id={patient.id} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Patient;
