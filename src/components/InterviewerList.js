import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem'

export default function InterviewerList(props) {
  const mappedInterviewers = props.interviewers.map((interviewer) => {
    return (
        <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar} 
      selected={props.value === interviewer.id}
      setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{mappedInterviewers}</ul>
  </section>
  );
}