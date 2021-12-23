import React from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logowhite.png';

function SignUp() {
  const navigate = useNavigate();

  function login() {
    navigate('/login');
  }
  function signup() {}

  return (
    <div className="signUp_container">
      <div className="signUp_logo" onClick={() => navigate('/')}>
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
              <input type="email" className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="num" className="signUp_label">
                Numero tel
              </label>
              <input type="text" className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="password" className="signUp_label">
                Mot de passe
              </label>
              <input type="password" className="signUp_input" />
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
              <input type="text" className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="prenom" className="signUp_label">
                Prenom
              </label>
              <input type="text" className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="adresse" className="signUp_label">
                Adresse
              </label>
              <input type="text" className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="birth" className="signUp_label">
                Date de naissance
              </label>
              <input type="date" className="signUp_input" />
            </div>
            <div className="signUp_input_container">
              <label htmlFor="" className="signUp_label">
                Sexe
              </label>
              <select name="sexe" id="sexe" className="signUp_input">
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
          </div>
          {/** Inputs End */}

          <button className="signUp_button">Créer</button>
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
