import React, { useState } from 'react';
import './Dossier.css';
import axios from '../../axios/axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import Update from './Update';

const customStyle = {
  content: {
    width: '50%',
    position: 'absolute',
    left: '25%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    boxShadow: '-2px 2px 5px 2px rgba(0, 0, 0, .24)',
  },
};

function Dossier() {
  const [dossier_id, setDossierId] = useState();
  const [documents, setDocuments] = useState();
  const [examen, setExamen] = useState();
  const [etats, setEtats] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const Id = useParams().id;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const body = JSON.stringify({
      utilisateur_id: Id,
    });
    axios
      .post('/dossier-medical/read-user.php', body, config)
      .then((res) => {
        if (res.data.message === 'dossierMed introuvable ') {
          axios
            .post(
              '/dossier-medical/create.php',
              JSON.stringify({ utilisateur_id: Id }),
              config
            )
            .then((res) => alert(res.data.message))
            .catch((err) => console.log(err.message));
        } else if (res.data.data) {
          console.log(res.data.data[0].id)
          setDossierId(parseInt(res.data.data[0].id))
          axios
            .post(
              '/document/read-dossier.php',
              { dossierId: parseInt(res.data.data[0].id) },
              config
            )
            .then((res) => {
              setDocuments(res.data);
            })
            .catch((err) => console.log(err));

          axios
            .post(
              '/examen-clinique/read-dossier.php',
              { dossierId: parseInt(res.data.data[0].id) },
              config
            )
            .then((res) => {
              setExamen(res.data);
            })
            .catch((err) => console.log(err));

          axios
            .post(
              '/etat-general/read-dossier.php',
              { dossierId: parseInt(res.data.data[0].id) },
              config
            )
            .then((res) => {
              setEtats(res.data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="dossier_container">
      {loading && (
        <div className={`${loading}` ? 'loading' : 'hiddenLoading'}>
          <ReactLoading
            type="spinningBubbles"
            color="black"
            height="8%"
            width="8%"
          />
        </div>
      )}
      <div className="dossier_topSide">
        <h1>Dossier Medical</h1>
        <button className="dossier_button" onClick={openModal}>
          Ajouter
        </button>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyle}
      >
        <Update id={dossier_id} />
      </ReactModal>
      <div className="dossier_bottomSide">
        <div className="dossier_content">
          <h2>Documents</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">nom</TableCell>
                  <TableCell align="right">description</TableCell>
                  <TableCell align="right">type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents?.map((document) => (
                  <TableRow
                    key={document?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {document?.id}
                    </TableCell>
                    <TableCell align="right">{document?.nom}</TableCell>
                    <TableCell align="right">{document?.description}</TableCell>
                    <TableCell align="right">{document?.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="dossier_content">
          <h2>Examen Clinique</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">poids</TableCell>
                  <TableCell align="right">taille</TableCell>
                  <TableCell align="right">IMC</TableCell>
                  <TableCell align="right">temperature</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examen?.map((exam) => (
                  <TableRow
                    key={exam?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {exam?.id}
                    </TableCell>
                    <TableCell align="right">{exam?.poids}</TableCell>
                    <TableCell align="right">{exam?.taille}</TableCell>
                    <TableCell align="right">{exam?.IMC}</TableCell>
                    <TableCell align="right">{exam?.temperature}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="dossier_content">
          <h2>Etats Generaux</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">antecedents Familiaux</TableCell>
                  <TableCell align="right">antecedents Medicaux</TableCell>
                  <TableCell align="right">antecedents Chirurgicaux</TableCell>
                  <TableCell align="right">
                    habitudes AlcoloTabagiques
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {etats?.map((etat) => (
                  <TableRow
                    key={etat?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {etat?.id}
                    </TableCell>
                    <TableCell align="right">
                      {etat?.antecedentsFamiliaux}
                    </TableCell>
                    <TableCell align="right">
                      {etat?.antecedentsMedicaux}
                    </TableCell>
                    <TableCell align="right">
                      {etat?.antecedentsChirurgicaux}
                    </TableCell>
                    <TableCell align="right">
                      {etat?.habitudesAlcoloTabagiques}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Dossier;
