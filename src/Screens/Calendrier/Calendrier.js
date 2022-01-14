import React, { useRef, useState } from 'react';
import './Calendrier.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import axios from '../../axios/axios';
import { useSelector } from 'react-redux';
import { selectuser } from '../../features/userSlice';
import { useEffect } from 'react';
import ReactLoading from 'react-loading';

function Calendrier() {
  const [matin, setMatin] = useState([
    '9h00min',
    '9h30min',
    '10h00min',
    '10h30min',
    '11h00min',
    '11h30min',
  ]);
  const [afternoon, setAfternoon] = useState([
    '12h00min',
    '12h30min',
    '13h00min',
    '13h30min',
    '14h00min',
    '14h30min',
  ]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const user = useSelector(selectuser);
  const [rdv, setRdv] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    const rdv_date = moment(date).format('YYYY-MM-DD');
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({
      date: rdv_date,
    });

    axios
      .post('/rendez-vous/read.php', body, config)
      .then((res) => {
        if (res.data.data) {
          const rdvFiltered = res.data.data?.map((element) => {
            return element.rdv_time;
          });
          setRdv(rdvFiltered);
          setLoading(false);
        } else {
          setRdv([]);
          setLoading(false);
        }
        console.log(rdv);
      })
      .catch((err) => console.log(err));
  }, [date]);

  function convertStringTime(string) {
    const arr = string.split('h');
    arr[1] = arr[1].split('min')[0];
    arr.push('00');
    return arr.join(':');
  }

  function selected(e) {
    if (e.currentTarget.style.backgroundColor === 'rgb(3, 168, 128)') {
      e.currentTarget.style.backgroundColor = '';
    } else {
      e.currentTarget.style.backgroundColor = '#03A880';
      setTime(convertStringTime(e.currentTarget.firstChild.textContent));
    }
  }

  function valider() {
    const rdv_date = moment(date).format('YYYY-MM-DD');
    const rdv_time = time;

    const body = JSON.stringify({
      date: rdv_date,
      time: rdv_time,
      utilisateur_id: user.id,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    if (rdv_date && rdv_time) {
      axios
        .post('/rendez-vous/create.php', body, config)
        .then((res) => alert(res.data.message))
        .catch((err) => console.log(err.message));
    } else {
      alert('Veuillez entrez une date');
    }
  }

  return (
    <div className="calendrier_container">
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
      <div className="calendrier_topSide">
        <h1>Calendrier</h1>
      </div>
      <div className="calendrier_bottomSide">
        <div className="calendrier_leftSide">
          <Calendar
            onChange={setDate}
            value={date}
            className="calendrier_style"
            minDate={new Date()}
          />
          <button className="calendrier_button" onClick={valider}>
            Valider
          </button>
        </div>
        <div className="calendrier_rightSide">
          <div className="calendrier_timing_table">
            <div className="calendrier_timing_sides">
              <div className="calendrier_period">
                <p>Matin</p>
              </div>
              {matin.map((time) => (
                <div
                  className={`calendrier_time ${
                    rdv.includes(convertStringTime(time)) && 'not_available'
                  }`}
                  onClick={(e) => selected(e)}
                >
                  <p>{time}</p>
                </div>
              ))}
            </div>
            <div className="calendrier_timing_sides">
              <div className="calendrier_period">
                <p>Apres-midi</p>
              </div>
              {afternoon.map((time) => (
                <div
                  className={`calendrier_time ${
                    rdv.includes(convertStringTime(time)) && 'not_available'
                  }`}
                  onClick={(e) => selected(e)}
                >
                  <p>{time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendrier;
