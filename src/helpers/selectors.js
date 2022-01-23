

  export function getAppointmentsForDay(state, day) {
    const filteredDay = state.days.filter(days => days.name === day);
    
    const allAppointments=[];
    if (filteredDay.length === 0) {
      return allAppointments;
    }
    
    for (let appointmentId of filteredDay[0].appointments) {
      allAppointments.push(state.appointments[appointmentId]);
    }
    return allAppointments;
  }