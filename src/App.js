import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Screens/Login/Login';
import Home from './Screens/Home/Home';
import SignUp from './Screens/SignUp/SignUp';
import Contact from './Screens/Contact/Contact';
import Medecin from './Screens/Medecin/Medecin';
import Patient from './Screens/Patient/Patient';
import Secretaire from './Screens/Secretaire/Secretaire';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, selectuser } from './features/userSlice';
import { useEffect } from 'react';
import axios from './axios/axios';

function App() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const email = localStorage.getItem('email');
      const body = JSON.stringify({
        email,
      });
      const config ={
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      };

      console.log('here');

      axios.post('/utilisateur/read-email.php', body, config).then((res) => {
        dispatch(LoginUser(res.data));
      });
    }
  }, []);

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
