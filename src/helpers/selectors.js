
export function getAppointmentsForDay (state, day) {
  const filteredDay = state.days.filter(days => days.name === day)[0]
  // if days array is empty or a word is entered for days that does not exist in days array
  if (filteredDay === undefined || state.days.length === 0) { 
    return [];
  }
  const dayAppts = filteredDay.appointments
  const appts = dayAppts.map((apptNum) => state.appointments[apptNum])
  return appts; 
};

export function getInterview (state, interview) {
  if (!interview) {
    return null;
  }
  const interviewID = interview.interviewer
  return ({
    student: interview.student,
    interviewer: state.interviewers[interviewID]
  });
}

export function getInterviewersForDay (state, day) {
  const filteredDay = state.days.filter(days => days.name === day)[0]
  // if days array is empty or a word is entered for days that does not exist in days array
  if (filteredDay === undefined || state.days.length === 0) { 
    return [];
  }
  const intID = filteredDay.interviewers
  const intArray = intID.map((intNum) => state.interviewers[intNum])
  return intArray; 
};