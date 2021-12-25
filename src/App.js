import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Screens/Login/Login';
import Home from './Screens/Home/Home';
import SignUp from './Screens/SignUp/SignUp';
import Contact from './Screens/Contact/Contact';
import Medecin from './Screens/Medecin/Medecin';
import Calendrier from './Screens/Calendrier/Calendrier';
import PatientDet from './Screens/PatientDet/PatientDet';
import Patients from './Screens/Patients/Patients';
import Patient from './Screens/Patient/Patient';
import Secretaire from './Screens/Secretaire/Secretaire';

function App() {
  const [user, setUser] = useState({
    role: 'medecin',
  });
  return (
    <div className="App">
      <Router>
        {user ? (
          user.role === 'medecin' ? (
            <Switch>
              <Route path="/">
                <Medecin />
              </Route>
            </Switch>
          ) : user.role === 'secretaire' ? (
            <Switch>
              <Route path="/patient/:id">
                <PatientDet user="secretaire" />
              </Route>
              <Route path="/patients">
                <Patients user="secretaire" />
              </Route>
              <Route path="/calendrier">
                <Calendrier />
              </Route>
              <Route path="/">
                <Secretaire />
              </Route>
            </Switch>
          ) : (
            user.role === 'patient' && (
              <Switch>
                <Route path="/calendrier">
                  <Calendrier />
                </Route>
                <Route path="/">
                  <Patient />
                </Route>
              </Switch>
            )
          )
        ) : (
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/contact">
              <Contact />/
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
