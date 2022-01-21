import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const parseDayList = ()=> props.days.map(day => <DayListItem
     key= {day.id}
     name={day.name}
     spots= {day.spots}
     setDay={props.onChange}
     selected={day.name === props.value}
    />
  );

  return (   
    <ul>
      {parseDayList()}
    </ul>
  );
}