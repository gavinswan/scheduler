import React from "react";
import DaylistItem from "./DayListItem";

export default function Daylist(props) {
  const mappedDays = props.days.map((day, index) => {
    return (
        <DaylistItem
      key={index}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />
    );
  });
  return (
  <ul>
    {mappedDays}
  </ul>
  );
}