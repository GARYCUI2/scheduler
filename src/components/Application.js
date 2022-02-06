import React from "react";
import Appointment from "./Appointment";
import "components/Application.scss";
import DayList from "components/DayList";
import { getAppointmentsForDay,getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData"

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  // get appointments for a specific day, such as "Monday" appointments
  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    // get the interview for a specifc appointment time slot. This could be null if no one booked it
    const interview = getInterview(state, appointment.interview);

    // get interviewers for a specific day, such as "Monday" interviewers
    const interviewers = getInterviewersForDay(state, state.day)

    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


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
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
      
    </main>
  );
}
