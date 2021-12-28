import React, { useRef, useState } from 'react';
import './Calendrier.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

  function selected(e) {
    console.log(e.currentTarget.style.backgroundColor);
    if (e.currentTarget.style.backgroundColor === "rgb(3, 168, 128)") {
      e.currentTarget.style.backgroundColor = '';
    } else {
      e.currentTarget.style.backgroundColor = "#03A880";
    }
  }

  return (
    <div className="calendrier_container">
      <div className="calendrier_topSide">
        <h1>Calendrier</h1>
      </div>
      <div className="calendrier_bottomSide">
        <div className="calendrier_leftSide">
          <Calendar
            onChange={setDate}
            value={date}
            className="calendrier_style"
          />
          <button className="calendrier_button">Valider</button>
        </div>
        <div className="calendrier_rightSide">
          <div className="calendrier_timing_table">
            <div className="calendrier_timing_sides">
              <div className="calendrier_period">
                <p>Matin</p>
              </div>
              {matin.map((time) => (
                <div className="calendrier_time" onClick={(e) => selected(e)}>
                  <p>{time}</p>
                </div>
              ))}
            </div>
            <div className="calendrier_timing_sides">
              <div className="calendrier_period">
                <p>Apres-midi</p>
              </div>
              {afternoon.map((time) => (
                <div className="calendrier_time" onClick={(e) => selected(e)}>
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
