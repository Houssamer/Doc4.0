import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Screens/Login/Login';
import Home from './Screens/Home/Home';
import SignUp from './Screens/SignUp/SignUp';
import Contact from './Screens/Contact/Contact';
import Medecin from './Screens/Medecin/Medecin';
import Calendrier from './Screens/Calendrier/Calendrier';
import Patient from './Screens/Patient/Patient';
import Secretaire from './Screens/Secretaire/Secretaire';

function App() {
  const [user, setUser] = useState();
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
              <Route path="/">
                <Secretaire />
              </Route>
            </Switch>
          ) : (
            user.role === 'patient' && (
              <Switch>
                <Route path="/">
                  <Patient />
                </Route>
              </Switch>
            )
          )
        ) : (
          <Switch>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
