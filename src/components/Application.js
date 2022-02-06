import React, { useState, useEffect } from "react";

import Appointment from "./Appointment";
import "components/Application.scss";
import DayList from "components/DayList";
import axios from "axios";
import { getAppointmentsForDay,getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);

    // create a new appointment object with interview form information
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // add the new appointment created above into state.appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // http call and receive 204 then



    // update state after addition
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        console.log("ssss",res);
        setState(
          prev => ({ ...prev, appointments })
        );
      });

  }


  function cancelInterview(id) {


    //cancel appointment interview
    const appointments = state.appointments;

    appointments.id = null;

    // update state after addition
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log("delete",res);
        setState(
          prev => ({ ...prev, appointments })
        );
      });

  }

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  // get appointments for a specific day, such as "Monday" appointments
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // get interviewers for a specific day, such as "Monday" interviewers
  const interviewersForDay = getInterviewersForDay(state, state.day)

  const schedule = dailyAppointments.map((appointment) => {
    // get the interview for a specifc appointment time slot. This could be null if no one booked it
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const [first, second, third] = all;

      // setState after axios get returns data
      // days: first.data
      // appointments: second.data
      // interviewers: third.data
      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data }));
    });
  }, []);



  return (
    <main className="layout">
      <section className="sidebar">

        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        /> 

      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
      
    </main>
  );
}
