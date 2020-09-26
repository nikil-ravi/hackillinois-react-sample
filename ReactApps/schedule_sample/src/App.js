import React, { useState, useEffect } from 'react';
import AddToCalendar from 'react-add-to-calendar';
import logo from './logo.svg';
import './App.css';



function getTime(t1, t2) {
  var dt = new Date(t1*1000);
  var hr = dt.getHours();
  var m = "0" + dt.getMinutes();
  var s = "0" + dt.getSeconds();

  var dtOther = new Date(t2*1000);
  var hrOther = dtOther.getHours();
  var mOther = "0" + dtOther.getMinutes();
  var sOther = "0" + dtOther.getSeconds();

  if (t1 == t2) return hr + ':' + m.substr(-2) + ':' + s.substr(-2);  
  else {
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2) + ' - ' +
          hrOther + ':' + mOther.substr(-2) + ':' + sOther.substr(-2);
  }
}

function HackILEvent(props) {
  
  return (
  
  <div className = "HackILEvent">
    <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <p>{getTime(props.startTime, props.endTime)}</p>
      <div className="calendar">
        <AddToCalendar event={props.eventProp} buttonLabel="Add to Calendar"/>
      </div>
      <br></br>
    </div>
  </div>
  )
}

function App() {
  const [events, setEvents] = useState(['hellooo']);

  useEffect(() => {
    //setEvents('bye');
    fetch("https://api.hackillinois.org/event/").then(res => res.json()).then(json => {
      setEvents(json.events)
    }
    )
  }, [])

  return (
    <div className="App">
      <h1>Welcome to the schedule for HackIllinois 2021!</h1>
        <div className="events">
          {
            events.map(event => (
            <div>
            <HackILEvent name = {event.name}  description = {event.description} startTime =
            {event.startTime} endTime = {event.endTime} eventProp = {event}/>
            </div>
            
            // <div>
            //   <h3>{event.name}</h3>
            //   <p>{event.description}</p>
            // </div>
          ))}
        </div>
    </div>
  );
}

export default App;
