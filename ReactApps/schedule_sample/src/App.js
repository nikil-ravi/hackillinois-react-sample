import React, { useState, useEffect } from 'react';
import AddToCalendar from 'react-add-to-calendar';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardTeacher, faClock, faCoffee, faHamburger, faLaptop, faStar, faWifi } from '@fortawesome/free-solid-svg-icons'

// Returns an event object that satisfies the format required for
// adding to calendar
function buildEvent(props) {
  var time1 = new Date(props.startTime * 1000);
  var time2 = new Date(props.endTime * 1000);

  let eventToReturn = {
    title: String(props.name),
    description: String(props.description),
    location: 'Siebel Center for Computer Science', // default
    startTime: time1,
    endTime: time2
  }

  return eventToReturn;
}

// returns the string-version of the time passed (as a date object) to it.
function getTime(t) {
  var hr = t.getHours();
  var m = "0" + t.getMinutes();
  return hr + ':' + m.substr(-2)
}

// returns a string to display for the time as 'timeStart - timeEnd' if the times are
// different, or just 'timeStartEnd' if start time and end time are same.
function getTimeToDisplay(t1, t2) {
  if (getTime(t1) == getTime(t2)) 
    return getTime(t1);  
  else
    return getTime(t1) + ' - ' + getTime(t2);
}

// Returns an icon to display, based on the type of the event.
function getIcon(typeOfEvent) {
  var ele; // icon to be displayed
  switch (typeOfEvent) {
    case "WORKSHOP":
      ele = <FontAwesomeIcon icon={faLaptop}/>;
      break;
    case "SPEAKER":
      ele = <FontAwesomeIcon icon={faChalkboardTeacher}/>;
      break;
    case "MEAL":
      ele = <FontAwesomeIcon icon={faHamburger}/>;
      break;
    case "MINIEVENT":
      ele = <FontAwesomeIcon icon={faCoffee}/>;
      break;
    case "OTHER":
      ele = <FontAwesomeIcon icon={faStar}/>;
      break;
    default:
      ele = <FontAwesomeIcon icon={faWifi}/>;
      break;
  }

  return ele;
}

function HackILEvent(props) {
  
  var iconToDisplay = getIcon(props.type);

  return (
  <div className = "HackILEvent">
    <div>
      <h2>{props.eventProp.title} {iconToDisplay}</h2>
      <p>{props.eventProp.description}</p>
      <h3><FontAwesomeIcon icon={faClock}/> {getTimeToDisplay(props.eventProp.startTime, props.eventProp.endTime)}</h3>
      <div className="calendar">
        <AddToCalendar event={props.eventProp} buttonLabel="Add to Calendar"/>
      </div>
      <br></br>
    </div>
  </div>

  )
}

function App() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("https://api.hackillinois.org/event/").then(res => res.json()).then(json => {
      setEvents(json.events)
    }
    )
  }, [])

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <h1>Welcome to HackIllinois!</h1>
        <div className="events">
          {
            events.map(event => (
              <div>
                <HackILEvent eventProp = {buildEvent(event)} type = {event.eventType}/>
              </div>
            )
          )
          }
        </div>
    </div>
  );
}

export default App;
