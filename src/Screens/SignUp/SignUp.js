import React from 'react';
import './SignUp.css';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logowhite.png';
import { useRef } from 'react';
import axios from '../../axios/axios';

function SignUp() {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const numRef = useRef();
  const nomRef = useRef();
  const prenomRef = useRef();
  const adresseRef = useRef();
  const sexeRef = useRef();
  const naissanceRef = useRef();

  function login() {
    history.push('/login');
  }
  function signup() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const gsm = numRef.current.value;
    const nom = nomRef.current.value;
    const prenom = prenomRef.current.value;
    const adresse = adresseRef.current.value;
    const sexe = sexeRef.current.value;
    const naissance = naissanceRef.current.value;
    const role = 'patient';

    const body = JSON.stringify({
      nom,
      prenom,
      naissance,
      email,
      password,
      adresse,
      gsm,
      sexe,
      role,
    });

    const config = JSON.stringify({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axios
      .post('/utilisateur/create.php', body, config)
      .then((res) => {
        alert(res.data.message);
        login();
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="signUp_container">
      <div className="signUp_logo" onClick={() => history.push('/')}>
        <img src={logo} alt="logo" />
        <h2>MedApp</h2>
      </div>
      <div className="signUp_block">
        <h2 className="signUp_title">Créer un compte</h2>
        <div className="signUp_content">
          {/** Inputs */}
          <div className="signUp_inputs">
            <div className="signUp_input_container">
              <label htmlFor="email" className="signUp_label">
                Email
              </label>
              <input type="email" ref={emailRef} className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="num" className="signUp_label">
                Numero tel
              </label>
              <input type="text" ref={numRef} className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="password" className="signUp_label">
                Mot de passe
              </label>
              <input type="password" ref={passwordRef} className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="repass" className="signUp_label">
                re-Mot de passe
              </label>
              <input type="password" className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="nom" className="signUp_label">
                Nom
              </label>
              <input type="text" ref={nomRef} className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="prenom" className="signUp_label">
                Prenom
              </label>
              <input type="text" ref={prenomRef} className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="adresse" className="signUp_label">
                Adresse
              </label>
              <input type="text" ref={adresseRef} className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="birth" className="signUp_label">
                Date de naissance
              </label>
              <input type="date" ref={naissanceRef} className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="" className="signUp_label">
                Sexe
              </label>
              <select name="sexe" id="sexe" ref={sexeRef} className="signUp_input">
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
          </div>
          {/** Inputs End */}

          <button className="signUp_button" onClick={signup}>Créer</button>
          <div className="signUp_text_container">
            <p className="signUp_text">Vous avez déjà un compte?</p>
            <p className="signUp_text_span" onClick={login}>
              Connectez-vous
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
