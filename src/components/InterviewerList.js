import React from "react";
import classNames from "classnames";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"
export default function InterviewerList(props) {

//   const dayClass = classNames("day-list__item", {
//     "day-list__item--selected": props.selected,
//     "day-list__item--full": props.spots===0
//  });

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key= {interviewer.id}
        name={interviewer.name}
        avatar= {interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (   
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}