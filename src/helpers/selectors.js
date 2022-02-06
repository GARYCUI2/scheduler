

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
  };

  export function getInterview(state, interview) {
    return interview === null ? null : {
      "student":interview.student,
      'interviewer':state.interviewers[interview.interviewer]
    }
  }
  export function getInterviewersForDay(state, day) {
    if (state.days.length === 0) {
      return []
    }
    const filteredDay = state.days.filter(e => e.name === day);
    if (filteredDay.length === 0) {
      return []
    }
    let selectedInterviewers = [];
    filteredDay[0].interviewers.map(id => selectedInterviewers.push(state.interviewers[id]));
    return selectedInterviewers;
  };