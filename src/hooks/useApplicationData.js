import { useEffect, useState } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{},
  });

  const setDay = day => setState({ ...state, day });
  
  const bookInterview = (id, interview) => {
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

    // update state after addition
    return axios.put(`/api/appointments/${id}`, { interview })
    .then((res) => {
      const days = state.days.map(day => day.name === state.day ? { ...day, spots: day.spots - 1} : day);

      setState(
        prev => ({ ...prev, appointments, days })
      );
    });
  };

  function cancelInterview(id) {
    //cancel appointment interview
    const appointments = state.appointments;

    appointments.id = null;

    // update state after addition
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = state.days.map(day => day.name === state.day ? { ...day, spots: day.spots + 1} : day);
        setState(
          prev => ({ ...prev, appointments, days })
        );
      });
  }


  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const [first, second, third] = all;
      
      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}