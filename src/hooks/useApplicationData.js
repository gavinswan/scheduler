import { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

export default function useApplicationData() {

  const remainingSpotsForDay = (day, appointments) => {
    let freeSpots = 0;
    const thisDayAppointments = day.appointments;
    for (const id of thisDayAppointments) {
      if (!appointments[id].interview) {
        freeSpots++
      }
    }
    return freeSpots;
  }

  const updatedDaysArr = (days, appointments) => {
    const mappedDays = days.map((day) => ({
      ...day,
      spots: remainingSpotsForDay(day, appointments)
    }))
    return mappedDays;
  }
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState({...state, day})
  }

  useEffect(() => {
      Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")
      ])
        .then((all) => {
          setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
        });
      }, [])

  function bookInterview(id, interview) { 
    return axios.put(`/api/appointments/${id}`, {interview})
    .then (() => {
        const appointment = {...state.appointments[id], interview: {...interview}};
        const appointments = {...state.appointments, [id]: appointment};
        setState({...state, appointments, days: updatedDaysArr(state.days, appointments) });
      })
      .catch(err => console.log(err))
  }

  function cancelInterview (id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {...state.appointments[id], interview: null};
        console.log(appointment)
        const appointments = {...state.appointments, [id]: appointment};
        setState({...state, appointments, days: updatedDaysArr(state.days, appointments)})
      })
      .catch(err => console.log(err))
  }
  return { state, setDay, bookInterview, cancelInterview };
}